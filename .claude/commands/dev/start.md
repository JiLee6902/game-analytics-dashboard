---
description: Start the full development environment (backend + frontend)
category: dev
allowed-tools: Bash, Read
---

Start the full development environment for game-analytics-dashboard.

## Pre-flight Checks

1. **Check port availability:**
   - Run `lsof -ti:3001` — if a process is using port 3001, ask the user whether to kill it before proceeding
   - Run `lsof -ti:5173` — if a process is using port 5173, ask the user whether to kill it before proceeding

2. **Check dependencies are installed:**
   - If `backend/node_modules` does not exist, run `cd backend && npm install`
   - If `frontend/node_modules` does not exist, run `cd frontend && npm install`

## Start Servers

3. **Start backend** in background:
   ```
   cd backend && npm run dev
   ```

4. **Start frontend** in background:
   ```
   cd frontend && npm run dev
   ```

## Health Verification

5. **Verify backend** — retry up to 5 times with 2s intervals:
   ```
   curl -sf http://localhost:3001/analytics/summary
   ```
   Parse the response to confirm it returns valid JSON with expected fields.

6. **Verify frontend** — retry up to 5 times with 2s intervals:
   ```
   curl -sf http://localhost:5173
   ```
   Confirm it returns HTML.

## Status Report

7. Print a clear summary:

```
=== Dev Environment Status ===
Backend   : http://localhost:3001  [RUNNING / FAILED]
Frontend  : http://localhost:5173  [RUNNING / FAILED]
API Check : GET /analytics/summary [OK / ERROR]
```

If either server failed, show the relevant error output and suggest specific fixes.
