---
title: "Two Actions, One Shortcut: Short and Long Presses in Hyprland"
description: "Use Lua callbacks to give a Hyprland shortcut separate tap and hold actions, without triggering both when you release the key."
pubDatetime: "2026-10-01T12:00:00-04:00"
draft: true
---

My application shortcuts mostly start with **SUPER + SHIFT**. Adding **ALT** gives me another action, but there is another way to fit two related actions on the same keys: tap for one, hold for the other.

For example, **SUPER + SHIFT + B** opens or focuses my browser. Holding the same shortcut opens a private window. No extra finger gymnastics.

Here are a few pairs from my `bindings.lua`:

| Shortcut | Short press | Long press |
| --- | --- | --- |
| SUPER + SHIFT + B | Regular browser | Private browser window |
| SUPER + SHIFT + C | Calendar panel | Google Calendar |
| SUPER + SHIFT + T | Todoist panel | Todoist web app in a scratchpad |
| SUPER + SHIFT + W | Typora | Omawrite |

This post uses Hyprland's Lua configuration and Omarchy's `o.bind` helper. The examples belong in `~/.config/hypr/bindings.lua`, not an older `bindings.conf` file.

## Wait for the release

Hyprland supports [`long_press` and `release` binding flags](https://wiki.hypr.land/configuring/core/binds/flags/). The first runs an action after you hold a key; the second runs when you release it.

The important part is deciding when to run the short action. A normal press binding runs immediately, before you know whether the press will become a hold. For two mutually exclusive actions, the short action has to wait until release.

A release binding alone is not enough either: releasing after a long press could launch the short action too. I use a shared Lua variable to remember whether the long action already ran.

## Start with one shortcut

Add this example to `~/.config/hypr/bindings.lua`. Replace any existing custom definitions for this same shortcut rather than keeping two copies.

```lua file=~/.config/hypr/bindings.lua
-- Remove existing bindings for this shortcut before adding the pair.
hl.unbind("SUPER + SHIFT + B")

do
  local long_pressed = false

  o.bind("SUPER + SHIFT + B", "Browser (private)", function()
    long_pressed = true
    hl.exec_cmd("omarchy-launch-browser --private")
  end, { long_press = true })

  o.bind("SUPER + SHIFT + B", "Browser", function()
    if not long_pressed then
      hl.exec_cmd("omarchy-launch-or-focus brave-origin omarchy-launch-browser")
    end
    long_pressed = false
  end, { release = true })
end
```

The `do ... end` block gives this pair its own local variable. Both callbacks share it:

- **Tap:** release happens before the long action fires. `long_pressed` is still `false`, so the regular browser command runs.
- **Hold:** the long callback sets `long_pressed` to `true` and opens the private window while the key is still held.
- **Release after holding:** the release callback skips the regular browser command, then resets the variable for the next press.

The flag records that the long callback fired, not whether the launched application succeeded. That is enough to decide which command to run.

## Put several pairs in a table

My actual config keeps the shortcut definitions in a table, then registers them in a loop. Here is a smaller version with two pairs:

```lua file=~/.config/hypr/bindings.lua
local bindings = {
  {
    keys = "SUPER + SHIFT + B",
    short = {
      "Browser",
      "omarchy-launch-or-focus brave-origin omarchy-launch-browser",
    },
    long = {
      "Browser (private)",
      "omarchy-launch-browser --private",
    },
  },
  {
    keys = "SUPER + SHIFT + W",
    short = {
      "Typora",
      [[omarchy-launch-or-focus ^Typora$ "uwsm-app -- typora --enable-wayland-ime"]],
    },
    long = {
      "Omawrite",
      "omarchy-launch-or-focus omawrite",
    },
  },
}

for _, binding in ipairs(bindings) do
  hl.unbind(binding.keys)
end

for _, binding in ipairs(bindings) do
  local long_pressed = false

  o.bind(binding.keys, binding.long[1], function()
    long_pressed = true
    hl.exec_cmd(binding.long[2])
  end, { long_press = true })

  o.bind(binding.keys, binding.short[1], function()
    if not long_pressed then
      hl.exec_cmd(binding.short[2])
    end
    long_pressed = false
  end, { release = true })
end
```

Use this **instead of** the single-shortcut example. Each table entry contains a description and a shell command for each action. The variable is declared inside the loop, so every pair has its own state. Holding the browser shortcut does not change what the writing shortcut does.

The browser commands come with Omarchy. The writing example assumes Typora and Omawrite are installed; replace those commands with applications you use.

## How long is a long press?

Hyprland's [keybinding implementation](https://github.com/hyprwm/Hyprland/blob/main/src/keybinds/Manager.cpp) schedules the long press using the active keyboard's repeat delay. My input config sets it to 300 milliseconds:

```lua file=~/.config/hypr/input.lua
hl.config({
  input = {
    repeat_delay = 300,
  },
})
```

If you want to change it, edit the `repeat_delay` value in your existing input configuration. A larger value gives you more time to release the key for a short press, but also delays keyboard autorepeat. This setting affects more than these shortcuts, and a device-specific repeat delay can override it.

## Reload and try both actions

After saving your bindings, reload Hyprland and check for errors:

```bash
hyprctl reload
hyprctl configerrors
```

Tap **SUPER + SHIFT + B**, then hold it. Release **B** before releasing the modifiers while checking the behavior. After the long press, the regular browser action should not run. Try another quick tap afterward to check that the state reset.

If both actions run, look for another binding using the same keys and make sure the short action uses `{ release = true }`. If you use the table version, keep `local long_pressed = false` inside the registration loop.

Without Omarchy, use Hyprland's `hl.bind` directly. For example, replace `o.bind(keys, description, callback, options)` with `hl.bind(keys, callback, options)` and add `description = "..."` to the options table if you want a label. You will also need to replace the Omarchy launcher commands. The tap-and-hold logic stays the same.
