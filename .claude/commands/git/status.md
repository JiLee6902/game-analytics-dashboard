---
description: Enhanced git status with change analysis
category: git
allowed-tools: Bash
---

Show an enhanced git status with meaningful analysis.

## Steps

1. Run `git status`
2. Run `git diff --stat` for unstaged change summary
3. Run `git diff --staged --stat` for staged change summary
4. Run `git log --oneline -5` for recent history

## Report

```
=== Repository Status ===
Branch    : <branch-name>
Tracking  : origin/<branch> [ahead X / behind X / up to date]

Staged Changes (ready to commit):
  M  backend/src/routes.ts     (+12 -3)
  A  frontend/src/NewFile.tsx   (+45)

Unstaged Changes:
  M  frontend/src/App.css       (+5 -2)

Untracked Files:
  ?  backend/src/newutil.ts

Recent Commits:
  abc1234  feat: add filtering endpoint
  def5678  fix: tooltip type issue
  ...
```

If working directory is clean, report that clearly.
