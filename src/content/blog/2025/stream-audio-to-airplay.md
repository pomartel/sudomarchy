---
title: "Stream Audio to Airplay Devices"
description: "A guide on how to stream audio from Omarchy to AirPlay speakers like Sonos or HomePod."
pubDatetime: "2025-12-19"
tags: ["howto", "audio", "airplay"]
heroImage: /assets/img/2025/stream-audio-to-airplay/header.png
heroImageAlt: "Wiremix TUI showing Sonos speakers"
---

My Thinkpad X1 laptop speakers sound terrible and so I wanted to be able to stream audio to my Sonos speaker that stands on my desk next to my computer. This works out of the box on Omarchy with Spotify Connect but I wanted to make it work not just for music but for general usage as well like watching Youtube videos.

I found this [helpful procedure](https://wiki.archlinux.org/title/PipeWire#Sharing_audio_devices_with_computers_on_the_network) on the ArchWiki and I got it to work pretty easily following these simple steps.

## 1. Install the pipewire-zeroconf package

It enables automatic discovery and connection of audio and video devices on a local network using Zeroconf protocols. I'm not sure what it means either but trust me, you need it!

```bash
sudo pacman -S pipewire-zeroconf
```

## 2. Load the RAOP Discover module

Copy the following code to `/etc/pipewire/pipewire.conf.d/raop-discover.conf` or `~/.config/pipewire/pipewire.conf.d/raop-discover.conf`. Personnally I prefer to put things in my home config directory and back it up with [YADM](https://yadm.io/) :

```js
context.modules = [
   {
       name = libpipewire-module-raop-discover
       args = { }
   }
]
```

## 3.Open up firewall porst for incoming traffic.

Now I only use Sonos devices and I haven't tried this config with other devices such as Homepods. But for Sonos, you do need to open up some ports for incoming UDP traffic. That's the main reason why I haven't submitted a PR to Omarchy for this.

```bash
sudo ufw allow 6001/udp comment "Stream to Airplay"
sudo ufw allow 6002/udp comment "Stream to Airplay"
```

## 4. Restart pipewire

Finally you will want to restart pipewire for the changes to take effect. Omarchy provide a command that you can use to do just that:

```bash
omarchy-restart-pipewire
```

Now when you click the speaker icon in the waybar or use the `SUPER + CTRL + A` shortcut and go to the Output Devices tab of wiremix, you should see your Ariplay speakers listed there.
