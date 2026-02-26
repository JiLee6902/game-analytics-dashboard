---
description: Type-check and build both backend and frontend projects
category: dev
allowed-tools: Bash
---

Run full type-check and build for both projects.

## Steps

1. **Backend type-check:**
   ```
   cd backend && npx tsc --noEmit
   ```

2. **Frontend type-check:**
   ```
   cd frontend && npx tsc --noEmit
   ```

3. **Frontend production build** (optional, only if both type-checks pass):
   ```
   cd frontend && npm run build
   ```

## Report

```
=== Build Status ===
Backend  tsc : PASS / FAIL (X errors)
Frontend tsc : PASS / FAIL (X errors)
Frontend build : PASS / FAIL / SKIPPED
```

If any step fails, show the errors with file paths and line numbers.
