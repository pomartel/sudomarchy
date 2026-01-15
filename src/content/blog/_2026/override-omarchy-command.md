---
title: "Safely Override Any Omarchy Command"
description: "Here is how you can safely override any Omarchy command with your own bash script."
pubDatetime: "2026-01-15"
draft: false
---

At its core, Omarchy is a Git repository living in the `~/.local/share/omarchy` directory. When you update your system, Omarchy pulls the latest changes from the [GitHub repo](https://github.com/basecamp/omarchy/) into that folder.

You should avoid editing the Omarchy directory. Otherwise, future updates can fail due to merge conflicts. But what if you need to change how Omarchy behaves? Fortunately, Omarchy is fully extensible and you can override almost any setting.

In this post, we'll focus on overriding Omarchy's bash commands. Each **SUPER + ALT** menu item maps to an `omarchy-` command (just a bash script). To list them, open a terminal and type `omarchy` followed by the **TAB** key. You can also browse them in `~/.local/share/omarchy/bin` or on the [Github repo](https://github.com/basecamp/omarchy/tree/master/bin).

## Why override Omarchy commands?

Let me give you an example. I switched to [NetworkManager](https://networkmanager.dev/) and its TUI for managing my wifi connections instead of the default Impala TUI that ships with Omarchy. The problem is that the [`omarchy-launch-wifi`](https://github.com/basecamp/omarchy/blob/master/bin/omarchy-launch-wifi) command invokes `impala`. This command is used by the waybar, the menu, and the **SUPER + CTRL + W** shortcut.

I could update the waybar and Hyprland configs, but it feels cleaner to override the command instead.

## Create the command bash script

The first thing to do is create a folder to put your scripts. For me, it's `~/bin` but it could be `~/scripts` or any other folder.

Next, create a script in that folder that will override the default Omarchy command. It should have the exact same name.

```bash file=omarchy-launch-wifi
#!/bin/bash
rfkill unblock wifi
omarchy-launch-or-focus-tui nmtui-connect
```

This overrides the `omarchy-launch-wifi` command, but it could be any other one. I also override `omarchy-lock-screen` to prevent the system from locking 1Password automatically.

Don't forget to make the file executable so you can run it as a command:

```bash
chmod +x ~/bin/omarchy-launch-wifi
```

## Add the bin folder to the UWSM env file

The `~/.config/uwsm/env` file is a configuration file where Wayland environment variables a set.

The PATH variable is used by the OS to determine where to look for executable programs when you run a command.

Omarchy already adds its own bin directory to the PATH in that file. You just need to add your own bin directory to the PATH at the end of the file:

```bash file=~/.config/uwsm/env
# Add user scripts to PATH
export PATH=$HOME/bin:$PATH # [!code ++]
```
## Reboot and test the command

Reboot so the changes take effect. Then use the `which` command to verify your custom script is invoked when you run the Omarchy command:

```bash
which omarchy-launch-wifi
# output: /home/your_username/bin/omarchy-launch-wifi
```

You can override any Omarchy command by creating a script with the same name in your bin folder and making it executable. Just remember that if the command gets updated, your script will not receive the same updates.
