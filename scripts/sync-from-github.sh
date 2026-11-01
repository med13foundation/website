#!/bin/bash
# usage: bash scripts/sync-from-github.sh [--push | --boot]
export GIT_TERMINAL_PROMPT=0
MODE=default
[ "$1" = "--push" ] && MODE=push
[ "$1" = "--boot" ] && MODE=boot
LOG=""

say() {
  echo "[github-sync] $1"
  [ -n "$LOG" ] && echo "$(date -u +%Y-%m-%dT%H:%M:%SZ) [github-sync] $1" >> "$LOG"
}

sayall() {
  while IFS= read -r line; do
    [ -n "$line" ] && say "$line"
  done
}

stop() {
  say "$1"
  [ "$MODE" = "boot" ] && exit 0
  exit 1
}

cd "$(dirname "$0")/.." || exit 0
command -v git > /dev/null 2>&1 || { say "git isn't installed, skipping"; exit 0; }
GITDIR=$(git rev-parse --git-dir 2> /dev/null) || { say "not a git repo, skipping"; exit 0; }
[ "$MODE" = "boot" ] && LOG="$GITDIR/github-sync.log"

BRANCH=$(git symbolic-ref --short -q HEAD)
[ "$BRANCH" = "main" ] || stop "on '${BRANCH:-a detached HEAD}', not main, skipping"

if git rev-parse -q --verify MERGE_HEAD > /dev/null 2>&1 || [ -d "$GITDIR/rebase-merge" ] || [ -d "$GITDIR/rebase-apply" ]; then
  stop "a merge or rebase is in progress, skipping. Finish or abort it first."
fi

[ -z "$(git status --porcelain --untracked-files=no)" ] || stop "uncommitted changes, skipping. Commit them first."

if command -v timeout > /dev/null 2>&1; then
  timeout 30 git fetch --quiet origin +refs/heads/main:refs/remotes/origin/main > /dev/null 2>&1
else
  git fetch --quiet origin +refs/heads/main:refs/remotes/origin/main > /dev/null 2>&1
fi
[ $? -eq 0 ] || stop "couldn't reach GitHub, nothing changed"

BEHIND=$(git rev-list --count HEAD..origin/main)
AHEAD=$(git rev-list --count origin/main..HEAD)
OLD=$(git rev-parse HEAD)
CHANGED=0

if [ "$BEHIND" -eq 0 ] && [ "$AHEAD" -eq 0 ]; then
  say "up to date with GitHub main ($(git rev-parse --short HEAD))"
elif [ "$AHEAD" -eq 0 ]; then
  OUT=$(git merge --ff-only --quiet origin/main 2>&1) || { echo "$OUT" | sayall; stop "couldn't pull from GitHub, nothing changed"; }
  say "pulled $BEHIND commit(s) from GitHub: $(git rev-parse --short "$OLD") -> $(git rev-parse --short HEAD)"
  CHANGED=1
elif [ "$BEHIND" -eq 0 ]; then
  [ "$MODE" = "push" ] || say "$AHEAD commit(s) here aren't on GitHub yet"
else
  [ "$MODE" = "boot" ] && stop "Replit and GitHub have diverged ($AHEAD here, $BEHIND on GitHub); left as is"
  if ! git merge --no-edit origin/main > /dev/null 2>&1; then
    git merge --abort > /dev/null 2>&1
    stop "merge conflict with GitHub main; merge aborted, nothing changed. Ask Amy, Álvaro or Gian before going further."
  fi
  say "merged $BEHIND commit(s) from GitHub into Replit: $(git rev-parse --short "$OLD") -> $(git rev-parse --short HEAD)"
  CHANGED=1
fi

if [ "$CHANGED" -eq 1 ]; then
  FILES=$(git diff --name-only "$OLD" HEAD)
  echo "$FILES" | grep -qx -e "package.json" -e "package-lock.json" && say "package files changed: run npm install"
  echo "$FILES" | grep -qx "shared/schema.ts" && say "database schema changed: run npm run db:push"
fi

if [ "$MODE" = "push" ]; then
  PENDING=$(git rev-list --count origin/main..HEAD)
  if [ "$PENDING" -gt 0 ]; then
    OUT=$(git push origin HEAD:main 2>&1) || { echo "$OUT" | sayall; stop "push to GitHub main was rejected, nothing pushed"; }
    say "pushed $PENDING commit(s) to GitHub main"
  else
    say "nothing to push"
  fi
fi

exit 0
