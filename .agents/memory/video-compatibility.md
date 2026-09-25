---
name: Video compatibility
description: Browser compatibility constraint for inline site video.
---

Keep a WebM (VP9/Opus) source alongside an MP4 (H.264/AAC) source for inline video, with native controls and same-origin range-serving URLs.

**Why:** A mobile-sized Chromium browser test could not load the H.264 MP4 despite a valid byte-range response and a compatible-looking source file. The same test played the WebM, sought successfully, and displayed timed subtitles. MP4 remains useful for Safari.

**How to apply:** When replacing or adding site video, check both formats and verify playback, seeking, and subtitle cues on a mobile viewport rather than relying only on a successful HTTP response.

When localizing a video with English text burned into its frames, do not add a second English track. Use the Spanish WebVTT cue timings to drive an opaque overlay over the original text in the inline player; keep native bottom-positioned cues as the fullscreen fallback.

**Why:** Moving native Spanish cues to the bottom still left a line of the burned-in English visible beneath them. Making the inline overlay fully opaque covered the original text, while the hidden text track kept cue timing and seeking in sync.

**How to apply:** If the video, captions, or player changes, inspect a frame with long two-line captions at desktop and mobile sizes. Check that Spanish covers the embedded English, Off removes the overlay, and fullscreen still has a readable native subtitle track.