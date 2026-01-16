---
title: "Stop deleting files by accident!"
description: "Make rm safer by sending deletes to the Trash."
pubDatetime: "2026-01-19"
draft: true
heroImage: ../../../assets/images/2026/stop-deleting-files-by-accident/header.png
heroImageAlt: "Terminal-style banner showing rm to trash"
---

If you come from Windows, the first time you use `rm` can be a bit of a shock: there’s no Recycle Bin. The file is just… gone.

That’s bad enough for humans, but it’s even scarier now that terminal agents can run commands on your behalf.

## Make `rm` send files to the Trash

On Arch (and Omarchy), you can install `trash-cli`, which behaves like a command-line recycle bin.

```bash
sudo pacman -S trash-cli
```

Then alias `rm` to `trash` in your shell config (for bash, that’s `~/.bashrc`):

```bash
alias rm='trash'
```

From now on, `rm some-file` sends the file to:

- `~/.local/share/Trash`

That’s the same trash location used by Nautilus.

## Permanently delete when you really mean it

Sometimes you *do* want a permanent delete. In that case, call the real `rm` directly:

```bash
/bin/rm some_file.doc
```

## Empty the trash automatically

The Trash doesn’t empty itself. You can purge items older than N days:

```bash
trash-empty 30 # delete files older than 30 days
```

You can run that manually, or automate it. If you’re on Hyprland, one simple option is to add it to `~/.config/hypr/autostart.conf`:

```ini file=autostart.conf
# Empty the trash once every day
exec-once = trash-empty 30
```

That’s it — safer deletes, and a much smaller chance of a “well… crap” moment.
