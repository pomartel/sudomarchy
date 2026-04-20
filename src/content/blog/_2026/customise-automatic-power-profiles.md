---
title: "How to Customise Automatic Power Profiles"
description: "Change Omarchy's automatic power profile switching to use the profiles you actually want on AC and battery."
pubDatetime: "2026-04-20"
heroImage: customise-automatic-power-profiles.png
heroImageAlt: "A laptop with power profile controls"
---

Power profiles are predefined configurations that control how a laptop balances performance, power consumption, heat, and fan noise. There are typically 3 power profiles to choose from: `performance`, `balanced` and `power-saver`.

You can view and change your power profile in Omarchy by clicking the battery icon in the top right corner of the Waybar. Your current power profile is displayed in italic characters.

Omarchy automatically sets the power profile to `performance` when the laptop is plugged in and `balanced` when it is running on battery. If this is how you want things to work, then you do not need to change anything.

My laptop fans sound like a plane about to take off when running in performance mode. Since I don't run big workloads on my laptop anyway, I prefer to use `balanced` when plugged in and `power-saver` on battery.

Let's see how we can tweak Omarchy to do just that. But before we start, make sure you are running Omarchy 3.5.1 or above

## 1. Rewrite the `udev` rule

Omarchy uses a `udev` rule named `99-power-profile.rules` to trigger a command named `omarchy-powerprofiles-set` with the `ac` or `battery` argument, depending on whether the laptop is connected to a power supply or running on battery.

We could modify the command script directly, but I would advise against making changes in the Omarchy directory. That will make future system updates more complicated. Instead, we can safely override the command as explained in [this blog post](/posts/override-omarchy-command).

But first, let's rewrite the `udev` rule to change the script location from `~/.local/share/omarchy/bin` to `~/bin`. Run this command in the terminal:

```bash
cat <<EOF | sudo tee "/etc/udev/rules.d/99-power-profile.rules" >/dev/null
SUBSYSTEM=="power_supply", ATTR{type}=="Mains", ATTR{online}=="0", RUN+="/usr/bin/systemd-run --no-block --collect --unit=omarchy-power-profile-battery --property=After=power-profiles-daemon.service $HOME/bin/omarchy-powerprofiles-set battery"
SUBSYSTEM=="power_supply", ATTR{type}=="Mains", ATTR{online}=="1", RUN+="/usr/bin/systemd-run --no-block --collect --unit=omarchy-power-profile-ac --property=After=power-profiles-daemon.service $HOME/bin/omarchy-powerprofiles-set ac"
EOF
```

## 2. Override the `omarchy-powerprofiles-set` command

Now we need to create the `omarchy-powerprofiles-set` script in `~/bin`. That script will override the default Omarchy command. Here's the content of my script. You can adjust the power profiles to your liking.

```bash file=~/bin/omarchy-powerprofiles-set
#!/bin/bash

# Usage: omarchy-powerprofiles-set <ac|battery>

case "$1" in
  ac)
    powerprofilesctl set balanced
    ;;
  battery)
    powerprofilesctl set power-saver
    ;;
esac
```

Make the script executable:

```bash
chmod +x ~/bin/omarchy-powerprofiles-set
```

## 3. Make sure `~/bin` is in the `PATH`

The `udev` rule above points directly to `~/bin/omarchy-powerprofiles-set`, but Omarchy also calls `omarchy-powerprofiles-set` by name in other places.

If you want your custom script to override the default one everywhere, make sure the system reads the `~/bin` directory before `~/.local/share/omarchy/bin`. We do that by prepending `$HOME/bin` to the `PATH` variable in `.bashrc` and `~/.config/uwsm/env`:

```bash
echo 'export PATH=$HOME/bin:$PATH' >> ~/.bashrc
echo 'export PATH=$HOME/bin:$PATH' >> ~/.config/uwsm/env
```

It does not have to be `~/bin`. That's just my personal preference. You can use `~/.local/bin` instead, but you still need to make sure it comes before Omarchy's bin folder in the `PATH`.

You can view the current `PATH` with this command:

```bash
echo $PATH
```

## 4. Do not forget to test it

Reload the `udev` rules:

```bash
sudo udevadm control --reload
```

Now plug and unplug your laptop and verify that the active power profile matches the one you expect:

```bash
powerprofilesctl get
```

With a little bit of work, you can really customise just about anything in Omarchy.
