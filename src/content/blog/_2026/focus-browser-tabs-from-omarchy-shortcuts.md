---
title: "Focus Browser Tabs from Your Omarchy Shortcuts"
description: "Browser Tab Focus lets my desktop shortcuts find an existing browser tab or open one when needed."
pubDatetime: "2026-10-08T11:56:00-04:00"
modDatetime: 2026-10-08
---

I wanted my shortcuts for Gmail, calendars and messaging apps to use regular browser tabs. Opening a URL was easy, but each press created another tab, even when the app was already open.

**Browser Tab Focus** fixes that: it brings an existing tab to the front, or opens one if needed. I'm using it with Brave on Omarchy.

With the extension loaded and its helper installed in `~/.local/share/browser-tab-focus`, this is the wrapper I keep in `~/bin`:

```bash file=~/bin/browser-tab-focus
#!/bin/bash
set -euo pipefail
project="$HOME/.local/share/browser-tab-focus/browser_tab_focus.py"
if [[ -x "$project" ]]; then
  exec "$project" "$@"
fi
# Keep email shortcuts usable on a laptop where the project is not installed yet.
if [[ $# == 1 && "$1" =~ ^https?:// ]]; then
  exec omarchy-launch-browser "$1"
fi
printf 'Browser Tab Focus is not installed in ~/.local/share/browser-tab-focus\n' >&2
exit 1
```

Make it executable with `chmod +x ~/bin/browser-tab-focus`, then use it in a shortcut:

```lua file=~/.config/hypr/bindings.lua
hl.unbind("SUPER + SHIFT + E")
o.bind("SUPER + SHIFT + E", "Gmail",
  "browser-tab-focus https://mail.google.com/mail/u/0/")
```

Reload with `hyprctl reload` and check `hyprctl configerrors`.

Use the site's final URL: AnyList needs `https://www.anylist.com/web`, including the `www`, to match its existing tab.
