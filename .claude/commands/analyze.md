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
- Identify entry points (`backend/src/main.ts`, `frontend/src/main.tsx`)

### 2. Dependency Graph
- Read both `package.json` files
- List all production and dev dependencies
- Check for version mismatches in shared deps (e.g., TypeScript version)
- Identify unused dependencies (installed but not imported)

### 3. API Surface
- Read `backend/src/analytics/controller/analytics.controller.ts`
- Document all endpoints: method, path, query params, request body, response shape
- Verify against CLAUDE.md documentation

### 4. Type System
- Read `backend/src/analytics/entities/analytics.entity.ts`, `backend/src/analytics/dto/` and `frontend/src/types.ts`
- Compare: are entities/DTOs and frontend types in sync?
- List all shared types, entities, and DTOs

### 5. Component Map
- List all React components in `frontend/src/components/`
- For each: props interface, hooks used, child components
- Identify the component tree (App → children)

### 6. Data Flow
- Trace data from seed → service → controller → hook → component → render
- Identify any gaps or inconsistencies

## Output

```
=== Codebase Analysis ===

Project: game-analytics-dashboard
Files: XX source files (XX backend, XX frontend)
LOC: ~XXXX total

Backend Architecture:
  Entry: backend/src/main.ts
  Framework: NestJS
  Endpoints: 6 (GET /analytics, POST /analytics, GET /analytics/summary, GET /analytics/poll, GET /analytics/export, GET /health)
  Service: In-memory array, XX seed entries
  Entities/DTOs: X classes

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
