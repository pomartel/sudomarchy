---
title: "Oh-merci!"
description: "Sprinkle a little French, Italian, German, or any other language into Omarchy."
pubDatetime: "2026-04-13"
heroImage: oh-merci.webp
heroImageAlt: "Hyprlock screen with a localised password prompt"
---

If you are a native English speaker, this is probably not for you.

In this post, I want to show how we can sprinkle a little bit of French (or your language of choice) into Omarchy.

You might have noticed that, unlike most modern Linux distributions, Omarchy does not ask you to choose a language during installation. That's because Omarchy is English only. But as with anything Linux, we can change that.

Most of Omarchy's strings are located in the Omarchy menu (**SUPER + ALT + SPACE**). Although we could translate the menu options, there is not much value in doing so and it might make future updates more painful.

Instead, let's focus on three small areas that spark a little bit of joy.

## 1. Oggi è lunedì!

The first thing I localised when I switched to Omarchy was the day of the week in the Waybar. Although I am perfectly able to understand the date in English, it just feels more natural to read it in French.

They say you always count in your head in your native language. For me, the date is the same.

You only need to add a `locale` property to the Waybar `clock` configuration to localise the date:

```jsonc file=~/.config/waybar/config.jsonc
  "clock": {
    "locale": "it_IT.UTF-8", // [!code ++]
    "format": "{:L%A %H:%M}",
    "format-alt": "{:L%d %B W%V %Y}",
    "tooltip": false,
    "on-click-right": "omarchy-launch-floating-terminal-with-presentation omarchy-tz-select"
  },
```

Don't forget to restart Waybar afterwards:

```bash
omarchy-restart-waybar
```

## 2. Was ist das Passwort?

One screen you end up seeing often is the login screen. You can customise the look of that screen in the `~/.config/hypr/hyprlock.conf` file. As with everything Hyprland, there is a comprehensive [wiki page](https://wiki.hypr.land/Hypr-Ecosystem/hyprlock/) detailing all the options.

If you only want to translate the default strings, change the `placeholder_text` and `fail_text` in the `input-field` block.

This is a tiny change, but it makes the lock screen feel a little more yours.

## 3. Zorro de fuego

If you want to go all in on localisation, you might want to change the system language as well.

This informs your applications of your preferred language. Any application that offers a localised version (your browser, for example) can now use it.

You can set it with a simple command:

```bash
sudo localectl set-locale LANG=fr_CA.UTF-8
```

Restart the system so that applications can pick up the updated locale.

## Will Omarchy ever be internationalised?

[I doubt it!](https://github.com/basecamp/omarchy/issues/1187#issuecomment-3229657454)

Omarchy is not a mainstream distro trying to please just about everybody. It's [marketed](https://learn.omacom.io/2/the-omarchy-manual/91/welcome-to-omarchy) as an opinionated distribution (omakase!) that _ships with everything a modern software developer needs to be productive immediately_.

That probably assumes some level of fluency in English.

C'est la vie!
