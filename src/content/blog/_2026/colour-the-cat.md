---
title: "Colour the cat!"
description: "Use bat to give cat syntax highlighting while keeping the simple cat workflow."
pubDatetime: "2026-05-13"
heroImage: colour-the-cat.png
heroImageAlt: "A cat with colourful rainbow fur"
---

`cat` is a command I use all the time to view the content of text files.

If you've never used `cat`, open a terminal with **SUPER + ENTER** and try it on your Bash config:

```bash
cat ~/.bashrc
```

For a distro like Omarchy, which puts a strong emphasis on aesthetics, this plain black-and-white output is a bit disappointing.

Let's fix that.

Omarchy ships with a `cat` replacement named [`bat`](https://github.com/sharkdp/bat). Its motto is *"a cat clone with wings"*. It includes syntax highlighting, Git integration, and pagination.

Try it on the same file:

```bash
bat ~/.bashrc
```

Now you get colours, line numbers, and pagination. Nice!

We could just use `bat` instead of `cat` and call it a day. But `cat` is widely used, muscle memory is real, and the original command still has value for simple output.

Fortunately, `bat` has an option to keep the colours without the line numbers or pagination. Let's add an alias to our `.bashrc` so `cat` uses `bat` by default:

```bash file=~/.bashrc
alias cat='bat -pp'
```

The `-pp` option is a shortcut for `--style=plain --paging=never`. It removes the decorations, like headers and row numbers, and makes the output flow continuously just like the normal `cat` command.

Reload your `.bashrc` after making the change:

```bash
source ~/.bashrc
```

Next, configure `bat` to use the current Omarchy theme colours. Create `~/.config/bat/config` with this content:

```bash file=~/.config/bat/config
--theme="base16"
```

This tells `bat` which syntax-highlighting theme to use. The `base16` theme is built around a small 16-colour palette, so it fits neatly with Omarchy's theme system instead of bringing in a totally different colour scheme.

Now try `cat ~/.bashrc` again. You should get a nicely coloured output while keeping the familiar `cat` command.

Credits to [@dwaynebradley](https://github.com/dwaynebradley) for posting this tip in the [Omarchy GitHub discussions](https://github.com/basecamp/omarchy/discussions/4906).
