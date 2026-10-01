---
title: "A Per-Monitor Hyprland Config in Omarchy"
description: "How to use smaller gaps on a laptop screen and move workspaces automatically when docking to an external monitor."
pubDatetime: "2026-02-02"
draft: false
modDatetime: 2026-10-01
---

> [!NOTE]
> Updated for Quattro's Lua configuration. The API calls below follow Hyprland's documentation; the docking behavior still needs testing with your monitor names and hardware.

Omarchy's default gaps feel great on an external display, but on a 14" laptop panel every pixel is precious. I want smaller gaps on the laptop while keeping more space on the external monitor.

The second thing I want when docking: move my workspaces over to the external display, except workspace 5, which stays on the laptop when its screen is available.

The original version used [hyprland-monitor-attached](https://github.com/coffebar/hyprland-monitor-attached) and a Bash script. Hyprland now exposes monitor events directly in Lua, so we can handle this inside the configuration.

## 1 - Identify the monitors

Run:

```bash
hyprctl monitors
```

The example below assumes `eDP-1` is the laptop and `DP-1` is the external display. Replace both names with yours. This example handles one external monitor.

## 2 - Create the Lua configuration

Create `~/.config/hypr/docking.lua`:

```lua file=~/.config/hypr/docking.lua
local laptop = "eDP-1"
local external = "DP-1"

-- Gaps follow the monitor, including workspaces created later.
hl.workspace_rule({ workspace = "m[" .. laptop .. "]", gaps_in = 1, gaps_out = 3 })
hl.workspace_rule({ workspace = "m[" .. external .. "]", gaps_in = 5, gaps_out = 10 })

local function arrange_workspaces()
  local connected = {}
  for _, monitor in ipairs(hl.get_monitors()) do
    connected[monitor.name] = true
  end

  for id = 1, 10 do
    local target
    if connected[external] then
      target = (id == 5 and connected[laptop]) and laptop or external
    elseif connected[laptop] then
      target = laptop
    end

    -- Move existing workspaces only; don't create ten empty workspaces.
    local workspace = tostring(id)
    if target and hl.get_workspace(workspace) then
      hl.dispatch(hl.dsp.workspace.move({ workspace = workspace, monitor = target }))
    end
  end
end

hl.on("hyprland.start", arrange_workspaces)
hl.on("config.reloaded", arrange_workspaces)
hl.on("monitor.layout_changed", arrange_workspaces)
```

The [workspace rules](https://wiki.hypr.land/Configuring/Basics/Workspace-Rules/) use monitor selectors, so workspace 5 keeps the smaller laptop gaps even while docked. If the laptop panel is disabled, all existing numbered workspaces go to the external screen. On unplug, they return to the laptop if it is enabled.

The [monitor and configuration events](https://wiki.hypr.land/Configuring/Advanced-and-Cool/Expanding-functionality/) run the arrangement after the layout changes or the configuration is applied. The [workspace move dispatcher](https://wiki.hypr.land/Configuring/Basics/Dispatchers/) handles the actual moves. Special workspaces and named workspaces are left alone.

This moves workspaces that already exist when an event fires. It does not force every newly created workspace onto the external monitor.

## 3 - Load it and test

At the bottom of `~/.config/hypr/hyprland.lua`, after the existing imports, add:

```lua file=~/.config/hypr/hyprland.lua
require("hypr.docking")
```

If you followed the old version, remove its `hyprland-monitor-attached` startup entry and the call to `hypr-monitor-toggle`. Log out and back in to stop the old daemon before testing this replacement.

Reload and check for errors:

```bash
hyprctl reload
hyprctl configerrors
```

Test with the laptop alone, then dock and undock. Verify that workspace 5 stays on the laptop while both screens are enabled, that other existing numbered workspaces move, and that gaps follow the screen. Reload once while docked to check that the settings survive a reload.

If you use Omarchy's clamshell mode, test with the lid closed too. Other monitor or workspace rules can affect the result. To undo this setup, remove the `require("hypr.docking")` line and reload.
