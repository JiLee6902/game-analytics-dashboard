---
description: Add a new feature following project conventions and patterns
category: workflow
allowed-tools: Bash, Read, Edit, Write, Grep, Glob
argument-hint: "<feature description>"
---

Add a new feature to the game-analytics-dashboard project: $ARGUMENTS

## Step 1: Analyze & Plan

Before writing any code:

1. **Read the current codebase** — understand existing patterns by reading:
   - `backend/src/types.ts` — shared data model
   - `backend/src/routes.ts` — API route patterns
   - `backend/src/store.ts` — data access layer
   - `frontend/src/types.ts` — frontend types
   - `frontend/src/hooks/useAnalytics.ts` — API communication pattern
   - `frontend/src/components/` — existing component structure
   - `frontend/src/App.css` — CSS variable system

2. **Plan the changes** — list which files need to be modified/created:
   - Present the plan to the user before implementing
   - Identify if the feature needs backend changes, frontend changes, or both
   - Identify if new types are needed

## Step 2: Implement — Backend (if needed)

Follow these conventions exactly:

| Concern | Location | Convention |
|---------|----------|------------|
| Types | `backend/src/types.ts` | Export interfaces, use PascalCase |
| Routes | `backend/src/routes.ts` | Use explicit `Request`/`Response` types from express |
| Data | `backend/src/store.ts` | Export pure functions, auto-increment string IDs |
| Validation | Inside route handler | Collect errors in `string[]`, return all at once with 400 |

```typescript
// Route handler pattern:
router.get('/endpoint', (req: Request, res: Response) => {
  // ... logic
  res.json(result);
});

// Validation pattern:
const errors: string[] = [];
if (!field) errors.push('field is required');
if (errors.length > 0) return res.status(400).json({ errors });
```

Platform enum is strictly: `"PC" | "Mobile" | "Console"` — no other values.

## Step 3: Implement — Frontend (if needed)

| Concern | Location | Convention |
|---------|----------|------------|
| Types | `frontend/src/types.ts` | Must match backend types, use `import type { X }` |
| API calls | `frontend/src/hooks/useAnalytics.ts` | Or new hook in `hooks/` folder |
| Components | `frontend/src/components/NewComponent.tsx` | Function component, PascalCase filename |
| Styles | `frontend/src/App.css` | Use CSS variables from `:root`, no CSS framework |

```typescript
// Import pattern (verbatimModuleSyntax):
import type { AnalyticsEntry } from '../types';  // types
import { useState, useEffect } from 'react';       // values

// Component pattern:
function MyComponent({ prop }: { prop: string }) {
  return <div className="my-component">{prop}</div>;
}
export default MyComponent;
```

## Step 4: Verify

After implementing, run these checks:

1. **Type-check both projects:**
   ```
   cd backend && npx tsc --noEmit
   cd frontend && npx tsc --noEmit
   ```

2. **Test the feature manually** — if it involves API changes, use curl to verify

3. **Check for regressions** — ensure existing features still work:
   - GET /analytics still returns data
   - GET /analytics/summary still returns stats
   - POST /analytics still validates correctly
   - Frontend renders without errors

## Step 5: Report

Summarize what was done:
- Files modified/created
- How to use the new feature
- Any follow-up work needed
