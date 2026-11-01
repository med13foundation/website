---
name: GitHub sync
description: Pull from GitHub before changing anything, then commit and push after each change.
---

Pull with `bash scripts/sync-from-github.sh` before changing anything. After each change, commit it and run `bash scripts/sync-from-github.sh --push`.

**Why:** 38 commits sat unpushed in October 2026, and two pages went live without their route metadata.

**How to apply:** Stop and ask on a merge conflict or a failed push. Never rebase or force-push.
