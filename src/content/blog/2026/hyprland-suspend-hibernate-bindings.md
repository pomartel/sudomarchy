---
title: "Add Suspend and Hibernate Keybindings to Omarchy"
description: "Two lines of code you can add to your Hyprland bindings.conf file to suspend or hibernate the system with a keyboard shortcut."
pubDatetime: "2026-01-13"
draft: false
---

Recently, Omarchy maintainers removed the suspend option from the System menu. This caused a lot of complaints so they re-added it as an optional feature in the **Setup > System Sleep** menu in release 3.3. They also added an option to configure hibernation.

Not all computers handle suspend and hibernate properly in Linux so that's why Omarchy does not enable it by default. That's probably also why there is no keybinding for these features. But you can easily add them yourself.

Since Omarchy reserves **SUPER + CTRL** for utilities bindings, it would be an appropriate modifier for suspend instead of **SUPER + SHIFT** which is reserved for applications shortcuts. And since the **SUPER + Escape** binding already lets us access the system menu, the **Escape** key would make a good fit for suspend/hibernate shortcuts.

Add the following to `~/.config/hypr/bindings.conf`:

```ini
binddl = SUPER CTRL, Escape, Suspend system, exec, systemctl suspend
binddl = SUPER CTRL ALT, Escape, Hibernate system, exec, systemctl hibernate
```

Noticed the `l` at the end of the `binddl` setting? I learned that from the [hyprland documentation for binds](https://wiki.hypr.land/Configuring/Binds/). It stands for **lock** and that means the shortcut also works from the lock screen, so you can suspend or hibernate without unlocking first. Neat!

I think these two bindings could make a good Pull Request to Omarchy if suspend and hibernate eventually become default features of Omarchy.
