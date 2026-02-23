---
title: "Disable Lock Screen Password When On a Trusted Wifi Network"
description: "Configure Hypridle to skip locking after sleep when you're connected to a trusted SSID."
pubDatetime: "2026-02-05"
draft: false
heroImage: disable-lock-screen-password-trusted-wifi-network.png
heroImageAlt: "A laptop connected to a trusted wifi network"
---

> [!WARNING]
>
> This procedure lowers the default security of your Omarchy installation. Make sure you understand the security risks involved before attempting this.

So this might be my most controversial post yet.

Computer security is often about finding the right balance between convenience and risk mitigation. And it's a bit like insurances. You don't think you need it until you really do.

With that said, I wanted to see if I could configure Hypridle to bypass the lock screen when I'm on my home network. This means that when my laptop wakes up from sleep, it will only show the lock screen if the laptop is not connected to my home wifi.

This is very convenient as I don't have to type my password most of the time. I also don't have any important work related stuff on that secondary laptop. But again, make sure you understand the security risk involved before proceeding.

> [!IMPORTANT]
> This uses the Wi-Fi network name (SSID) as the trust signal. SSIDs can be spoofed, so treat this as a convenience tweak, not a high-assurance security control.

## 1. Create the script

Here is the small bash script I use to check the current network and lock the computer if it's not connected to one of the network passed as an argument.

```bash file=~/bin/lock-unless-ssid
SAFE_SSIDS=("$@")

SSID="$(iw dev wlan0 link 2>/dev/null | sed -n 's/^.*SSID: //p')"

# Not connected to Wi-Fi => unsafe (lock).
if [[ -z "$SSID" ]]; then
    loginctl lock-session
    exit 0
fi

# Exact match against allowlist
for safe_ssid in "${SAFE_SSIDS[@]}"; do
    if [[ "$SSID" == "$safe_ssid" ]]; then
        echo "On a safe network ($SSID). No need to lock."
        exit 0
    fi
done

loginctl lock-session
```

> [!NOTE]
> If your Wi-Fi interface isn't `wlan0`, update the `iw dev wlan0 ...` part to match your interface name.

Don't forget to make the script executable:

```bash
chmod +x ~/bin/lock-unless-ssid
```

Since `~/bin` is in my [`PATH` variable](https://sudomarchy.com/posts/override-omarchy-command#add-the-bin-folder-to-the-uwsm-env-file), I can call the script directly:

```bash
lock-unless-ssid my-home-ssid
```

You can also pass multiple trusted SSIDs:

```bash
lock-unless-ssid my-home-ssid my-other-ssid
```

## 2. Edit `hypridle.conf`

Next we have to make some tweaks to our hypridle configuration:

```toml file=~/.config/hypr/hypridle.conf
general {
    lock_cmd = omarchy-lock-screen                         # lock screen and 1password
    before_sleep_cmd = loginctl lock-session # [!code --]
    after_sleep_cmd = sleep 2; lock-unless-ssid my-home-ssid # [!code highlight]
    inhibit_sleep = 3                                      # wait until screen is locked
}

listener {  # [!code --]
    timeout = 151  # [!code --]
    on-timeout = loginctl lock-session  # [!code --]
}

```

Here are the changes we made:

- Remove the `before_sleep_cmd` that locks the session.
- Lock the session once the computer resumes from sleep only if it's not connected to the SSID passed as an argument. We also wait 2 seconds to give it time to connect to the wifi (you might need to adjust that number).
- Remove the default listener that locks the session.

## 3. Restart hypridle and test it

Restart hypridle for the changes to take effect:

```bash
omarchy-restart-hypridle
```

Make sure you test all possible scenarios — on a trusted network, on an untrusted network and not connected to any network — before you enable this for good.

Remember you can also lock your computer manually at any time from the System menu or with the **SUPER+CTRL+L** shortcut.
