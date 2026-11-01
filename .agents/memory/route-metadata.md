---
name: Route metadata
description: Every public route needs an entry in shared/route-metadata.ts that points at the page's own translation keys.
---

Every new public route in `client/src/App.tsx` needs an entry in `shared/route-metadata.ts`, pointing at the same translation keys the page uses for its `document.title` and meta description (usually `metaTitle` and `metaDescription`). If the page appends " | MED13 Foundation" to its title in code, set `appendSiteName: true`.

**Why:** The server builds each page's title, description, share image and sitemap entry from that file. A route missing from it is served as "Page not found" with `noindex`, which hid `/science` and `/for-families` from search engines in October 2026.

**How to apply:** Add the entry in the same change as the page. When a page becomes a redirect, mark its entry `sitemap: false, noindex: true`, as `/roadmap` and `/what-is-med13-syndrome` are.
