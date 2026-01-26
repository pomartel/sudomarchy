---
title: "Remap that useless copilot key!"
description: "Use keyd to turn the Copilot key into a virtual F13 hotkey, then bind it to Voxtype dictation."
pubDatetime: "2026-01-26"
heroImage: copilot-to-dictation.png
heroImageAlt: "Copilot key remapped to dictation key"
---

On a bunch of recent laptops, manufacturers replaced the **right Ctrl** key with a **Copilot** key that opens Microsoft Copilot on Windows.

On Linux? It's basically dead weight.

[In my last post](/posts/keyd-capslock-escape-app-launcher), I used [keyd](https://github.com/rvaiya/keyd) to remap Caps Lock. Let's use keyd again, this time to make the Copilot key useful.

## The Weird Part: What the Copilot Key Actually Sends

There is no single universal "Copilot key" code. Different laptops send different signals.

On my laptop, the Copilot key doesn't send a single keycode. It sends:

**Left Shift + Left Meta (Super) + F23**

If you want to confirm what yours sends under Wayland/Hyprland, run this in a terminal and press the Copilot key:

```bash
wev
```

## 1. Remap the Copilot Key to F13

We'll map that awkward combo to **F13**.

But if you look at your keyboard, the F keys end at 12. There is no F13! And that's the point. We're creating a virtual key that we can bind in other programs.

Add this mapping to `/etc/keyd/default.conf` (inside the `[main]` section):

```ini file=/etc/keyd/default.conf
[main]
# Map the Windows Copilot key combo to F13
leftshift+leftmeta+f23 = f13
```

Reload keyd:

```bash
sudo keyd reload
```

If pressing the Copilot key still "does nothing", that's expected: we created a key we'll bind next.

## 2. Bind F13 to Voxtype Dictation

Omarchy ships with [Voxtype](https://voxtype.io/) for dictation. By default, dictation uses a hold shortcut (**Ctrl + Super + X**).

That's fine, but if you use dictation often, a single key is nicer.

Enable Voxtype's hotkey and bind it to **F13**:

```toml file=~/.config/voxtype/config.toml
[hotkey]
enabled = true
key = "F13"
```

Restart Voxtype:

```bash
systemctl --user restart voxtype
```

Now your Copilot key is a dedicated dictation key.

Thank you Microsoft.
