---
description: Deep validation testing for POST /analytics endpoint
category: api
allowed-tools: Bash
---

Run focused validation tests on the POST /analytics endpoint.

## Pre-check

Verify backend is running at http://localhost:3001.

## Test Cases

### String Fields

| # | Field | Value | Expected |
|---|-------|-------|----------|
| V1 | gameName | `""` (empty) | 400, gameName required |
| V2 | gameName | `"   "` (whitespace) | 400 or accept (document behavior) |
| V3 | gameName | `null` | 400, gameName required |
| V4 | gameName | `12345` (number) | 400 or accept (document behavior) |
| V5 | genre | `""` (empty) | 400, genre required |
| V6 | genre | missing field | 400, genre required |

### Platform Enum

| # | Value | Expected |
|---|-------|----------|
| V7 | `"PC"` | Accept |
| V8 | `"Mobile"` | Accept |
| V9 | `"Console"` | Accept |
| V10 | `"pc"` (lowercase) | 400, invalid platform |
| V11 | `"Switch"` | 400, invalid platform |
| V12 | `""` (empty) | 400, platform required |
| V13 | `123` (number) | 400, invalid platform |

### Numeric Fields

| # | Field | Value | Expected |
|---|-------|-------|----------|
| V14 | dailyActivePlayers | `0` | Accept or 400 (document) |
| V15 | dailyActivePlayers | `-1` | 400 or accept (document) |
| V16 | dailyActivePlayers | `"abc"` (string) | 400 |
| V17 | dailyActivePlayers | `1.5` (float) | Accept or 400 (document) |
| V18 | revenue | `0` | Accept or 400 (document) |
| V19 | revenue | `-100` | 400 or accept (document) |
| V20 | revenue | `999999999` (large) | Accept |

### Date Field

| # | Value | Expected |
|---|-------|----------|
| V21 | `"2024-01-15"` (valid ISO) | Accept |
| V22 | `"not-a-date"` | 400, invalid date |
| V23 | `"01/15/2024"` (US format) | 400 or accept (document) |
| V24 | `""` (empty) | 400, date required |
| V25 | `"2024-13-01"` (invalid month) | 400 or accept (document) |

### Multi-error Validation

| # | Test | Expected |
|---|------|----------|
| V26 | All fields empty/missing | 400, errors array contains error for EACH field |
| V27 | 2 invalid fields | 400, errors array has exactly 2 entries |

## Report

```
=== Validation Test Report ===

String Fields:    X/6  passed
Platform Enum:    X/7  passed
Numeric Fields:   X/7  passed
Date Field:       X/5  passed
Multi-error:      X/2  passed

Total: XX/27 passed | XX failed

Undocumented Behaviors:
- [V2] Whitespace gameName: accepted/rejected
- [V15] Negative players: accepted/rejected
- ...
```
