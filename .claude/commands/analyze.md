---
description: Analyze the codebase architecture and structure
category: workflow
allowed-tools: Read, Glob, Grep, Bash
---

Perform a comprehensive codebase analysis of the game-analytics-dashboard project.

## Analysis Sections

### 1. Project Structure
- Map all source files in `backend/src/` and `frontend/src/`
- Count lines of code per file
- Identify entry points (`backend/src/index.ts`, `frontend/src/main.tsx`)

### 2. Dependency Graph
- Read both `package.json` files
- List all production and dev dependencies
- Check for version mismatches in shared deps (e.g., TypeScript version)
- Identify unused dependencies (installed but not imported)

### 3. API Surface
- Read `backend/src/routes.ts`
- Document all endpoints: method, path, query params, request body, response shape
- Verify against CLAUDE.md documentation

### 4. Type System
- Read `backend/src/types.ts` and `frontend/src/types.ts`
- Compare: are they in sync?
- List all shared types and interfaces

### 5. Component Map
- List all React components in `frontend/src/components/`
- For each: props interface, hooks used, child components
- Identify the component tree (App → children)

### 6. Data Flow
- Trace data from seed → store → API → hook → component → render
- Identify any gaps or inconsistencies

## Output

```
=== Codebase Analysis ===

Project: game-analytics-dashboard
Files: XX source files (XX backend, XX frontend)
LOC: ~XXXX total

Backend Architecture:
  Entry: backend/src/index.ts
  Routes: 3 endpoints (GET, POST, GET/summary)
  Store: In-memory array, XX seed entries
  Types: X interfaces

Frontend Architecture:
  Entry: frontend/src/main.tsx
  Components: X components
  Hooks: X custom hooks
  Types: X interfaces (synced with backend: YES/NO)

Dependencies:
  Backend: X prod, X dev
  Frontend: X prod, X dev
  Issues: [any found]

Type Consistency: PASS / FAIL
  [details if FAIL]
```
