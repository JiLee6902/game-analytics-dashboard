---
description: Run all type-checks, find issues, and auto-fix them
category: workflow
allowed-tools: Bash, Read, Edit, Grep
---

Validate the entire codebase and fix any issues found.

## Phase 1: Type Checking

1. **Backend:**
   ```
   cd backend && npx tsc --noEmit 2>&1
   ```

2. **Frontend:**
   ```
   cd frontend && npx tsc --noEmit 2>&1
   ```

Capture all errors.

## Phase 2: Convention Checks

3. **verbatimModuleSyntax compliance:**
   Search frontend for type-only imports that are NOT using `import type`:
   - Grep for `import {` in `.tsx` and `.ts` files
   - Cross-reference with type definitions to find violations

4. **No `any` types:**
   ```
   grep -rn ": any" backend/src/ frontend/src/ --include="*.ts" --include="*.tsx"
   ```

5. **Unused imports:**
   Check for imports that aren't referenced in the file body.

6. **Console statements in production code:**
   ```
   grep -rn "console\." backend/src/ frontend/src/ --include="*.ts" --include="*.tsx"
   ```

## Phase 3: Auto-Fix

For each issue found:
1. Show the issue (file, line, description)
2. Propose the fix
3. Apply fixes automatically for safe changes:
   - `import { Type }` → `import type { Type }`
   - Remove unused imports
4. Ask user before applying risky changes:
   - Removing `any` types (needs proper type)
   - Removing console statements (might be intentional)

## Phase 4: Verify

Re-run type-checks after fixes to confirm everything passes.

## Report

```
=== Validation Report ===

Type Errors:      X found → X fixed
Import Style:     X violations → X fixed
Any Types:        X found → X fixed
Unused Imports:   X found → X removed
Console Stmts:    X found → X (asked user)

Final Status:
  Backend tsc:  PASS / FAIL
  Frontend tsc: PASS / FAIL
```
