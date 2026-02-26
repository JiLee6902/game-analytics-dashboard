# Game Analytics Dashboard

## Project Overview

Fullstack game analytics dashboard: NestJS+TypeScript backend with in-memory storage, React+Vite+TypeScript frontend with Recharts charts. Includes bonus features: dark mode toggle, real-time polling, CSV/JSON export.

## Commands

```bash
# Backend
cd backend && npm install && npm run dev    # Runs on :3001

# Frontend
cd frontend && npm install && npm run dev   # Runs on :5173

# Type-check
cd frontend && npx tsc --noEmit
cd backend && npx tsc --noEmit
```

## Architecture

- `backend/` — NestJS API with modules/controllers/services, in-memory data store, no database
- `frontend/` — React SPA, calls backend REST API at localhost:3001
- No authentication, no real database — by design (case study requirement)

### Backend Structure (NestJS)

```
backend/src/
├── main.ts                           # NestFactory bootstrap, CORS, ValidationPipe
├── app.module.ts                     # Root module
├── health/
│   └── health.controller.ts          # GET /health
└── analytics/
    ├── analytics.module.ts
    ├── controller/
    │   └── analytics.controller.ts   # Route handlers (async, HttpStatus enum)
    ├── service/
    │   └── analytics.service.ts      # Business logic + in-memory store
    ├── dto/
    │   ├── index.ts                  # Barrel re-exports
    │   ├── create-analytics.dto.ts   # class-validator decorators
    │   ├── filter-analytics.dto.ts
    │   ├── poll-analytics.dto.ts
    │   └── export-analytics.dto.ts
    └── entities/
        └── analytics.entity.ts       # Platform type, interfaces
```

## Code Style

- IMPORTANT: TypeScript strict mode is ON in both projects
- IMPORTANT: Backend uses `emitDecoratorMetadata` + `experimentalDecorators` for NestJS
- IMPORTANT: Frontend uses `verbatimModuleSyntax` — always use `import type { X }` for type-only imports
- NestJS uses class-validator decorators for DTO validation
- NestJS controllers use `@Controller`, `@Get`, `@Post`, `@Query`, `@Body` decorators
- React components are function components (no classes)
- Custom hooks in `frontend/src/hooks/` for API logic
- CSS uses CSS variables with `[data-theme]` for dark/light mode (no CSS framework)

## API

- `GET /analytics` — supports query params: gameName, platform, genre, startDate, endDate
- `POST /analytics` — creates entry, class-validator validates all fields, returns 400 with `{ message: string[] }`
- `GET /analytics/summary` — aggregated stats (no params)
- `GET /analytics/poll?since=<timestamp>` — returns entries created after timestamp + current timestamp
- `GET /analytics/export?format=csv|json` — downloads analytics data as file
- `GET /health` — health check
- Platforms: "PC" | "Mobile" | "Console" (strict enum)

## Data

- In-memory array in `AnalyticsService` — resets on restart
- 10 seed entries with realistic game analytics data
- IDs are auto-incrementing strings
- `createdAt` (Unix ms) tracked for polling

## Key Gotchas

- Backend CORS is enabled for all origins (dev mode)
- Frontend fetches summary independently from filtered entries (summary is always global)
- Recharts Tooltip formatter must handle `value: number | undefined` — use `Number(value)`
- NestJS validation returns `{ message: string[] }` not `{ errors: string[] }` — frontend handles both
- Frontend polls every 5s via `/analytics/poll?since=` — errors silently ignored
- Export uses `@Res()` decorator to set Content-Disposition headers

## ClaudeKit (`.claude/`)

Full configuration system for Claude Code — see `.claude/README.md` for details.

### Custom Commands

| Command | Category | Description |
|---------|----------|-------------|
| `/dev:start` | dev | Pre-flight checks → start servers → health verification |
| `/dev:build` | dev | Type-check and build both projects |
| `/dev:cleanup` | dev | Remove debug artifacts and temp files |
| `/api:test` | api | 20+ test cases: filtering, validation, aggregation, edge cases |
| `/api:test-validation` | api | Deep validation edge case testing (27 cases) |
| `/git:commit` | git | Quality gate (tsc) → smart staging → conventional commit |
| `/git:push` | git | Pre-push checks → push to remote |
| `/git:status` | git | Enhanced git status with change analysis |
| `/review` | workflow | Full 4-phase code review with file:line references |
| `/add-feature <desc>` | workflow | Guided feature addition following project conventions |
| `/analyze` | workflow | Codebase architecture analysis |
| `/validate-and-fix` | workflow | Type-check, find issues, auto-fix |

### Agents

| Agent | Expertise |
|-------|-----------|
| `typescript-expert` | Strict mode, `verbatimModuleSyntax`, decorators, type patterns |
| `react-recharts-expert` | React components, hooks, Recharts integration |
| `nestjs-api-expert` | NestJS modules, controllers, services, DTOs, class-validator |

### Other Resources

- **Checklists:** `new-feature`, `new-api-endpoint`, `new-component`
- **Templates:** `component.template.tsx`, `hook.template.ts`, `route.template.ts`
- **Hooks:** `typescript-check.sh` (post-edit), `build-check.sh` (session end)
