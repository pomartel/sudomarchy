---
title: "Feeling happy? Let's throw confetti!"
description: "A totally useless trick that brings me joy: throw confetti on your desktop."
pubDatetime: "2026-02-09"
ogImage: "../../../assets/images/throw-confetti.jpg"
heroImageAlt: "Confetti bursts over the desktop"
draft: false
---

<video controls autoplay playsinline loop muted preload="metadata" style="width: 100%; border-radius: 12px;">
  <source src="/assets/video/2026/throw-confetti/confetti.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>

To start the week on a good note, here's a totally useless trick that brings me joy: throwing confetti.

You spent hours fixing a bug? Throw confetti.

You learned something new with your Linux setup? Throw confetti.

Feeling happy? Throw confetti.

I didn't write this fun little program. Since I stumbled on [hyprsnow](https://github.com/spinualexandru/hyprsnow) (another cool project that simulates a little snowfall on top of your other apps), I've been looking for something similar but for confetti.

Unfortunately, **[sherlock-confetti](https://github.com/Skxxtz/sherlock-confetti)** is not in the AUR, so you can't install it with `yay`. But you can follow the README instructions to install it easily, or you can use [the script](https://github.com/pomartel/Installation-Scripts/blob/main/packages/common/confetti.sh) I made to automate the installation process.

Then you can bind it to a keyboard shortcut. I chose **SUPER + ALT + C** since it's not (yet!) taken by other Omarchy utilities:

```ini file=~/.config/hypr/bindings.conf
bindd = SUPER ALT, C, Confetti animation, exec, confetti
```

Have fun throwing confetti! 🎊
