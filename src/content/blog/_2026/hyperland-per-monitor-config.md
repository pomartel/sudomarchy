---
title: "A Per-Monitor Hyprland Config in Omarchy"
description: "How to use smaller gaps on a laptop screen and move workspaces automatically when docking to an external monitor."
pubDatetime: "2026-02-02"
draft: false
---

Omarchy's [default Hyprland configuration](https://github.com/basecamp/omarchy/blob/22f64160f58be86defe191e5e97a99ef5f23bf53/default/hypr/looknfeel.conf#L9) sets the gap between windows to 5 pixels (`gaps_in`) and the gap between windows and the monitor edges to 10 pixels (`gaps_out`).

That feels great on an external display, but on a 14" laptop panel every pixel is precious. I wanted smaller gaps on my laptop while keeping Omarchy's defaults when I'm on a big monitor.

The second thing I wanted when docking: move my workspaces over to the external display.

I expected this to be doable with pure Hyprland config, but I could not figure it out. So I rely on a small script that runs on monitor attach/detach. If you know a better solution, please let me know.

## 1 - Install hyprland-monitor-attached

[hyprland-monitor-attached](https://github.com/coffebar/hyprland-monitor-attached) is a small AUR package that calls a user script whenever a monitor is attached or detached.

```bash
yay -S hyprland-monitor-attached
```

## 2 - Create the script

This script runs every time a monitor connects or disconnects.

- If an external monitor is connected, it applies Omarchy's default gaps and moves workspaces to that monitor (except for the fifth one which is kept on the laptop panel).
- If no external monitor is connected, it applies smaller gaps to reclaim space on the laptop panel.

Create the script `~/bin/hypr-monitor-toggle`:

```bash file=~/bin/hypr-monitor-toggle
#!/bin/bash

ext="DP-1"

for w in {1..10}; do
  if hyprctl monitors | grep -q "^Monitor $ext"; then
    hyprctl keyword "workspace $w, gapsout:10, gapsin:5"
    [ $w -ne 5 ] && hyprctl dispatch moveworkspacetomonitor $w $ext
  else
    hyprctl keyword "workspace $w, gapsout:3, gapsin:1"
  fi
done
```

Make it executable:

```bash
chmod +x ~/bin/hypr-monitor-toggle
```

## 3 - Run it on startup

The `hyprland-monitor-attached` daemon can be loaded on startup by adding it to `autostart.conf`. The command takes two arguments: a script to run on connect, and another script to run on disconnect. We use the same script for both.

```ini file=~/.config/hypr/autostart.conf
exec-once = hyprland-monitor-attached ~/bin/hypr-monitor-toggle ~/bin/hypr-monitor-toggle
exec = ~/bin/hypr-monitor-toggle # Also executed when Hyprland reloads
```

Notice the second line. The script also executes when the hyprland config is reloaded. Otherwise gaps can revert back to Omarchy's default configuration after a reload.
