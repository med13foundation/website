---
name: Video compatibility
description: Browser compatibility constraint for inline site video.
---

Keep a WebM (VP9/Opus) source alongside an MP4 (H.264/AAC) source for inline video, with native controls and same-origin range-serving URLs.

**Why:** A mobile-sized Chromium browser test could not load the H.264 MP4 despite a valid byte-range response and a compatible-looking source file. The same test played the WebM, sought successfully, and displayed timed subtitles. MP4 remains useful for Safari.

**How to apply:** When replacing or adding site video, check both formats and verify playback, seeking, and subtitle cues on a mobile viewport rather than relying only on a successful HTTP response.