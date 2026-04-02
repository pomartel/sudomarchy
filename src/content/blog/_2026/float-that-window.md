---
title: "Float that window!"
description: "Use Hyprland window rules to float and center dialogs, like Typora's Print window."
pubDatetime: "2026-04-02"
ogImage: typora-print-dialog-floating.webp
heroImageAlt: "Typora's Print dialog floating and centered on the screen"
---

One thing I don't miss about macOS and Windows is the pile of floating windows stacked on top of one another. I much prefer the clarity of a tiling window manager paired with workspaces. No more hunting around and Alt-tabbing my way through a messy desktop.

But like any idea taken too far, there are times when a small floating window simply makes more sense. Let me show you a concrete example and how to solve it.

## Typora's print dialog

I really like Typora for writing. If you haven't tried it yet, it comes preinstalled with Omarchy and you can launch it with **SUPER + SHIFT + W**.

From time to time, I like to print documents for proofreading. Here's what happens when I open Typora's Print dialog:

![Typora's Print dialog opening as a tiled window](typora-print-dialog-tiled.webp)

That's not terrible, but it is a bit silly. A print dialog is exactly the kind of thing that makes more sense as a small floating window on top of the editor.

Let's fix that.

## Identify the window

The first thing you need to do is identify the window you want to float. Hyprland has a useful command for that:

```bash
hyprctl clients
```

This prints all open windows across all workspaces along with their properties. Here is the one we're looking for:

```ini
Window 55f20fbef620 -> Print:
        mapped: 1
        hidden: 0
        at: 2647,38
        size: 1181,1300
        workspace: 3 (3)
        floating: 0
        monitor: 1
        class: Typora # [!code highlight]
        title: Print # [!code highlight]
        ...
```

The most reliable way to target a window is usually with its class and title. In this case, the class is `Typora` and the title is `Print`.

## Create a `windows.conf` file

Your Hyprland config lives in `~/.config/hypr/`. The main file is `hyprland.conf`, which sources the rest of the configuration.

We could add window rules directly there, but I prefer to keep things modular. Add this line to `hyprland.conf`:

```ini file=~/.config/hypr/hyprland.conf
source = ~/.config/hypr/windows.conf
```

Then create `windows.conf` in the same directory. This is where we'll keep our custom window rules.

## Add the rule

The [window rules documentation](https://wiki.hypr.land/Configuring/Window-Rules/) on the Hyprland wiki is worth bookmarking. There are a lot of options, but the syntax is well documented and full of examples.

For this case, we want to match windows with the `Typora` class and `Print` title, then apply the `float` and `center` effects:

```ini file=~/.config/hypr/windows.conf
windowrule = match:class ^Typora$, match:title ^Print$, float on, center on
```

Notice the `^` and `$` characters. Those are regular expression anchors. They make sure we match the exact strings and not something broader like `Print Settings`.

Save the file then open the Print dialog again. The result is much nicer:

![Typora's Print dialog floating above the editor](typora-print-dialog-floating.webp)

## Reuse the effect with a tag

If this is the only window you want to float, you can stop here.

But if you want to reuse the same behavior for other dialogs later, it is cleaner to tag matching windows and then apply the effect through that tag:

```ini file=~/.config/hypr/windows.conf
windowrule = match:tag centered-floating-window, float on, center on
windowrule = tag +centered-floating-window, match:class ^Typora$, match:title ^Print$
```

## Unleash the possibilities

Floating a window is just the beginning. Once you get comfortable with Hyprland customisation, you can precisely control how windows open, where they land, and how they behave across workspaces.

In an upcoming post, I'll show you how to use Hyprland special workspaces to do even more cool stuff. Subscribe to the RSS feed if you don't want to miss it.
