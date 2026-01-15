---
title: "Safely Override Any Omarchy Command"
description: "If you need to change the behaviour of an Omarchy command, here is how to do it safely."
pubDatetime: "2026-01-15"
draft: false
---

At its core, Omarchy is just a Git repository living in the `~/.local/share/omarchy` directory. That's where the magic happens. When you update your system, Omarchy pulls the latest changes from the [GitHub repo](https://github.com/basecamp/omarchy/) into that folder.

You should avoid making changes to the Omarchy directory. Otherwise it could prevent future updates from succeeding due to merge conflicts. But what if you need to make changes to the way Omarchy works? Fortunately, **Omarchy is fully extensible and you can pretty much override any setting.**

In this post, we'll focus on overriding Omarchy's bash commands. For every **SUPER + ALT** menu item, there is an underlying `omarchy-` command that gets executed (just a bash script really). For a list of all commands, you can open a terminal and type `omarchy` followed by the **TAB** key. You can also view them in the `~/.local/share/omarchy/bin` directory or on the [repo](https://github.com/basecamp/omarchy/tree/master/bin).

## Why override Omarchy commands?

Let me give you an example. I changed my setup to use [NetworkManager](https://networkmanager.dev/) and its TUI for managing my wifi connections instead of the default Impala TUI that ships with Omarchy. The problem is that the [`omarchy-launch-wifi`](https://github.com/basecamp/omarchy/blob/master/bin/omarchy-launch-wifi) command invokes `impala`. This command gets invoked from the waybar, the menu, and with the **SUPER + CTRL + W** shortcut.

Now we could change the waybar and Hyprland configs, but I find it more graceful to just override the command instead.

## Create the command bash script

The first thing to do is create a folder to put your scripts. For me, it's `~/bin` but it could be `~/scripts` or any other folder.

Next, create a script in that folder that will override the default Omarchy command. It should have the exact same name.

```bash file=omarchy-launch-wifi
#!/bin/bash
rfkill unblock wifi
omarchy-launch-or-focus-tui nmtui-connect
```

This overrides the `omarchy-launch-wifi` command but it could be any other one. I also override `omarchy-lock-screen` to prevent the system from locking 1password automatically.

**Don't forget to also make the file executable to be able to run it as a command.**

## Add the bin folder to the UWSM env file

The UWSM env file is a configuration file used by UWSM (Universal Wayland Session Manager) to define environment variables that must be set before a Wayland compositor and user session start.

The PATH variable is an environment variable used by operating systems to determine where to look for executable programs when you run a command.

To add your bin folder to the PATH in the UWSM env file, edit your `~/.config/uwsm/env` configuration and add the following line at the end of the file:

```bash file=~/.config/uwsm/env
# Add user scripts to PATH
export PATH=$HOME/bin:$PATH # [!code ++]
```
## Restart the system and test the command

You need to restart your system for the changes to take effect. After restarting, you can test the `which` command by running it in a terminal:

```bash
which omarchy-launch-wifi
# output: /home/your_username/bin/omarchy-launch-wifi
```

Now your command should override the default Omarchy command and execute your custom script instead. You can override any omarchy command by creating a script with the same name in your bin folder and making it executable.
