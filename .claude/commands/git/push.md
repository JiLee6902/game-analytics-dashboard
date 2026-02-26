---
description: Push to remote with pre-push verification
category: git
allowed-tools: Bash
---

Push current branch to remote with verification.

## Pre-push Checks

1. **Verify remote exists:**
   ```
   git remote -v
   ```
   If no remote, warn user and stop.

2. **Check tracking branch:**
   ```
   git branch -vv
   ```

3. **Check if behind remote:**
   ```
   git fetch && git status
   ```
   If behind, suggest `git pull --rebase` first.

## Push

4. Push to remote:
   ```
   git push -u origin <current-branch>
   ```

If push is rejected, suggest appropriate resolution (pull, rebase, etc.).

## Confirmation

```
=== Push Summary ===
Branch : <branch> → origin/<branch>
Commits: X new commits pushed
Status : OK / FAILED
```
