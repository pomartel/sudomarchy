---
title: "My Backup Setup (Part 2): Installation Scripts"
description: "How I use Omarchy bash scripts to automate app installs, system tweaks, and machine setup."
pubDatetime: "2026-02-27"
modDatetime: 2026-10-01
heroImage: my-backup-setup-part-2.png
heroImageAlt: "Terminal window showing a generic bash setup script"
draft: false
---

In [my last post](/posts/my-backup-setup-part-1), I covered how I use Dropbox, Git, and yadm to back up and sync my documents, projects, and config files. In part 2, I want to focus on how I install apps and customize my system with Bash scripts.

What happens when you install or update Omarchy? Packages and scripts work together to install software, configure the machine, and start services. Many actions in the Omarchy menu (**Super + Space** in Quattro) also have a command you can run from a terminal.

[Omarchy's source code](https://github.com/omacom/omarchy) now includes a Quickshell desktop and Lua configuration for Hyprland, alongside its Bash tools. The scripts in the [bin directory](https://github.com/omacom/omarchy/tree/v4.0.4/bin) are still a great place to understand how its commands work. You can use those commands to customize and automate your setup without editing Omarchy's packaged files.

For example, let's say you're setting up a new machine and want to install Dropbox. You could open the Omarchy menu and select **Install > Service > Dropbox**. Or you can open a terminal and run:

```bash
omarchy install service dropbox
```

How about removing a pre-installed web app like Basecamp? Again, you can do it from the Omarchy menu or with a single command:

```bash
omarchy webapp remove "Basecamp"
```

Ask yourself:

- How many apps do I install and remove?
- How many little tweaks do I make?
- How do I keep track of all of it in case I need to restore my setup?

All of this can be scripted with Bash so you can quickly apply the same changes on a new machine or keep two machines in sync.

Bash is not the most intuitive programming language, but in this age of agentic programming, that shouldn't stop you from getting your feet wet.

I created my own set of personal installation scripts, which are available on [GitHub](https://github.com/pomartel/omarchy-install-scripts). These scripts are tailored for my needs. They are not meant to be used as-is, but you can absolutely borrow ideas and recipes for your own configuration. That's the beauty of open-source.

When I created the scripts, I had three goals in mind:

- Sync my two laptops with the same base configuration while allowing per-machine customization.
- Have a single entry point (`NEW_INSTALL.sh`) that can set up a brand new machine.
- Make the scripts [idempotent](https://en.wikipedia.org/wiki/Idempotence), so I can rerun them safely without breaking my setup.

Now, whenever I tweak my setup or add a package I want to keep long-term, I make sure to add a script. It takes a bit of discipline, but it keeps my two computers aligned and lets me rebuild a new machine quickly when needed.

Enough talking, let's go scripting! 🤓
