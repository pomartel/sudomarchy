---
title: "Hyprland Workspaces Are Special"
description: "Use named Hyprland special workspaces to create focused scratchpads for apps like Music and Todos."
pubDatetime: "2026-04-16"
ogImage: hyprland-workspaces-are-special.png
ogImageAlt: "Spotify open in a centered Hyprland special workspace over a dimmed desktop background."
---

<video controls autoplay playsinline loop muted preload="metadata" style="width: 100%; border-radius: 12px;">
  <source src="/assets/video/2026/hyprland-workspaces-are-special/special-workspaces.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>

You are probably accustomed to numbered workspaces in Hyprland. They are those little numbers on the top left of your screen in the Waybar. Once you figure out the keyboard shortcuts and a good system for associating apps with workspaces, you'll be flying!

But did you know about special workspaces? A special workspace is a temporary workspace that floats on top of your current workspace and can be toggled on and off. It's like minimizing and maximizing a window in MacOS or Windows.

In Omarchy, this is called the scratchpad and you can toggle it with **SUPER + S**. I remember the first time I hit that shortcut by accident. My screen suddenly turned dimmer and I didn't know how to get out of it. Fun times!

But a scratchpad can be super useful for quick glances and keeping an app opened but out of sight.

In this post, I want to show you how we can take the concept of special workspaces even further so a single key combo can toggle an app.

## 1. Name it

Here is how you can toggle a special workspace from the terminal:

```bash
hyprctl dispatch togglespecialworkspace music
```

Here, `music` is just the name I gave to the workspace. It could be any other name.

That's cool, but not super useful by itself.

## 2. Script it

Now let's automatate toggling the special workspace with a simple little script:

```bash file=~/.local/bin/toggle-special-workspace
#!/bin/bash

special_workspace="$1"
current_special_workspace=$(hyprctl monitors -j | jq -r '.[] | select(.focused) | .specialWorkspace.name')

hyprctl dispatch togglespecialworkspace "$special_workspace"

if [[ "$current_special_workspace" == "special:$special_workspace" ]]; then
  exit 1
fi
```

The script takes the name of a special workspace as an argument and toggles it. It then exits with an error if that special workspace was already active. This will come in handy when we create the keybinding.

Once you have created the script file in your `bin` folder, don't forget to make it executable:

```bash
chmod +x ~/.local/bin/toggle-special-workspace
```

## 3. Bind it

Now let's open `~/.config/hypr/bindings.conf` and bind an app to a special workspace. Here's my Spotify shortcut, for example:

```ini file=~/.config/hypr/bindings.conf
bindd = SUPER SHIFT, M, Spotify, exec, toggle-special-workspace music && omarchy-launch-or-focus spotify
```

We are chaining two commands. When we press **SUPER + SHIFT + M**, Hyprland opens the special workspace named `music` and launches Spotify in it.

When we press the same shortcut again, it closes the workspace and the launch command does not execute because the script exited with an error.

Effectively, this gives us a single keybinding to toggle an app on and off.

## 4. Size it

Last but not least, we can constrain the size of the window in the special workspace with a window rule:

```ini file=~/.config/hypr/hyprland.conf
windowrule = match:workspace special:music, float on, size 1200 750, center on
```

## Is this useful at all?

Personally, I like it but it's easy to overdo it. I only use it for music and todos to keep the apps opened at all times but out of sight. A single keybinding lets me quickly toggle them on and off.
 
