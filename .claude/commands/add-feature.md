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
   - `backend/src/analytics/entities/analytics.entity.ts` — data model / entity
   - `backend/src/analytics/controller/analytics.controller.ts` — API controller with decorators
   - `backend/src/analytics/service/analytics.service.ts` — business logic / data access
   - `backend/src/analytics/dto/` — request/response DTOs with class-validator
   - `backend/src/main.ts` — NestJS bootstrap
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
| Entity | `backend/src/analytics/entities/analytics.entity.ts` | Export entity classes, use PascalCase |
| Controller | `backend/src/analytics/controller/analytics.controller.ts` | Use `@Controller`, `@Get`, `@Post` decorators |
| Service | `backend/src/analytics/service/analytics.service.ts` | `@Injectable` service, business logic & data access |
| DTOs | `backend/src/analytics/dto/` | Use `class-validator` decorators for validation |
| Bootstrap | `backend/src/main.ts` | NestJS app bootstrap with `ValidationPipe` |

```typescript
// Controller pattern:
@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get()
  findAll(@Query() filterDto: FilterAnalyticsDto) {
    return this.analyticsService.findAll(filterDto);
  }

  @Post()
  create(@Body() createDto: CreateAnalyticsDto) {
    return this.analyticsService.create(createDto);
  }
}

// DTO validation pattern (class-validator):
export class CreateAnalyticsDto {
  @IsString()
  @IsNotEmpty()
  gameName: string;

  @IsIn(['PC', 'Mobile', 'Console'])
  platform: string;
}
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
