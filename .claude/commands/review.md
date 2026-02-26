---
description: Full 4-phase code review with type safety, conventions, and cross-cutting concerns
category: workflow
allowed-tools: Bash, Read, Grep, Glob
---

Perform a professional-grade code review of the entire game-analytics-dashboard project.

## Phase 1: Automated Checks

Run these checks first and capture all output:

1. **Backend type-check:**
   ```
   cd backend && npx tsc --noEmit
   ```

2. **Frontend type-check:**
   ```
   cd frontend && npx tsc --noEmit
   ```

Report any type errors immediately. If there are errors, still continue the review.

## Phase 2: Backend Review (`backend/src/`)

Read every file in `backend/src/` and check:

### 2.1 Architecture & Structure
- Server setup in `index.ts` or `server.ts` — proper CORS config, port binding, error handling
- Route organization — clean separation of concerns
- Store module — data integrity, ID generation safety

### 2.2 Type Safety
- All route handlers use explicit `Request`/`Response` type annotations
- No `any` types anywhere (strict mode)
- Shared types in `types.ts` match frontend types exactly
- Response shapes are consistent (always JSON, proper status codes)

### 2.3 API Correctness
- `GET /analytics` — all 5 filter params (gameName, platform, genre, startDate, endDate) implemented correctly
- `POST /analytics` — validates ALL fields, returns 400 with error array (not just first error)
- `GET /analytics/summary` — returns correct aggregation
- Platform validation uses strict enum: `"PC" | "Mobile" | "Console"`

### 2.4 Error Handling
- Malformed JSON body handled gracefully (not 500)
- Unknown routes return 404 (not default Express HTML)
- No unhandled promise rejections

### 2.5 Security (even without auth)
- No eval, no dynamic require
- Input sanitization (XSS via game names?)
- CORS configured intentionally (not accidentally open)
- No sensitive data in responses

## Phase 3: Frontend Review (`frontend/src/`)

Read every file in `frontend/src/` and check:

### 3.1 Import Style (Critical)
- Every type-only import MUST use `import type { X }` — required by `verbatimModuleSyntax`
- Flag any `import { SomeType }` that should be `import type { SomeType }`

### 3.2 Component Quality
- All components are function components (no class components)
- Props are properly typed (no inline `any`)
- No missing key props in `.map()` renders
- Conditional rendering handles loading/error states

### 3.3 Hook Quality (`hooks/`)
- API calls use try/catch with proper error state
- Loading states are set/cleared correctly (set before fetch, clear in finally)
- No memory leaks (cleanup on unmount if using effects)
- Dependencies in useEffect/useCallback/useMemo are correct

### 3.4 Recharts Integration
- Tooltip `formatter` handles `value: number | undefined` using `Number(value)`
- Chart data is properly typed
- Responsive container used for chart sizing

### 3.5 CSS Review (`App.css`)
- Uses CSS variables from `:root` (no hardcoded colors)
- No unused CSS classes
- Responsive breakpoints work (if media queries exist)

## Phase 4: Cross-Cutting Concerns

### 4.1 Type Consistency
- Compare `backend/src/types.ts` with `frontend/src/types.ts` — fields must match exactly
- API response shapes match what frontend expects

### 4.2 Dead Code
- No unused imports, variables, or functions in any file
- No commented-out code blocks left in

### 4.3 Naming Conventions
- Variables/functions: camelCase
- Components/Types/Interfaces: PascalCase
- CSS classes: kebab-case or camelCase (consistent)
- File names: match export name

### 4.4 Dependency Health
- Check `package.json` in both projects for:
  - Unused dependencies (installed but not imported)
  - Missing `@types/*` packages
  - Version conflicts between backend and frontend

## Output Format

Structure the review as:

```
=============================================
  Code Review — Game Analytics Dashboard
=============================================

PHASE 1: Automated Checks
  Backend tsc:  PASS / FAIL (X errors)
  Frontend tsc: PASS / FAIL (X errors)

PHASE 2: Backend
  [PASS] 2.1 Architecture & Structure
  [WARN] 2.2 Type Safety — found `any` in routes.ts:42
  [PASS] 2.3 API Correctness
  ...

PHASE 3: Frontend
  [PASS] 3.1 Import Style (verbatimModuleSyntax)
  [FAIL] 3.2 Component Quality — missing key prop in Table.tsx:28
  ...

PHASE 4: Cross-Cutting
  [PASS] 4.1 Type Consistency
  [WARN] 4.2 Dead Code — unused import in App.tsx:3
  ...

---------------------------------------------
Summary: XX checks passed | XX warnings | XX failures
---------------------------------------------

TOP PRIORITY FIXES:
1. [File:Line] Description of issue
2. ...

SUGGESTIONS (non-blocking):
1. ...
```

Be specific — always reference file paths and line numbers. Don't report vague issues.
