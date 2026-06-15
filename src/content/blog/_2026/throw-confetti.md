---
title: "Feeling happy? Let's throw confetti!"
description: "A totally useless trick that brings me joy: throw confetti on your desktop."
pubDatetime: "2026-02-09"
modDatetime: 2026-06-15
ogImage: throw-confetti.jpg
heroImageAlt: "Confetti bursts over the desktop"
---

_Update (2026-06-15): Sherlock-confetti is [now available in the AUR](https://github.com/Skxxtz/sherlock-confetti/issues/2#issuecomment-4709399415)._

<video controls autoplay playsinline loop muted preload="metadata" style="width: 100%; border-radius: 12px;">
  <source src="/assets/video/2026/throw-confetti/confetti.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>

To start the week on a good note, here's a totally useless trick that brings me joy: throwing confetti.

You spent hours fixing a bug? Throw confetti.

You learned something new with your Linux setup? Throw confetti.

Feeling happy? Throw confetti.

I didn't write this fun little program. Since I stumbled on [hyprsnow](https://github.com/spinualexandru/hyprsnow) (another cool project that simulates a little snowfall on top of your other apps), I've been looking for something similar but for confetti.

**[sherlock-confetti](https://github.com/Skxxtz/sherlock-confetti)** is just what I needed. It's a simple command-line tool that throws confetti on your screen. Since it's in the AUR, you can install it easily :

```bash
yay -S sherlock-confetti
```

Then you can bind it to a keyboard shortcut. I chose **SUPER + ALT + C** since it's not (yet!) taken by other Omarchy utilities:

```ini file=~/.config/hypr/bindings.conf
bindd = SUPER ALT, C, Confetti animation, exec, confetti
```

Have fun throwing confetti! 🎊
