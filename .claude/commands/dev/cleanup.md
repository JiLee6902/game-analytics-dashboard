---
description: Remove debug artifacts, temp files, and build output
category: dev
allowed-tools: Bash, Read, Glob
---

Clean up development artifacts from the project.

## Context

First run `git status` to understand current state.

## Target Files

Look for and report these artifact types:
- `dist/` directories (build output)
- `*.log` files (npm, error logs)
- `.DS_Store` files
- Orphaned `*.js` and `*.js.map` files in TypeScript source directories
- `console.log` or `console.debug` statements left in source code
- Commented-out code blocks (more than 5 lines)

## Safety Rules

**DO NOT delete:**
- `node_modules/` — use `npm install` to manage
- Any `.ts` or `.tsx` source files
- `package.json` or `package-lock.json`
- Configuration files (`tsconfig.json`, `vite.config.ts`)
- CSS files

## Instructions

1. List all found artifacts with file paths
2. Show the user what will be cleaned
3. Wait for user approval before deleting
4. After cleanup, run `git status` to show the result

## Example Output

```
=== Cleanup Report ===
Found 3 artifacts:
  [BUILD]  frontend/dist/        (12 files, 340KB)
  [LOG]    backend/npm-debug.log (2KB)
  [DEBUG]  frontend/src/App.tsx:42  console.log("debug")

Delete these? (waiting for approval)
```
