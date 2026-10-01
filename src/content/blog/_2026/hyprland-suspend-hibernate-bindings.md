---
title: "Add Suspend and Hibernate Keybindings to Omarchy"
description: "Add Lua keybindings for suspend and hibernate, including support for the lock screen."
pubDatetime: "2026-01-13"
draft: false
modDatetime: 2026-10-01
---

> [!NOTE]
> Updated for Omarchy Quattro (4.0.4) and Lua keybindings. Suspend and resume still depend on your hardware; test them before relying on a shortcut.

The original version of this post covered Omarchy 3.3's optional sleep menu. Quattro's [system sleep documentation](https://github.com/omacom/omarchy/blob/v4.0.4/manual/36-system-sleep.md) now describes suspend and hibernation as enabled by default. Hibernation still requires the appropriate swap and boot setup; `omarchy hibernation setup` configures it on supported Limine installations.

Start by testing the sleep options in the **SUPER + Escape** system menu. If hibernation is not configured, follow that documentation first. A keyboard shortcut cannot make an unsupported sleep mode work.

Since Omarchy uses **SUPER + CTRL** for utility shortcuts and **SUPER + Escape** for the system menu, Escape still feels like a good fit.

Add the following to `~/.config/hypr/bindings.lua`:

```lua file=~/.config/hypr/bindings.lua
hl.unbind("SUPER + CTRL + Escape")
hl.unbind("SUPER + CTRL + ALT + Escape")
o.bind("SUPER + CTRL + Escape", "Suspend system", "systemctl suspend", { locked = true })
o.bind("SUPER + CTRL + ALT + Escape", "Hibernate system", "systemctl hibernate", { locked = true })
```

The `{ locked = true }` option replaces the old `l` in `binddl`. It allows the binding to run while the session is locked. Omarchy uses the same option for its [power and lid bindings](https://github.com/omacom/omarchy/blob/v4.0.4/default/hypr/bindings/utilities.lua).

Reload and check for configuration errors:

```bash
hyprctl reload
hyprctl configerrors
```

Save your work, then test suspend and resume first. Test hibernation separately after setup, and finally test both shortcuts from the lock screen. They call systemd directly, so hiding a sleep option in Omarchy's menu does not disable these bindings. Remove a binding if that mode is unreliable on your machine.
