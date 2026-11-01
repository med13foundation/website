---
name: GitHub sync
description: Pull from GitHub before changing anything; only published work goes to GitHub.
---

Run `bash scripts/sync-from-github.sh` before changing anything. It pulls from GitHub `main` and pushes the last published version, so GitHub matches what's live. Don't push to GitHub yourself.

**Why:** 38 commits sat unpushed in October 2026, and two pages went live without their route metadata.

**How to apply:** Stop and ask on a merge conflict or any other error from the script, except "not on main" (a task copy: carry on) and the `npm install` / `db:push` hint (run it, then the script again). Never rebase, force-push, or change git remotes.
