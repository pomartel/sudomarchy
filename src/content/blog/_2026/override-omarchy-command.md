---
title: "Safely Override Omarchy Commands"
description: "Use personal Bash wrappers and explicit shortcuts to customise Omarchy commands without editing package files."
pubDatetime: "2026-01-15"
modDatetime: 2026-10-01
---

> [!NOTE]
> Updated for Omarchy Quattro (4.0.4). A `PATH` wrapper can replace direct command calls, but it does not override every route through the `omarchy` dispatcher.

Omarchy Quattro is installed through system packages. Its commands live in `/usr/bin`, and its defaults live in `/usr/share/omarchy`. Editing those files directly means your changes can disappear on the next package update. The [file-layout documentation](https://github.com/omacom/omarchy/blob/v4.0.4/docs/file-layout.md) explains the split.

Fortunately, you can keep your own scripts in `~/bin` and point your shortcuts at them. Let's use the browser launcher as an example.

## Why override Omarchy commands?

Suppose you want your browser shortcut to open a particular page when called without a URL, while still accepting URLs from other callers. A small wrapper lets you add that behavior and keep using Omarchy's launcher underneath.

The old version of this post used `omarchy-launch-wifi` and Impala. Quattro uses NetworkManager and its own Network panel, so that example no longer applies.

## Create the Bash wrapper script

Create your personal scripts directory:

```bash
mkdir -p ~/bin
```

Create this file with the same name as the packaged browser command:

```bash file=~/bin/omarchy-launch-browser
#!/bin/bash

if (( $# == 0 )); then
  set -- "https://sudomarchy.com/"
fi

exec /usr/bin/omarchy-launch-browser "$@"
```

The absolute path on the last line is important: calling `omarchy-launch-browser` without it could call the wrapper again, forever. Passing `"$@"` preserves URLs and options such as `--private`.

Make it executable:

```bash
chmod +x ~/bin/omarchy-launch-browser
```

## Add the bin folder to the PATH

The `PATH` variable tells the shell where to find commands. Put `~/bin` first if you want a direct call to `omarchy-launch-browser` to find your wrapper.

Add this line once to `~/.bashrc` for interactive Bash shells, and to `~/.config/uwsm/env` for your desktop session:

```bash
export PATH="$HOME/bin:$PATH"
```

Log out and back in to update the desktop environment. In a new terminal, check what Bash will run:

```bash
command -v omarchy-launch-browser
# Expected: /home/your_username/bin/omarchy-launch-browser
```

## Make the shortcut explicit

For a shortcut, I prefer to point directly at the wrapper. In `~/.config/hypr/bindings.lua`, replace the default browser binding:

```lua file=~/.config/hypr/bindings.lua
hl.unbind("SUPER + SHIFT + B")
o.bind("SUPER + SHIFT + B", "Browser with my start page",
  o.shell_quote(os.getenv("HOME") .. "/bin/omarchy-launch-browser"))
```

The [Omarchy Lua helpers](https://github.com/omacom/omarchy/blob/v4.0.4/default/hypr/helpers.lua) provide `o.bind` and `o.shell_quote`. Reload with `hyprctl reload`, check `hyprctl configerrors`, then try the shortcut.

## Know the limits

A direct `omarchy-launch-browser` call searches `PATH`. But `omarchy launch browser` resolves the packaged command relative to the dispatcher itself, so it bypasses this wrapper. Absolute paths bypass it too. You can see that in the [dispatcher source](https://github.com/omacom/omarchy/blob/v4.0.4/bin/omarchy).

If you want a menu entry to use your script, set its action explicitly in `~/.config/omarchy/extensions/omarchy-menu.jsonc`; the [dotfile documentation](https://github.com/omacom/omarchy/blob/v4.0.4/manual/31-dotfiles.md) explains how to override an entry by its ID.

So this is a useful way to customise commands you call directly. It is not a promise that every internal Omarchy action will use your version. Keep wrappers small, and review them when the underlying command changes.
