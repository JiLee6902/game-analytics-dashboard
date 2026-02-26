---
description: Run comprehensive API test suite against all endpoints
category: api
allowed-tools: Bash
---

Run a comprehensive API test suite against the NestJS backend at http://localhost:3001.

## Pre-check

First verify the backend is running:
```
curl -sf http://localhost:3001/health
```
If it fails, tell the user to start the backend first (`/dev:start` or `cd backend && npm run dev`). Do NOT proceed without a running backend.

## Test Suite

Run all tests sequentially using `curl`. For each request, capture **HTTP status code** and **response body**. Use `-w "\n%{http_code}"` to extract status codes.

---

### Phase 1: GET /analytics — List & Filtering

| # | Test Case | Request | Expected |
|---|-----------|---------|----------|
| 1.1 | Fetch all entries | `GET /analytics` | 200, array with 10+ entries |
| 1.2 | Filter by platform (PC) | `GET /analytics?platform=PC` | 200, all entries have `platform: "PC"` |
| 1.3 | Filter by platform (Mobile) | `GET /analytics?platform=Mobile` | 200, all entries have `platform: "Mobile"` |
| 1.4 | Filter by platform (Console) | `GET /analytics?platform=Console` | 200, all entries have `platform: "Console"` |
| 1.5 | Filter by genre | `GET /analytics?genre=RPG` | 200, all entries have matching genre |
| 1.6 | Filter by gameName | `GET /analytics?gameName=<pick a seed game name>` | 200, matching entries only |
| 1.7 | Filter by date range | `GET /analytics?startDate=2024-01-01&endDate=2024-06-30` | 200, all dates within range |
| 1.8 | Combined filters | `GET /analytics?platform=PC&genre=RPG` | 200, entries match both |
| 1.9 | No matches | `GET /analytics?platform=PC&gameName=NonExistentGame12345` | 200, empty array `[]` |

---

### Phase 2: POST /analytics — Create & Validation

| # | Test Case | Payload | Expected |
|---|-----------|---------|----------|
| 2.1 | Valid entry | `{"gameName":"Test Game","platform":"PC","genre":"Action","dailyActivePlayers":5000,"revenue":25000,"date":"2024-06-15"}` | 201, returns entry with `id` field |
| 2.2 | Verify entry persisted | `GET /analytics?gameName=Test Game` | 200, contains the entry from 2.1 |
| 2.3 | Empty body | `{}` | 400, `message` array with multiple validation errors |
| 2.4 | Empty gameName | `{"gameName":"","platform":"PC","genre":"Action","dailyActivePlayers":100,"revenue":500,"date":"2024-01-01"}` | 400, error about gameName |
| 2.5 | Invalid platform | `{"gameName":"Test","platform":"Switch","genre":"Action","dailyActivePlayers":100,"revenue":500,"date":"2024-01-01"}` | 400, error about platform (must be PC/Mobile/Console) |
| 2.6 | Missing required fields | `{"gameName":"Test"}` | 400, errors for each missing field |
| 2.7 | Negative numbers | `{"gameName":"Test","platform":"PC","genre":"Action","dailyActivePlayers":-1,"revenue":-100,"date":"2024-01-01"}` | 400, validation errors for negative numbers |
| 2.8 | Invalid date format | `{"gameName":"Test","platform":"PC","genre":"Action","dailyActivePlayers":100,"revenue":500,"date":"not-a-date"}` | 400, error about date |
| 2.9 | Extra fields stripped | `{"gameName":"Test","platform":"PC","genre":"Action","dailyActivePlayers":100,"revenue":500,"date":"2024-01-01","extra":"field"}` | 400, forbidNonWhitelisted rejects extra fields |

---

### Phase 3: GET /analytics/summary — Aggregation

| # | Test Case | Request | Expected |
|---|-----------|---------|----------|
| 3.1 | Fetch summary | `GET /analytics/summary` | 200, returns object with aggregated fields |
| 3.2 | Summary reflects new data | Compare with Phase 2 entry | totalEntries should include the entry we added |

---

### Phase 4: Polling & Export

| # | Test Case | Request | Expected |
|---|-----------|---------|----------|
| 4.1 | Poll with since=0 | `GET /analytics/poll?since=0` | 200, all entries + timestamp |
| 4.2 | Poll with future timestamp | `GET /analytics/poll?since=9999999999999` | 200, empty entries array |
| 4.3 | Export CSV | `GET /analytics/export?format=csv` | 200, text/csv content type, CSV data |
| 4.4 | Export JSON | `GET /analytics/export?format=json` | 200, application/json, array of entries |
| 4.5 | Export invalid format | `GET /analytics/export?format=xml` | 400, validation error |

---

### Phase 5: Edge Cases

| # | Test Case | Request | Expected |
|---|-----------|---------|----------|
| 5.1 | Health check | `GET /health` | 200, `{ status: 'ok' }` |
| 5.2 | Invalid endpoint | `GET /nonexistent` | 404 |
| 5.3 | Wrong HTTP method | `DELETE /analytics` | 404 or 405 |
| 5.4 | Malformed JSON body | `POST /analytics` with body `{invalid json` | 400 |
| 5.5 | CORS headers present | Check `Access-Control-Allow-Origin` header on any response | Header exists |

---

## Report

After all tests complete, output a formatted report:

```
============================================
  API Test Report — Game Analytics Dashboard
============================================

Phase 1: GET /analytics (Filtering)
  [PASS] 1.1 Fetch all entries (200, 10 entries)
  [PASS] 1.2 Filter by platform PC (200, 3 entries)
  [FAIL] 1.3 ...
  ...

Phase 2: POST /analytics (Validation)
  ...

Phase 3: GET /analytics/summary
  ...

Phase 4: Polling & Export
  ...

Phase 5: Edge Cases
  ...

--------------------------------------------
Results: XX/XX passed | XX failed
--------------------------------------------
```

For any FAIL, include the expected vs actual status code and a snippet of the response body.
