---
title: "The One Setting That Will Dramatically Improve Your Laptop Battery"
description: "Automatically dim your Omarchy laptop display on battery with a simple udev rule and brightnessctl."
pubDatetime: "2026-04-07"
heroImage: automatically-dim-display-on-battery.png
heroImageAlt: "A dimly lit laptop glowing blue in a dark room"
---

Now that I got your attention with my clickbait title, let me make my case. We often think that when it comes to power draw on a laptop, the CPU or the GPU are the main culprits. But in practice, the display is usually the biggest drain. Managing your display brightness when running on battery is therefore crucial.

In this post, I'll show you how to create a simple automation that dims the laptop display when you unplug from power, then restores it when you plug back in.

## 1. Test your laptop display brightness

First, see if you're able to dim your laptop display brightness from the terminal:

```bash
brightnessctl -c backlight set 20%
```

`brightnessctl` is a small CLI utility that comes preinstalled with Omarchy. Like the name suggests, it lets you control the brightness of the display and the keyboard.

Now that you know how to dim and brighten your display from the CLI, let's automate it.

## 2. Automate display brightness with a `udev` rule

`udev` is the device manager for the Linux kernel. It dynamically handles hardware devices as they are added or removed from the system. A `udev` rule can run a command every time the laptop connects to or disconnects from a power source.

Run this command to create a new rule file named `99-display-brightness.rules`:

```bash
sudo tee /etc/udev/rules.d/99-display-brightness.rules >/dev/null <<EOF
ACTION=="change", SUBSYSTEM=="power_supply", ATTR{type}=="Mains", ATTR{online}=="0", RUN+="/usr/bin/brightnessctl -c backlight set 30%"
ACTION=="change", SUBSYSTEM=="power_supply", ATTR{type}=="Mains", ATTR{online}=="1", RUN+="/usr/bin/brightnessctl -c backlight set 90%"
EOF
```

When you unplug your laptop, it dims the brightness to 30%. When you plug it back in, it restores the brightness to 90%. You can of course adjust these two percentage values to your liking.

## 3. Apply the rule and test it

Reload the rules before testing:

```bash
sudo udevadm control --reload-rules
```

Now test this by plugging and unplugging your laptop from a power source. You should see the display brightness adjust automatically. You can still adjust the brightness manually if needed.

If it turns out you prefer not to handle brightness automatically, simply delete the rules file:

```bash
sudo rm /etc/udev/rules.d/99-display-brightness.rules
```

## 4. Should this be part of Omarchy?

I personally think this setting is so important for battery life that it should come bundled with Omarchy. Apple uses the same trick with Macs. Unfortunately, my [PR](https://github.com/basecamp/omarchy/pull/4848) was closed. DHH is firmly in the camp of manually adjusting the brightness.

And maybe [soon enough](https://world.hey.com/dhh/panther-lake-is-the-real-deal-4bd731f1) this tweak won't be as useful. But until I can get a full day of battery life on my laptop without any worries, I will keep tweaking and optimising.
