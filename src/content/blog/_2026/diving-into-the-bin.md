---
title: "Diving into the bin!"
description: "A tour of Omarchy's bin folder and a few of the commands that power the distro."
pubDatetime: "2026-03-27"
heroImage: diving-into-the-bin.png
heroImageAlt: "A full-screen field of omarchy command names from Omarchy's bin folder"
---

As of today, the [`bin` directory in the Omarchy repo](https://github.com/basecamp/omarchy/tree/dev/bin) contains 205 scripts, and that number keeps growing. A big part of Omarchy's core functionality lives in those small Bash scripts, so understanding how they work is one of the fastest ways to better understand your Linux distribution.

You often hear that to master Linux, you need to get comfortable with the terminal. That's especially true for a developer-oriented distro like Omarchy. So hit **SUPER + ENTER** and let's dive into the bin!

## Where's the bin?

Omarchy's commands are neatly prefixed with `omarchy-`. To view them all, type `omarchy-` and press **TAB** for autocompletion. As you'll quickly notice, there are a lot of them.

If you're new to the shell, you might wonder where those commands actually live. They are not in your current directory when you run `ls`. Omarchy stores them in `~/.local/share/omarchy/bin`, and that directory is added to the `PATH` environment variable.

`PATH` is simply the list of directories your shell searches when you run a command without a full path. To inspect it on your system, run:

```bash
echo $PATH
```

Now let's look at a few of my favourite Omarchy commands.

## 1. `omarchy-restart-*`

If you type `omarchy-restart-` and press **TAB**, you'll get a list of commands that restart specific apps and services.

If you're into Linux ricing and fiddle with your Waybar config a lot, `omarchy-restart-waybar` is the fastest way to reload it and see your changes. If you edit `~/.config/hypr/hypridle.conf`, you will also want to run `omarchy-restart-hypridle`, otherwise your new idle timings (screensaver, sleep, etc.) will not apply until the next reboot.

There are plenty of other restart commands depending on your needs. At one point or another, they'll make your life easier.

## 2. `omarchy-launch-*`

Have you taken a look at your `~/.config/hypr/bindings.conf` yet? This is where your keyboard shortcuts for launching apps are configured, and it's worth customising heavily so you almost never need the application launcher (**SUPER + SPACE**).

Here are a few especially useful commands you can use in `bindings.conf`:

| Command                          | What it does                                                                                |
| -------------------------------- | ------------------------------------------------------------------------------------------- |
| `omarchy-launch-or-focus`        | Launch or focus (if an instance is already active) a native app such as Obsidian or Spotify |
| `omarchy-launch-webapp`          | Launch a web app from a URL                                                                 |
| `omarchy-launch-or-focus-webapp` | Launch or focus (if an instance is already active) a web app from a URL                     |
| `omarchy-launch-or-focus-tui`    | Launch a terminal app from the command you pass as an argument                              |

Take a look at my [`bindings.conf`](https://github.com/pomartel/config-files/blob/master/.config/hypr/bindings.conf) for inspiration.

## 3. `omarchy-refresh-*`

Have you ever made a small change to your Waybar config and then watched it crash? Fear not, Omarchy has you covered. `omarchy-refresh-waybar` restores the default configuration file and backs up yours in the same directory with a `.bk.TIMESTAMP` suffix, where `TIMESTAMP` is the current Unix timestamp.

Omarchy usually leaves your config files alone, but refresh commands are sometimes forced when an update ships with a new default configuration. That happened with `hypridle.conf` in Omarchy 3.4.0. So if one of your files gets refreshed after an update, don't panic and don't curse just yet. Look for the backup file first.

## 4. `omarchy-webapp-install`

Every time you use the Omarchy menu (**SUPER + ALT + SPACE**) to trigger an action, you're running one of the scripts in the `bin` folder. Once you realize that, the distro starts to feel a lot less mysterious.

`omarchy-webapp-install` is a great example. In Omarchy 3.4.0, installing a web app from the menu stopped prompting for a custom icon and started fetching the site's default one instead. That caused some frustration in this [Github issue](https://github.com/basecamp/omarchy/issues/4912), but the terminal still gives you the more flexible version:

```bash
omarchy-webapp-install [name] [url] [icon]
```

This is often faster than using the menu, and you can even [automate the process](/posts/my-backup-setup-part-2-installation-scripts) with shell scripts so your apps are ready the next time you set up a new machine.

## Create your own commands

Once you understand the power of Bash scripts, you can start creating your own commands or safely overriding Omarchy's. I wrote a whole post about that [here](/posts/override-omarchy-command).

And if you're curious, you can also dive into [my bin](https://github.com/pomartel/config-files/tree/master/bin).
