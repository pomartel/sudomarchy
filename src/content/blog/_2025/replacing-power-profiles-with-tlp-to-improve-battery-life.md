---
title: "Improve Battery Life on your Omarchy Laptop with TLP"
description: "A quick procedure to replace power-profiles-daemon with TLP in Omarchy to improve battery life."
pubDatetime: "2025-12-16"
modDatetime: 2026-10-01
---

> [!NOTE]
> Updated for Omarchy Quattro's Power panel and remembered AC/battery profiles. The command compatibility below has been checked against Omarchy 4.0.4 and TLP's documentation; the combined setup still needs testing on hardware, especially across plug/unplug and suspend/resume.

Omarchy ships with power-profiles-daemon which is a power management daemon that allows users to switch between different power profiles. This is super useful for preserving battery life on laptops.

TLP is a similar tool for linux that goes even further. From their [website](https://linrunner.de/tlp/introduction.html):

> TLP is a feature-rich utility for Linux, saving laptop battery power without the need to delve deeper into technical details.

They also explain why you should consider using [TLP instead of power-profiles-daemon](https://linrunner.de/tlp/faq/ppd.html):

> TLP offers advantages over power-profiles daemon when the laptop is idle, such as during periods of no user input or low load operations like text editing or browsing.

TLP also offers automatic profile switching:

> The second advantage of TLP is automatic switching: when AC power is connected, the performance profile is activated; when changing to battery operation, the balanced profile is activated.

Replacing power-profiles-daemon with TLP is easier than ever since version 1.9. The `tlp-pd` command is a drop-in replacement for `power-profiles-daemon`.

Quattro already remembers a separate power profile for AC and battery, so you don't need TLP just to get automatic switching. TLP is worth considering if you want its additional power-saving settings. See [Omarchy's power-profile documentation](https://github.com/omacom/omarchy/blob/v4.0.4/manual/36-system-sleep.md) for the built-in option.

Here's the step-by-step guide:

## 1. Stop and remove power-profiles-daemon

Power-profiles-deamon can conflict with TLP and needs to be stopped before proceeding. You can also remove the package completely.

```bash
sudo systemctl stop power-profiles-daemon.service
sudo systemctl disable power-profiles-daemon.service
sudo pacman -Rns power-profiles-daemon
```

## 2. Install TLP

Install TLP and tlp-pd:

```bash
sudo pacman -S tlp tlp-pd
```

## 3. Enable the daemons

Enable TLP and start the Power Profiles compatibility daemon:

```bash
sudo systemctl enable --now tlp.service
sudo systemctl enable --now tlp-pd.service
```

Check status and make sure both are active:

```bash
systemctl status tlp
systemctl status tlp-pd
```

## 4. Provide `powerprofilesctl` compatibility

Quattro's Power panel calls Omarchy's profile helpers, which still use `powerprofilesctl list` and `powerprofilesctl set`. TLP's [`tlpctl`](https://linrunner.de/tlp/usage/tlpctl.html) supports those commands and the same profile names. A symlink lets the helpers use it after `power-profiles-daemon` has been removed:

```bash
sudo ln -s /usr/bin/tlpctl /usr/local/bin/powerprofilesctl
```

Check that your shell finds the compatibility command and that Omarchy can read the profiles:

```bash
command -v powerprofilesctl
powerprofilesctl list
omarchy powerprofiles list
```

The first command should show `/usr/local/bin/powerprofilesctl`. If Omarchy's list is empty or reports an error, resolve that before relying on the panel or automatic switching.

## 5. Apply TLP settings immediately

Start TLP manually to apply all power settings without rebooting:

```bash
sudo tlp start
```

You can check your active configuration with these two commands

```bash
tlp-stat -s
tlp-stat -p
```

## 6. Check Quattro's remembered profiles

Click the battery icon in the top bar or press **SUPER + CTRL + P** to open the Power panel. Choose your preferred profile while plugged in, then choose one while on battery. Quattro stores those choices separately and restores them when the power source changes.

TLP also has its own [automatic switching policy](https://linrunner.de/tlp/settings/operation.html#tlp-auto-switch), so don't assume its defaults and Quattro's remembered choices will always agree. Check the active profile with `tlpctl get` after plugging in, unplugging, and resuming from sleep on each power source. Also check after rebooting. The result should match the choice you saved in the panel for that power source.

If the profile changes unexpectedly, check both TLP's switching configuration and Quattro's saved choices before treating the setup as complete. Changing a profile with `tlpctl set` alone does not update Quattro's saved preferences.

You can do a lot of tweakings with TLP. I encourage you to read the [official documentation](https://linrunner.de/tlp/settings/index.html) to learn more about the available settings.
