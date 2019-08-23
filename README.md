# GobStopper

Pauses all videos across all open tabs by clicking on the icon or pressing F4

This is useful when working in an office environment where you may be
frequently interrupted while listening to music on Youtube or other
video/music streaming sites, and it is not always convenient to be
riffing through your open tabs closing the sound-making tab in front
of co-workers, bosses, clients, etc.

Permissions Usage:
* All sites - To allow this addon to work on any site that plays back media content
              you wish to block.
* Tabs - To go over all open tabs, hunting for applicable media players to pause


## Supported Browsers

Tested on Firefox 68, but it should also just work on most others
modern ones (e.g. most versions of Chrome).

* **Firefox Addons** - https://addons.mozilla.org/en-US/firefox/addon/gob-stopper/


## Roadmap

Features in released versions

* 0.1.0 - Pause videos on Youtube only
* 0.2.0 - Pause videos on other common sites with video content (e.g. Vimeo, Twitter, and others)

Release targets for upcoming releases are tentative only:

* 0.3.0 - Pause sound on common sites with audio content (HTML5 compatible ones)
* 0.4.0 - Resume playback on tabs that were playing at the time
* 0.5.0 - Pause Brightcove based players, news sites (e.g. CNN, NBC, stuff.co.nz, herald.co.nz)
* 0.6.0 - Pause audio streaming sites (e.g. Soundcloud, RNZ, Spotify)
* 0.7.0 - Add option for pausing all videos (including all that don't have sound), by using a more brute-force
          approach when the option is enabled.
* 0.8.0 - Add ability to define custom rule-sets for skipping some elements on pages (e.g. so decorative
          video backgrounds on some sites - e.g. blender.org / Blender Animation Studio pages - will continue
          to work).
* 0.9.0 - Disable "Autoplay Next" settings (e.g. the toggle on Youtube), Countdown + Autoplay on News Sites,
          and automatically pause videos (e.g. similar to Firefox's autoplay blocking option), but respecting
          the user's whitelists of elements to ignore.

## Licenses and Attribution

This addon was originally developed by @Aligorith

This addon is licensed under the [Mozilla Public License (MPL) 2.0](https://www.mozilla.org/en-US/MPL/)

The icons in `icons_source/` are licensed as follows:
* **Ambox_octagon_stop.svg** - CC BY-SA 3.0 - https://commons.wikimedia.org/wiki/File:Ambox_octogon_stop.svg
* **Octagon_delete.svg** - Public Domain - https://commons.wikimedia.org/wiki/File:Octagon_delete.svg


