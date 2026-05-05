---
title: "Stop Spotify from hogging your CPU and memory"
description: "Use spotifyd as a lightweight Spotify Connect daemon and keep the full Spotify app closed while music plays."
pubDatetime: "2026-05-05"
heroImage: stop-spotify-from-hogging-your-cpu-and-memory.png
heroImageAlt: "Spotify Linux app showing Kendrick Lamar playback and Spotify Connect output."
---

Spotify is my music streaming platform of choice and I love that they have a Linux client that comes bundled with Omarchy.

Unfortunately, that client is an Electron app and it's a memory and process hog, even when minimized to the system tray. So much so that it's the main reason my computer fan kicks in. Listening to music with the background noise of a fan, when I'm not wearing headphones, is not what I would call the best audiophile experience.

After trying different optimizations and alternative clients, I settled on [spotifyd](https://github.com/Spotifyd/spotifyd), which is a small Spotify Connect daemon that runs in the background.

Now I can open the Spotify app on my computer or my phone, select a playlist, close the app completely, and let the daemon play the music. Playback controls like play/pause and previous/next track work with the daemon, so I only open Spotify when I want to change the playlist.

> [!IMPORTANT]
> `spotifyd` requires a Spotify Premium account.

Here's how you can set this up.

## 1. Install `spotifyd`

Install `spotifyd` with your package manager:

```bash
sudo pacman -S spotifyd
```

## 2. Configure it

Next, configure `spotifyd` with the options you want. Here's my configuration file:

```toml file=~/.config/spotifyd/spotifyd.conf
[global]
backend = "pulseaudio"
device_name = "Laptop"
device_type = "computer"
bitrate = 320
initial_volume = 100
```

You can find all the available options on the [spotifyd documentation page](https://docs.spotifyd.rs/configuration/index.html).

I set `pulseaudio` as the backend. The device name will show up as _Laptop_ in Spotify Connect with a computer icon. I set the `bitrate` to the maximum value. I also keep Spotify's volume at 100% and control the volume at the system level instead.

## 3. Enable the service and test it

Next, enable and start the service so it always runs in the background:

```bash
systemctl --user enable --now spotifyd.service
```

If you tweak the configuration after starting the service, restart it for the changes to apply:

```bash
systemctl --user restart spotifyd.service
```

Now open the Spotify app on your computer or phone, click the _Connect to a device_ icon, and you should see _Laptop_, or whatever name you gave it. Select it, start some music, and close the app.

Turn up the volume and turn down the fan noise!
