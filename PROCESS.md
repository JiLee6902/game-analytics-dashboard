# Process Documentation

## Tech Stack Choice

### Selected Stack
- **Backend:** NestJS + TypeScript (migrated from Express)
- **Frontend:** React + Vite + TypeScript
- **Charts:** Recharts (bonus feature)
- **Storage:** In-memory array with seed data
- **Validation:** class-validator + class-transformer (DTO-based)

### Why These Choices?
- **NestJS over Express:** Demonstrates fullstack proficiency with a structured, enterprise-grade framework. Module/controller/service pattern provides clear separation of concerns. class-validator DTOs replace manual validation with declarative decorators. Better demonstrates architectural thinking for the case study.
- **Vite over CRA:** Faster dev server, better TypeScript support out of the box, modern defaults.
- **Recharts:** Lightweight, React-native charting library. Easy to integrate, good defaults, no DOM manipulation needed.
- **class-validator:** Declarative DTO validation with decorators — cleaner than manual if-statements, integrates natively with NestJS's ValidationPipe.

### Alternatives Considered
- Express — simpler but doesn't showcase architectural patterns; original choice, migrated to NestJS
- Next.js — full-stack option, but the case study explicitly asks for separate backend/frontend
- Tailwind CSS — would need extra setup; plain CSS is faster for a small dashboard
- Redux/Zustand — overkill; a single custom hook handles all state

---

## AI Tool Usage

### Tool Used
**Claude Code** (Anthropic's CLI tool) — used for the entire development process.

### Prompt Examples

**1. Project scaffolding**
> "Build a Mini Dashboard for Game Analytics. Backend: Express + TypeScript with 3 endpoints (GET /analytics with filtering, POST /analytics, GET /analytics/summary). Frontend: React + Vite + TypeScript with table view, summary cards, filter bar, add entry form, and Recharts chart. In-memory storage, clean code, no over-engineering."

*Result:* Claude Code generated the full project structure, all backend routes, and all frontend components in a single session.

**2. NestJS migration**
> Planned and executed migration from Express to NestJS: new module/controller/service structure, class-validator DTOs, ValidationPipe, plus bonus features (polling, export, dark mode toggle) — all in one session.

*Result:* Complete migration with 4 bonus features added simultaneously. Backend structure went from 4 files to a proper NestJS module architecture.

**3. Data model design**
> The AI was given the context of "game analytics" and generated a practical data model with fields: gameName, platform (PC/Mobile/Console), genre, dailyActivePlayers, revenue, date — along with 10 realistic seed data entries.

*Result:* Good realistic data that makes the dashboard look meaningful.

**4. TypeScript type fixes**
> After the initial build, TypeScript reported `verbatimModuleSyntax` errors requiring `import type` syntax. Claude Code identified all affected files and fixed them systematically.

*Result:* All import statements were updated from `import { Type }` to `import type { Type }`. Build succeeded.

**5. API validation**
> NestJS class-validator decorators replaced manual if-statement validation. DTOs with `@IsString`, `@IsEnum`, `@IsNumber`, `@Min`, `@Matches` provide declarative validation with automatic error messages.

*Result:* Cleaner validation that returns all errors at once via NestJS's built-in ValidationPipe.

**6. Recharts tooltip type issue**
> The Recharts `Tooltip` formatter had a type mismatch (`number` vs `number | undefined`). Claude Code fixed it by changing the formatter to accept the generic type and cast with `Number(value)`.

*Result:* Type-safe formatter that works correctly.

**7. Frontend hook design**
> "Custom hook for API calls with loading/error states" — generated `useAnalytics` hook that handles data fetching, filtering, entry creation, and real-time polling with proper state management.

*Result:* Single hook that encapsulates all API logic including 5-second polling interval, keeping components clean.

**8. CSS styling with dark/light mode**
> "Clean, functional, responsive dashboard with dark/light theme toggle" — generated CSS with CSS variables and `[data-theme]` attribute switching, plus a useTheme hook with localStorage persistence.

*Result:* Professional-looking dashboard with seamless dark/light mode toggle that persists across page refreshes.

### What Worked Well
- **Full project generation:** Claude Code generated a working fullstack app in one session
- **NestJS migration:** Smooth migration from Express with all logic preserved
- **Type safety:** Caught and fixed TypeScript issues immediately
- **Clean architecture:** Generated code that follows separation of concerns without over-engineering
- **Realistic seed data:** Game analytics data that makes sense contextually
- **Bonus features:** All 4 bonus features implemented cleanly (Chart, Polling, Export, Dark Mode)

### What Didn't Work / Required Fixes
- **`import type` syntax:** Initial code used regular imports, but Vite's `verbatimModuleSyntax` required type-only imports. Fixed by Claude Code after the first build attempt.
- **Recharts type mismatch:** The Tooltip formatter type needed adjustment for strict TypeScript mode.
- **NestJS error format:** NestJS returns `{ message: string[] }` instead of Express's `{ errors: string[] }` — frontend error handling updated to handle both formats.

### ClaudeKit Configuration System (`.claude/`)

Built a comprehensive **ClaudeKit configuration system** with 7 directories, modeled after enterprise-level Claude Code setups:

```
.claude/
├── agents/        3 expert agents (TypeScript, React/Recharts, NestJS API)
├── checklists/    3 step-by-step checklists (feature, endpoint, component)
├── commands/      12 commands organized in 3 subdirectories + standalone
│   ├── dev/       start, build, cleanup
│   ├── api/       test, test-validation
│   └── git/       commit, push, status
├── hooks/         2 automation scripts (typescript-check, build-check)
├── plans/         (for implementation plans)
├── specs/         (for feature specifications)
├── templates/     3 code templates (component, hook, route)
└── README.md      Full documentation and quick start guide
```

**Key highlights:**
- **12 custom commands** organized by domain (`dev:`, `api:`, `git:`, standalone)
- **3 expert agents** with YAML frontmatter, domain knowledge, and problem playbooks
- **3 checklists** with checkbox items covering pre-work → implementation → verification
- **3 code templates** with `@ts-nocheck` pragma and placeholder patterns
- **2 automation hooks** for post-edit type-checking and session-end build verification
- All commands use **YAML frontmatter** (description, category, allowed-tools)

**Why this matters for the case study:**
- Demonstrates **AI tool proficiency** at enterprise level — not just prompting, but building a reusable knowledge system
- Each component encodes project-specific knowledge (TypeScript strict mode, `verbatimModuleSyntax`, platform enum, file structure)
- Commands follow **phased workflows** with pre-checks, execution, and verification — mimicking CI/CD pipelines
- Agents serve as **domain experts** that can be consulted for specific patterns
- Templates ensure **consistency** across new code additions
- The structure mirrors real-world professional setups (CATTR-HITEK pattern)

### Time Saved Estimate
AI assistance reduced development time by approximately **60-70%**. Without AI, setting up TypeScript configs, writing CSS from scratch, creating seed data, and debugging type issues would have taken significantly longer.

---

## Development Workflow

### Step-by-step Process
1. **Planning** — Read requirements, decided on tech stack
2. **Backend setup** — Created Express server, types, in-memory store, route handlers
3. **Frontend setup** — Scaffolded with Vite, created components, hook, CSS
4. **Integration** — Connected frontend to backend API, tested all flows
5. **Fix & Polish** — Fixed TypeScript build errors, tested validation
6. **NestJS Migration** — Migrated from Express to NestJS with module architecture
7. **Bonus Features** — Added polling, export, dark mode toggle

### Time Breakdown
| Phase | Time |
|-------|------|
| Planning & Setup | ~10 min |
| Backend (API + validation) | ~15 min |
| Frontend (components + CSS) | ~25 min |
| Integration & Testing | ~10 min |
| NestJS Migration + Bonus Features | ~30 min |
| Documentation | ~15 min |
| **Total** | **~105 min** |

---

## Technical Decisions

### Key Decisions
1. **NestJS module architecture:** Analytics module encapsulates controller, service, DTOs, and entity. Clean separation with dependency injection.
2. **class-validator DTOs:** Declarative validation with decorators. `ValidationPipe` with `whitelist: true` and `forbidNonWhitelisted: true` strips unknown fields and rejects extras.
3. **Single custom hook (`useAnalytics`):** All API communication lives in one hook including polling. Components stay pure and focused on rendering.
4. **Filter on backend:** Filters are query parameters sent to the API, not client-side filtering. This is more realistic and scalable.
5. **CSS variables with `[data-theme]`:** Makes dark/light theme switching clean — just swap CSS variable values via a data attribute.
6. **Polling over WebSocket:** Simple 5-second polling via `/analytics/poll?since=` is sufficient for this scope and avoids WebSocket complexity.

### Trade-offs
- **No testing:** Skipped unit/integration tests to focus on working features within time limit
- **No database:** In-memory storage means data resets on server restart (as specified)
- **No authentication:** Not required per the case study
- **Simple CSS over Tailwind:** Faster initial setup, fewer dependencies, sufficient for this scope
- **Polling over WebSocket:** Less real-time but simpler; 5s interval is acceptable for a dashboard

### What I'd Improve With More Time
- Add unit tests for NestJS service and controller
- Add E2E tests with Playwright
- Implement WebSocket for true real-time updates
- Implement pagination for the table
- Add error boundary in React
- Deploy to Vercel (frontend) + Railway (backend)

---

## Results & Limitations

### What Works Well
- All API endpoints function correctly with DTO validation
- Dashboard displays data, summary stats, and chart
- Filtering works across game name, platform, and genre
- Add entry form with validation and error feedback
- Responsive layout works on mobile and desktop
- Chart shows revenue comparison across games
- **Bonus:** Dark/light mode toggle with localStorage persistence
- **Bonus:** Real-time polling auto-refreshes when new entries are added
- **Bonus:** CSV and JSON export via download buttons

### Known Limitations
- Data resets when backend restarts (in-memory storage, as designed)
- No pagination — all entries load at once
- Summary endpoint always returns stats for all data (doesn't respect current filters)
- No automated tests

### Known Bugs
- None identified during manual testing
