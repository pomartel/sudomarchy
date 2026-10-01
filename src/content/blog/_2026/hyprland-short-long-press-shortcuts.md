---
title: "Give Your Omarchy Shortcuts a Second Action"
description: "Use Lua callbacks to give a Hyprland shortcut separate tap and hold actions, without triggering both when you release the key."
pubDatetime: "2026-10-01T12:00:00-04:00"
draft: true
heroImage: hyprland-short-long-press-shortcuts.png
heroImageAlt: "A dark mechanical keyboard with the Super, Shift, and G keys highlighted in amber."
---

Omarchy gives several applications a **SUPER + SHIFT** shortcut, with **ALT** added for a related action. For example, **SUPER + SHIFT + B** opens your browser, while **SUPER + SHIFT + ALT + B** opens a private window.

We can combine those into one shortcut: tap **SUPER + SHIFT + B** for your browser, hold it for a private window. No extra finger gymnastics.

Here are a few pairs from [Omarchy's stock application bindings](https://github.com/omacom/omarchy/blob/v4.0.4/default/hypr/bindings/applications.lua):

| Shortcut | Short press | Long press (stock ALT action) |
| --- | --- | --- |
| SUPER + SHIFT + G | Signal | WhatsApp |
| SUPER + SHIFT + B | Regular browser | Private browser window |
| SUPER + SHIFT + A | ChatGPT | Grok |
| SUPER + SHIFT + X | X | Compose a post on X |

Some of these applications belong to Omarchy's optional preinstalls. Pick a pair you actually use.

## Ask your agent

Your agent can inspect your current bindings and make the change. Here is a prompt to start with:

> In my Omarchy Hyprland Lua configuration, combine the stock SUPER + SHIFT + G (Signal) and SUPER + SHIFT + ALT + G (WhatsApp) actions into a tap-and-hold shortcut on SUPER + SHIFT + G. A short press should launch Signal; a long press should open or focus WhatsApp. Trigger the short action on release only if the long action did not fire. Preserve the existing launcher behavior, keep the ALT shortcut available, and leave unrelated bindings untouched. Edit my user configuration, then reload Hyprland and check for configuration errors.

Replace the keys and applications to use another pair. If you want to remove the old ALT shortcut, say so in the prompt.
