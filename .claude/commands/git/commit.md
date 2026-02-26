---
description: Quality-gated commit with conventional commit format
category: git
allowed-tools: Bash, Read, Grep
---

Create a quality-gated commit with conventional commit format.

## Phase 1: Quality Gate

Before committing, run quality checks:

1. **Backend type-check:**
   ```
   cd backend && npx tsc --noEmit
   ```

2. **Frontend type-check:**
   ```
   cd frontend && npx tsc --noEmit
   ```

If either fails, show the errors and ask the user whether to:
- Fix the errors first (recommended)
- Commit anyway (not recommended, but user's choice)

## Phase 2: Review Changes

3. Run `git status` to see all modified, staged, and untracked files
4. Run `git diff` to review unstaged changes
5. Run `git diff --staged` to review staged changes
6. Run `git log --oneline -5` to check recent commit message conventions

Review the changes and flag anything suspicious:
- Files that might contain secrets (`.env`, credentials, API keys)
- Accidentally included files (`node_modules/`, `dist/`, `.DS_Store`, `.log`)
- Unrelated changes mixed in (suggest splitting into separate commits)

## Phase 3: Smart Staging

7. Stage only relevant files. Always EXCLUDE:
   - `node_modules/`
   - `dist/`
   - `.env*`
   - `.DS_Store`
   - `*.log`

If there are multiple logical change sets, suggest splitting into separate commits.

## Phase 4: Commit

8. Create commit with conventional commit format:

| Prefix | When to use |
|--------|-------------|
| `feat:` | New feature or capability |
| `fix:` | Bug fix |
| `refactor:` | Code restructuring without behavior change |
| `docs:` | Documentation only |
| `style:` | CSS/formatting (not code logic) |
| `chore:` | Config, tooling, dependencies |
| `test:` | Adding or updating tests |

Rules:
- Subject line: imperative mood, lowercase after prefix, max 72 chars
- Body (if needed): explain WHY, not WHAT
- Reference issue numbers if applicable

## Phase 5: Confirmation

```
=== Commit Summary ===
Hash    : <short-hash>
Message : <commit message>
Files   : X changed, +X insertions, -X deletions
Branch  : <branch-name>
```
