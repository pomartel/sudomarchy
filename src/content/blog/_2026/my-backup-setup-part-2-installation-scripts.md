---
title: "My Backup Setup (Part 2): Installation Scripts"
description: "How I use Omarchy bash scripts to automate app installs, system tweaks, and machine setup."
pubDatetime: "2026-02-27"
draft: true
---

In [my last post](/posts/my-backup-setup-part-1), I covered how I use Dropbox, Git, and yadm to back up and sync my documents, projects, and config files. In part 2, I want to focus on how I install apps and customize my system with Bash scripts.

What happens when you install or update Omarchy? A ton of Bash scripts are executed to install software, configure the machine, and start services. What happens when you select something from the Omarchy menu (**Super + Alt + Space**)? A Bash script is executed.

[Omarchy's source code](https://github.com/basecamp/omarchy) is about 90% Bash scripts. The best way to understand how Omarchy works under the hood is to read the scripts in the [bin directory](https://github.com/basecamp/omarchy/tree/dev/bin). Once you understand how the commands work, you can leverage Omarchy's built-in scripts to customize and automate your setup.

For example, let's say you're setting up a new machine and want to install Dropbox. You could open the Omarchy menu and select **Install > Service > Dropbox**. Or you can open a terminal and run:

```bash
omarchy-install-dropbox
```

How about removing a pre-installed web app like Basecamp? Again, you can do it from the Omarchy menu or with a single command:

```bash
omarchy-webapp-remove "Basecamp"
```

Ask yourself:

- How many apps do I install and remove?
- How many little tweaks do I make?
- How do I keep track of all of it?

All of this can be scripted with Bash so you can quickly apply the same changes on a new machine or keep two machines in sync.

Bash is not the most intuitive programming language, but in this new AI era, that shouldn't stop you from getting your feet wet.

I ended up creating my own set of installation scripts, which I [open-sourced on GitHub](https://github.com/pomartel/omarchy-install-scripts) These scripts are personal to my setup. They are not meant to be used as-is, but you can absolutely borrow ideas and recipes for your own configuration.

When I created the scripts, I had three goals in mind:

- Sync my two laptops with the same base configuration while allowing per-machine customization.
- Have a single entry point (`NEW_INSTALL.sh`) that can set up a brand new machine.
- Keep the scripts [idempotent](https://en.wikipedia.org/wiki/Idempotence), so I can rerun them safely without breaking my setup.

Now, whenever I tweak my setup or add a package I want to keep long-term, I make sure to add it to the scripts. It takes discipline, but it keeps my two computers aligned and lets me rebuild a new machine quickly when needed.

Enough talking, let's go scripting! 🤓
