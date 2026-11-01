#!/bin/bash
# usage: bash scripts/sync-from-github.sh [--push | --boot]
export GIT_TERMINAL_PROMPT=0
LOG=""
HINTS=""

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

limited() {
  if command -v timeout > /dev/null 2>&1; then
    timeout "$@"
  else
    shift
    "$@"
  fi
}

hint() {
  say "$1"
  HINTS="$HINTS$1"$'\n'
}

case "$1" in
  "") MODE=default ;;
  --push) MODE=push ;;
  --boot) MODE=boot ;;
  *) MODE=boot; stop "unknown option '$1', nothing done. Use no option, --push or --boot." ;;
esac

cd "$(dirname "$0")/.." || stop "couldn't find the repo folder, skipping"
command -v git > /dev/null 2>&1 || stop "git isn't installed, skipping"
GITDIR=$(git rev-parse --git-dir 2> /dev/null) || stop "not a git repo, skipping"
[ "$MODE" = "boot" ] && LOG="$GITDIR/github-sync.log"
PENDINGFILE="$GITDIR/github-sync-pending"

if [ "$MODE" != "boot" ] && [ -s "$PENDINGFILE" ]; then
  say "a pull at boot changed these, so do them now:"
  while IFS= read -r line; do
    [ -n "$line" ] && hint "$line"
  done < "$PENDINGFILE"
  rm -f "$PENDINGFILE"
fi

BRANCH=$(git symbolic-ref --short -q HEAD)
[ "$BRANCH" = "main" ] || stop "on '${BRANCH:-a detached HEAD}', not main, skipping"

if git rev-parse -q --verify MERGE_HEAD > /dev/null 2>&1 || [ -d "$GITDIR/rebase-merge" ] || [ -d "$GITDIR/rebase-apply" ]; then
  stop "a merge or rebase is in progress, skipping. Finish or abort it first."
fi

STATUS=$(git status --porcelain --untracked-files=no) || stop "couldn't read git status, skipping"
[ -z "$STATUS" ] || stop "uncommitted changes, skipping. Commit them first."

limited 30 git fetch --quiet origin +refs/heads/main:refs/remotes/origin/main > /dev/null 2>&1 || stop "couldn't reach GitHub, nothing changed"

BEHIND=$(git rev-list --count HEAD..origin/main) || stop "couldn't compare with GitHub main, nothing changed"
AHEAD=$(git rev-list --count origin/main..HEAD) || stop "couldn't compare with GitHub main, nothing changed"
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
  if ! OUT=$(git merge --no-edit origin/main 2>&1); then
    if git rev-parse -q --verify MERGE_HEAD > /dev/null 2>&1; then
      if git merge --abort > /dev/null 2>&1 && ! git rev-parse -q --verify MERGE_HEAD > /dev/null 2>&1; then
        stop "merge conflict with GitHub main; merge undone, nothing changed. Ask Amy, Álvaro or Gian before going further."
      fi
      stop "merge conflict with GitHub main, and undoing it failed. Don't change anything; ask Amy, Álvaro or Gian."
    fi
    echo "$OUT" | sayall
    stop "couldn't merge GitHub main, nothing changed"
  fi
  say "merged $BEHIND commit(s) from GitHub into Replit: $(git rev-parse --short "$OLD") -> $(git rev-parse --short HEAD)"
  CHANGED=1
fi

if [ "$CHANGED" -eq 1 ]; then
  FILES=$(git diff --name-only "$OLD" HEAD)
  echo "$FILES" | grep -qx -e "package.json" -e "package-lock.json" && hint "package files changed: run npm install"
  echo "$FILES" | grep -qx "shared/schema.ts" && hint "database schema changed: run npm run db:push"
  [ "$MODE" = "boot" ] && [ -n "$HINTS" ] && printf '%s' "$HINTS" >> "$PENDINGFILE"
fi

if [ "$MODE" = "push" ]; then
  [ -z "$HINTS" ] || stop "not pushed yet: run the commands above, commit anything they change, then run --push again"
  PENDING=$(git rev-list --count origin/main..HEAD) || stop "couldn't compare with GitHub main, nothing pushed"
  if [ "$PENDING" -gt 0 ]; then
    OUT=$(limited 60 git push origin HEAD:main 2>&1) || { echo "$OUT" | sayall; stop "push to GitHub main failed, nothing pushed"; }
    say "pushed $PENDING commit(s) to GitHub main"
  else
    say "nothing to push"
  fi
fi

exit 0
