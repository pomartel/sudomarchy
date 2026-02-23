---
title: "My backup setup (Part 1): documents, projects, and configs"
description: "A lightweight backup strategy: Dropbox for documents, Git for code, yadm for dotfiles."
pubDatetime: "2026-02-23"
heroImage: my-backup-setup-part-1.webp
heroImageAlt: "Dropbox, GitHub, and yadm logos"
draft: false
---

Prior to Omarchy, I was a Mac user for 15 years. I used Time Machine to back up my system to an external drive and, every few years when I got a new Mac, I would do a fresh install and download and reconfigure all my apps.

But as time went by, it became more and more tedious to configure new machines as I accumulated all sorts of undocumented little tweaks and settings. So I ended up relying exclusively on Time Machine and felt my setup was accumulating cruft.

With Omarchy, I was inspired by DHH's philosophy of a stateless, disposable machine (see [No backup, no cry](https://world.hey.com/dhh/no-backup-no-cry-274e0c31)). Instead of relying on a full-disk backup, I wanted to set things up so that I could spin up a new machine and have it ready within an hour.

This is the first of a series of two posts where I cover my backup strategy. It relies on Dropbox, Git, yadm, and a few Bash install scripts.

## 1. Syncing documents with Dropbox

Dropbox is one of the few big syncing providers that has native support for Linux. In fact, it's the solution DHH uses himself and it can easily be installed from the **Install > Service > Dropbox** menu.

I use it to back up all my personal files and documents that are not Git projects.

I assume Linux users don't need a tutorial on how to configure Dropbox. But a small tweak that I find quite useful is to create symlinks from my Dropbox folders to my home directory.

For example, if you have a `Documents` folder in Dropbox, you can symlink it this way:

```bash
ln -s ~/Dropbox/Documents ~/Documents
```

## 2. Syncing projects with Git

Well, this is another one that does not need explaining. All my Git projects are in the `~/Work` directory and are synced as long as I don't forget to push the latest changes to GitHub!

## 3. Syncing config files with yadm

When it comes to syncing config files, the three popular solutions I came across are [stow](https://www.gnu.org/software/stow/manual/), [yadm](https://yadm.io/) and [chezmoi](https://www.chezmoi.io/).

I first tried stow after watching [Typecraft's YouTube video](https://www.youtube.com/watch?v=NoFiYOqnC4o) raving about it. I just could not make it work the way I wanted. I would get tangled in all these symlink files and the commands did not feel intuitive.

I read about chezmoi but it felt a bit too much for what I needed. I didn't give it a proper shot and I know plenty of Linux users are happy with this solution.

I ended up choosing yadm, which is lightweight and works with plain Git commands. It treats your home folder like a Git repository and adds some niceties on top of it. You can encrypt files and use per-machine configurations. Overall it's just like managing a Git repository that you can push to GitHub, except that you use the `yadm` command instead of `git`.

If you need to track config files outside your home folder, you can symlink them. That's what I do for my keyd configuration.

I use yadm so much that I ended up creating a `y` alias in my `.bashrc` file to not have to type the full 4 characters!

```bash file=~/.bashrc
alias y=yadm
```

## 4. Owning a secondary machine

Since I contribute to Omarchy's development, I'm running my laptop on the [dev channel](https://learn.omacom.io/2/the-omarchy-manual/68/updates?search=channel#three-channels). So far, everything has been running smoothly.

But Arch Linux being a rolling release distro, you need to understand that things could go bad. That's one reason why I have a secondary machine just in case. This machine runs on the stable channel and is kept in sync with my primary machine.

## Part 2 - Apps and services

In my next post, I'll show you how I manage setting up a new machine in just a few minutes with Bash scripts. I was heavily inspired by the way Omarchy works under the hood.
