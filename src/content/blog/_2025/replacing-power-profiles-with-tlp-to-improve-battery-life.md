---
title: "Improve Battery Life on your Omarchy Laptop with TLP"
description: "A quick procedure to replace power-profiles-daemon with TLP in Omarchy to improve battery life."
pubDatetime: "2025-12-16"
draft: false
---

Omarchy ships with power-profiles-daemon which is a power management daemon that allows users to switch between different power profiles. This is super useful for preserving battery life on laptops.

TLP is a similar tool for linux that goes even further. From their [website](https://linrunner.de/tlp/introduction.html):

> TLP is a feature-rich utility for Linux, saving laptop battery power without the need to delve deeper into technical details.

They also explain why you should consider using [TLP instead of power-profiles-daemon](https://linrunner.de/tlp/faq/ppd.html):

> TLP offers advantages over power-profiles daemon when the laptop is idle, such as during periods of no user input or low load operations like text editing or browsing.

Another great feature is automatic profile switching:

> The second advantage of TLP is automatic switching: when AC power is connected, the performance profile is activated; when changing to battery operation, the balanced profile is activated.

Replacing power-profiles-daemon with TLP is easier than ever since version 1.9. The `tlp-pd` command is a drop-in replacement for `power-profiles-daemon`.

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
sudo systemctl enable tlp.service
sudo systemctl enable --now tlp-pd.service
```

Check status and make sure both are active:

```bash
systemctl status tlp
systemctl status tlp-pd
```

## 4. Provide `powerprofilesctl` compatibility

Omarchy **Setup > Power Profile** menu expects the `powerprofilesctl` command. Now you could fiddle with the menu script to make it work but there is an easier way. Simply symlink `tlpctl` to `powerprofilesctl`. The command is meant as drop-in replacement and offers the same api.

 ```bash
sudo ln -s /usr/bin/tlpctl /usr/local/bin/powerprofilesctl
```

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

Verify that the power profiles are still available when you click the battery icon in the waybar or use the **Setup > Power Profile** menu. You should be able to change the power profile manually. The power profile will now also change automatically when you plug or unplug your laptop.

You can do a lot of tweakings with TLP. I encourage you to read the [official documentation](https://linrunner.de/tlp/docs/tlp-configuration.html) to learn more about the available settings. Personnaly I found that just sticking with the default settings worked great and allowed me to improve my battery life by about 20%.
