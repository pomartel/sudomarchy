---
title: "Give Your Omarchy Shortcuts a Long Press Action"
description: "Here's how to use short press and long press shortcuts for your Omarchy applications."
pubDatetime: "2026-10-01T12:00:00-04:00"
draft: true
heroImage: hyprland-short-long-press-shortcuts.png
heroImageAlt: "A dark mechanical keyboard with the Super, Shift, and G keys highlighted in amber."
---

In Omarchy, applications are configured to open with a **SUPER + SHIFT** shortcut, with **ALT** added for a related action. For example, **SUPER + SHIFT + B** opens your browser, while **SUPER + SHIFT + ALT + B** opens a private window.

We can combine those into one shortcut: tap **SUPER + SHIFT + B** for your browser, hold it for a private window.

I've been using this technique for the past few weeks, and it's easier on my fingers and muscle memory. I mainly use it to open a plugin with a tap and its related application with a hold. Here are two examples from my setup, plus the stock X shortcuts that could be combined in the same way:

| Shortcut | Short press | Long press |
| --- | --- | --- |
| SUPER + SHIFT + C | Calendar plugin in the bar | Google Calendar webapp |
| SUPER + SHIFT + T | Todoist plugin in the bar | Todoist webapp |
| SUPER + SHIFT + X | X | Compose a post on X |

And since I [remapped Caps Lock to **SUPER + SHIFT**](/posts/keyd-capslock-escape-app-launcher), I only need to hold Caps Lock and tap or hold the application key.

## Ask your agent

Going forward, I am not going to post code snippets anymore since an agent can do the work. Instead, here is a prompt to start with:

> Configure SUPER + SHIFT + G in my Omarchy bindings: tap for Signal, hold for WhatsApp, without triggering both. Keep the existing ALT shortcut and launcher behavior. Reload Hyprland and check for errors.

Replace the keys and applications to use another pair. If you want to remove the old ALT shortcut, say so in the prompt.
