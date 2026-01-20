---
title: "Stop deleting files by accident!"
description: "Make rm safer by sending deleted files to the Trash."
pubDatetime: "2026-01-20"
draft: false
heroImage: simpsons-meme.jpg
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

You can run that manually, or automate it. On Hyprland, one simple option is to add it to `~/.config/hypr/autostart.conf`:

```ini file=~/.config/hypr/autostart.conf
# Empty the trash once every day
exec-once = trash-empty 30
```

> [!NOTE]
> `exec-once` only runs when Hyprland starts, so it won’t run daily unless you restart daily.

That’s it — safer deletes, and a much smaller chance of a “well… crap” moment.
