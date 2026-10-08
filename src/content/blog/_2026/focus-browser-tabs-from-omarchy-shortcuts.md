---
title: "Focus Browser Tabs from Your Omarchy Shortcuts"
description: "Browser Tab Focus lets my desktop shortcuts find an existing browser tab or open one when needed."
pubDatetime: "2026-10-08T11:56:00-04:00"
---

I like having keyboard shortcuts for Gmail, my calendars, Messenger and the other web apps I use. But I wanted them to open in my regular browser window. Changing the launch command was easy. Avoiding a new tab every time I pressed the shortcut was another story.

Omarchy's webapp launcher can find an existing window. It doesn't search the tabs inside a regular browser window. So I built **Browser Tab Focus**, a small browser extension with a local Python helper.

## One shortcut, one existing tab

The shortcut passes a URL to the helper. The extension looks for a matching tab, activates it and brings its window forward. If there isn't one, it opens a new tab.

In my setup, a wrapper in `~/bin` makes the command look like this:

```bash
browser-tab-focus https://mail.google.com/mail/u/0/
```

It also finds Gmail when I'm reading a message, without confusing it with another Gmail account. If several tabs match, it prefers the focused window, then the most recently used tab.

I've connected it to my [short and long press shortcuts](/posts/hyprland-short-long-press-shortcuts): tap **SUPER + SHIFT + E** for Gmail, hold it for Outlook. The calendar plugin still opens with a tap; holding its shortcut takes me to Google Calendar in the browser.

## How the pieces connect

The extension uses the browser's [tabs API](https://developer.chrome.com/docs/extensions/reference/api/tabs) and communicates with the Python helper through [native messaging](https://developer.chrome.com/docs/extensions/develop/concepts/native-messaging). The command reaches that helper through a local Unix socket. There's no network server, and the extension doesn't read page contents.

I'm using it with Brave on Omarchy. The files live in `~/.local/share/browser-tab-focus`, and I load the `extension` folder through Brave's developer mode. That folder needs to stay put: Brave loads the extension directly from it.

One small catch: use the site's final URL. AnyList redirects `anylist.com/web` to `www.anylist.com/web`. Until I added the `www` to my shortcut, it kept opening duplicates. The extension compares URLs, not intentions!
