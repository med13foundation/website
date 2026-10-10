---
name: Media image sourcing
description: Access constraints when sourcing preview photos from external article publishers.
---

SPARK article pages may return HTTP 403 to both direct requests and the web fetch service while their official CloudFront image assets remain accessible.

**Why:** Repeated page-fetch variations did not resolve the access block; an image search using the publisher and the article's family name found the relevant official asset.

**How to apply:** When SPARK blocks article access, search with specific article subjects rather than a generic headline. Confirm the image's publisher origin and relevance before using it; do not substitute unrelated family photos.
