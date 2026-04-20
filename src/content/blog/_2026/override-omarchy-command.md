---
title: "Safely Override Any Omarchy Command"
description: "Here is how you can safely override any Omarchy command with your own Bash script."
pubDatetime: "2026-01-15"
---

At its core, Omarchy is a Git repository living in the `~/.local/share/omarchy` directory. When you update your system, Omarchy pulls the latest changes from the [GitHub repo](https://github.com/basecamp/omarchy/) into that folder.

You should avoid editing the Omarchy directory. Otherwise, future updates can fail due to merge conflicts. But what if you need to change how Omarchy behaves? Fortunately, Omarchy is fully extensible and you can override almost any setting.

In this post, we'll focus on overriding Omarchy's Bash scripts. Each **SUPER + ALT** menu item maps to an `omarchy-*` command. To list them, open a terminal and type `omarchy` followed by the **TAB** key. You can also browse them in `~/.local/share/omarchy/bin` or on the [GitHub repo](https://github.com/basecamp/omarchy/tree/master/bin).

## Why override Omarchy commands?

Let me give you an example. I switched to [NetworkManager](https://networkmanager.dev/) and its TUI for managing my Wi-Fi connections instead of the default Impala TUI that ships with Omarchy. The problem is that the [`omarchy-launch-wifi`](https://github.com/basecamp/omarchy/blob/master/bin/omarchy-launch-wifi) command invokes `impala`. This command is used by Waybar, the menu, and the **SUPER + CTRL + W** shortcut.

I could update the Waybar and Hyprland configs, but it feels cleaner to override the command instead.

## Create the Bash wrapper script

The first thing to do is create a folder to put your scripts. For me, it's `~/bin` but it could be `~/scripts` or any other folder.

Next, create a script in that folder that will override the default Omarchy command. It should have the exact same name.

```bash file=omarchy-launch-wifi
#!/bin/bash
rfkill unblock wifi
omarchy-launch-or-focus-tui nmtui-connect
```

Don't forget to make the file executable so you can run it as a command:

```bash
chmod +x ~/bin/omarchy-launch-wifi
```

This overrides the `omarchy-launch-wifi` command to use a different TUI.

## Add the bin folder to the PATH

The `~/.config/uwsm/env` file is a configuration file where Wayland environment variables are defined.

`.bashrc` is a script that runs whenever you open a new terminal window.

The `PATH` variable is used by the OS to determine where to look for executable programs when you run a command.

Omarchy already adds its own bin directory to `PATH`. Prepend your bin directory to `PATH` at the end of these two files so it takes precedence over Omarchy's `PATH` entry.

```bash file=~/.bashrc
# Add custom user scripts to PATH
export PATH=$HOME/bin:$PATH # [!code ++]
```

```bash file=~/.config/uwsm/env
# Add custom user scripts to PATH
export PATH=$HOME/bin:$PATH # [!code ++]
```
## Reboot and test the command

Reboot so the changes take effect. Then use the `which` command to verify your custom script is invoked when you run the Omarchy command:

```bash
which omarchy-launch-wifi
# output: /home/your_username/bin/omarchy-launch-wifi
```

You can override any Omarchy command by creating a script with the same name in your `bin` folder. Just remember that if the command gets updated, you will need to update your script manually.
