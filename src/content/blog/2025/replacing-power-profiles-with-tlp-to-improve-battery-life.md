---
title: "Replacing Power Profiles with TLP to improve battery life"
description: "This guide explains how to fully replace power-profiles-daemon with TLP + tlp-pd in Omarchy, while preserving compatibility with tools and scripts that expect powerprofilesctl."
pubDatetime: "2025-12-16"
tags: ["howto", "tlp"]
draft: false
---

This guide explains how to fully replace **power-profiles-daemon** with **TLP + tlp-pd** in Omarchy, while preserving compatibility with tools and scripts that expect `powerprofilesctl`.

What is TLP : <https://linrunner.de/tlp/introduction.html>

Why use TLP instead of power-profiles-daemon? <https://linrunner.de/tlp/faq/ppd.html>

One thing I really like is that you get automatic profile switching out of the box. So if you unplug your laptop, the profile switches to save battery life. There is also lot of possible customization but this guide only covers the initial installation.

---

## 1. Stop and remove `power-profiles-daemon`

Power-profiles-deamon can conflict with TLP and needs to be stopped before proceeding.

Disable and remove the existing power profile service:

```bash
sudo systemctl stop power-profiles-daemon.service
sudo systemctl disable power-profiles-daemon.service
sudo pacman -Rns power-profiles-daemon
```

---

## 2. Install TLP and the Power Profiles compatibility layer

Install TLP and its related components:

```bash
sudo pacman -S tlp tlp-pd
```

What each component does:

* **tlp**: core power management engine
* **tlp-pd**: implements the Power Profiles D-Bus API

---

## 3. Enable required services

Enable TLP and start the Power Profiles compatibility daemon:

```bash
sudo systemctl enable tlp.service
sudo systemctl enable --now tlp-pd.service
```

Check status:

```bash
systemctl status tlp
systemctl status tlp-pd
```

Both should be active.

---

## 4. Provide `powerprofilesctl` compatibility

Omarchy various scripts expect `powerprofilesctl`.
On Arch Linux, that binary is normally shipped with `power-profiles-daemon`, so we replace it with a symlink to `tlpctl` that mimics `powerprofilesctl` functionnalities.

```bash
sudo ln -s /usr/bin/tlpctl /usr/local/bin/powerprofilesctl
```

---

## 5. Apply TLP settings immediately

Start TLP manually to apply all power settings without rebooting:

```bash
sudo tlp start
```

Verify active configuration:

```bash
tlp-stat -s
tlp-stat -p
```

Verify that the power profiles are still available when you click the battery icon in the waybar.

You should be all set!
