---
title: "Safely Override Any Omarchy Command"
description: "If you need to change the behaviour of an Omarchy command, here is how to do it safely."
pubDatetime: "2026-01-15"
draft: true
---

At its core, Omarchy is just a Git repository living in your `~/.local/share/omarchy` directory. That's where the magic happens. When you update your system, Omarchy pulls the latest changes from the [Github repo](https://github.com/basecamp/omarchy/).

You should avoid making changes to the Omarchy directory at all costs. Otherwise this will prevent future pull requests and thus updates to succeed. But what if you need to make changes to the way Omarchy works? Fortunately, Omarchy is fully extendable and you can pretty much override any settings.

In this post, we'll focus on overriding Omarchy's bash commands. For every **SUPER + ALT** menu items, there is a underlying `omarchy-` command that gets executed (just a bash script really). For a list of all commands, you can open a terminal and type `omarchy` followed by the **TAB** key. You can also view them in the `~/.local/share/omarchy/bin` directory.

 ## Why override Omarchy commands?

Let me give you an example. I changed my setup to use [NetworkManager](https://networkmanager.dev/) and its TUI for managing my wifi connections instead of the default Impala TUI that ships with Omarchy. The problem is that the [`omarchy-launch-wifi`](https://github.com/basecamp/omarchy/blob/master/bin/omarchy-launch-wifi) command invokes `impala`. This command gets invoked from the waybar, the menu and for the **SUPER + CTRL + W** shortcut.

Now we could change the waybar and hyprland configs and replace the omarchy command but I find it more graceful to just override the command instead.

## Create the command bash script

First thing to do is to create a folder to put your scripts. For me, it's `~/bin` but it could be `~/scripts` or any other folder.

Next, create a script in that folder that will override the default Omarchy command. It should have the exact same name.

```bash file=omarchy-launch-wifi
#!/bin/bash
rfkill unblock wifi
omarchy-launch-or-focus-tui nmtui-connect
```

This overrides the `omarchy-launch-wifi` command but it could be any other one. I also override `omarchy-lock-screen` to prevent the system from locking 1password automatically.

**Don't forget to also make the file executable to be able to run it as a command.**

## Add the bin folder to the UWSM env file

The UWSM env file is a configuration file used by UWSM (Universal Wayland Session Manager) to define environment variables that must be set before a Wayland compositor and the user session start.

The PATH variable is an environment variable used by operating systems to determine where to look for executable programs when you run a command.

To add your bin folder to the PATH in the UWSM env file, edit your `~/.config/uwsm/env` configuration  and add the following line at the end of the file :

```bash file=~/.config/uwsm/env
# Add user scripts to PATH
export PATH=$HOME/bin:$PATH # [!code ++]
```
