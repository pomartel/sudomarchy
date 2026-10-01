---
title: "Hyprland Workspaces Are Special"
description: "Use named Hyprland special workspaces to create focused scratchpads for apps like Music and Todos."
pubDatetime: "2026-04-16"
ogImage: hyprland-workspaces-are-special.png
ogImageAlt: "Spotify open in a centered Hyprland special workspace over a dimmed desktop background."
modDatetime: 2026-10-01
---

<video controls autoplay playsinline loop muted preload="metadata" style="width: 100%; border-radius: 12px;">
  <source src="/assets/video/2026/hyprland-workspaces-are-special/special-workspaces.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>

> [!NOTE]
> Updated for Omarchy Quattro (4.0.4) and Lua. The video shows the earlier desktop appearance.

You are probably accustomed to numbered workspaces in Hyprland. They are those little numbers on the top left of your screen in the Omarchy bar. Once you figure out the keyboard shortcuts and a good system for associating apps with workspaces, you'll be flying!

But did you know about special workspaces? A special workspace is a temporary workspace that floats on top of your current workspace and can be toggled on and off. It's like minimizing and maximizing a window in MacOS or Windows.

In Omarchy, this is called the scratchpad and you can toggle it with **SUPER + S**. I remember the first time I hit that shortcut by accident. My screen suddenly turned dimmer and I didn't know how to get out of it. Fun times!

But a scratchpad can be super useful for quick glances and keeping an app opened but out of sight.

In this post, I want to show you how we can take the concept of special workspaces even further so a single key combo can toggle an app.

## 1. Name it

Here is how you can toggle a special workspace from the terminal:

```bash
hyprctl dispatch 'hl.dsp.workspace.toggle_special("music")'
```

Here, `music` is just the name I gave to the workspace. It could be any other name.

That's cool, but not super useful by itself.

## 2. Toggle it with Lua

Quattro uses `~/.config/hypr/bindings.lua` for your shortcuts. Add this function there:

```lua file=~/.config/hypr/bindings.lua
local function toggle_music()
  local current = hl.get_active_special_workspace()
  local was_open = current and current.name == "special:music"

  hl.dispatch(hl.dsp.workspace.toggle_special("music"))
  if not was_open then
    hl.exec_cmd("omarchy-launch-or-focus spotify")
  end
end
```

It checks the focused monitor's special workspace before toggling. If Music was open, it closes without launching or focusing Spotify again. Otherwise it opens Music, then launches Spotify or focuses its existing window. The [Lua API](https://wiki.hypr.land/Configuring/Advanced-and-Cool/Expanding-functionality/) exposes that state directly, so we no longer need the old Bash helper.

## 3. Bind it

Below the function in the same file, replace the default music shortcut:

```lua file=~/.config/hypr/bindings.lua
hl.unbind("SUPER + SHIFT + M")
o.bind("SUPER + SHIFT + M", "Toggle Spotify workspace", toggle_music)
```

Quattro installs Spotify on demand through `omarchy install service spotify`. Install it first if needed.

## 4. Place and size it

A launch-or-focus command can find Spotify on any workspace. Let's give new Spotify windows an explicit home, and keep their size manageable.

Add these rules at the bottom of `~/.config/hypr/hyprland.lua`, after the existing imports. If you followed [Float that window!](/posts/float-that-window), you can put them in your loaded `windows.lua` instead:

```lua file=~/.config/hypr/hyprland.lua
o.window("^[Ss]potify$", { workspace = "special:music silent" })
o.window({ class = "^[Ss]potify$", workspace = "special:music" }, {
  float = true,
  size = { 1200, 750 },
  center = true,
})
```

Check Spotify's actual class with `hyprctl clients` and adjust the match if necessary. These [window rules](https://wiki.hypr.land/Configuring/Basics/Window-Rules/) apply the initial placement and size when a window opens. Close Spotify before testing, reload with `hyprctl reload`, and check `hyprctl configerrors`.

Press **SUPER + SHIFT + M** to launch it in Music. Press again to hide it, and once more to bring it back without creating another window. Also test while another special workspace is open and after changing monitors. Adjust the dimensions if 1200 by 750 is too large for your display.

If you followed the old version, remove the binding that called `toggle-special-workspace`. You can delete that helper once nothing else uses it. These examples have been checked against the Lua APIs; the window placement and focus behavior still need validation in your session.

## Is this useful at all?

Personally, I like it but it's easy to overdo it. I only use it for music and todos to keep the apps opened at all times but out of sight. A single keybinding lets me quickly toggle them on and off.
