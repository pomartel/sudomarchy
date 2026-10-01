---
title: "Stop deleting files by accident"
description: "Make rm safer by sending deleted files to the Trash."
pubDatetime: "2026-01-20"
modDatetime: 2026-10-01
heroImage: stop-deleting-files-by-accident.jpg
heroImageAlt: "0 days without deleting a file by acident"
---

If you come from Windows, the first time you use `rm` can be a bit of a shock: there’s no Recycle Bin. The file is just… gone.

That’s bad enough for humans, but it’s even scarier now that terminal agents can run commands on your behalf.

## Make `rm` send files to the Trash

On Arch (and Omarchy), you can install `trash-cli`, which behaves like a command-line recycle bin.

```bash
sudo pacman -S trash-cli
```

Then alias `rm` to `trash` in your shell config (for bash, that’s `~/.bashrc`):

```bash file=~/.bashrc
alias rm='trash'
```

From now on, `rm some-file` sends the file to `~/.local/share/Trash`.

That’s the same trash location used by Nautilus, the file explorer in Omarchy.

## Permanently delete when you really mean it

Sometimes you *do* want a permanent delete. In that case, call the real `rm` command directly:

```bash
command rm some_file.doc
```

## Empty the trash automatically

The Trash doesn’t empty itself. You can purge items older than N days:

```bash
trash-empty 30 # delete files older than 30 days
```

You can run that manually, or automate it. On Omarchy Quattro, one simple option is to add it to `~/.config/hypr/autostart.lua`:

```lua file=~/.config/hypr/autostart.lua
-- Delete trash older than 30 days when the session starts
o.launch_on_start("trash-empty 30")
```

> [!NOTE]
> This runs when your Hyprland session starts, not on a daily schedule. Reloading the configuration does not run it again. Use a systemd user timer if you want daily cleanup regardless of when you log in.

That’s it — safer deletes, and a much smaller chance of a “well… crap” moment.
