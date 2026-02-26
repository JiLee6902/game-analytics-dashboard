# ClaudeKit — Game Analytics Dashboard

Configuration system for Claude Code to work effectively with this project.

## Directory Structure

```
.claude/
├── agents/              # Expert agents for domain-specific tasks
├── checklists/          # Step-by-step checklists for common workflows
├── commands/            # Custom slash commands
│   ├── dev/             # Development environment commands
│   ├── api/             # API testing commands
│   └── git/             # Git workflow commands
├── hooks/               # Automation scripts (pre/post tool hooks)
├── plans/               # Implementation plans for features
├── specs/               # Feature specifications
├── templates/           # Code templates for quick scaffolding
├── settings.json        # Hook configuration
└── settings.local.json  # Local overrides (gitignored)
```

## Quick Start

```bash
# Start development
/dev:start

# Test all API endpoints
/api:test

# Review code quality
/review

# Add a new feature
/add-feature pagination for the analytics table

# Commit and push
/git:commit
/git:push
```

## Components

### Commands (`commands/`)
Custom slash commands organized by domain. Subfolder commands are invoked as `/folder:command`.

| Command | Description |
|---------|-------------|
| `/dev:start` | Pre-flight checks → start backend + frontend → health verification |
| `/dev:build` | Type-check and build both projects |
| `/dev:cleanup` | Remove debug artifacts and temp files |
| `/api:test` | 20+ test cases across filtering, validation, aggregation, edge cases |
| `/api:test-validation` | Deep validation testing with edge cases |
| `/git:commit` | Quality gate → smart staging → conventional commit |
| `/git:push` | Pre-push checks → push to remote |
| `/git:status` | Enhanced git status with change analysis |
| `/review` | Full 4-phase code review with file:line references |
| `/add-feature` | Guided feature addition following project conventions |
| `/analyze` | Codebase analysis and architecture overview |
| `/validate-and-fix` | Run type-checks, find issues, auto-fix |

### Agents (`agents/`)
Domain-specific expert agents with bundled knowledge.

| Agent | Expertise |
|-------|-----------|
| `typescript-expert` | Strict mode, `verbatimModuleSyntax`, decorators, type patterns |
| `react-recharts-expert` | React components, hooks, Recharts integration |
| `nestjs-api-expert` | NestJS controllers, services, DTOs, class-validator, dependency injection |

### Checklists (`checklists/`)
Step-by-step guides for common tasks.

| Checklist | When to use |
|-----------|-------------|
| `new-feature` | Adding any new feature end-to-end |
| `new-api-endpoint` | Adding a new NestJS endpoint (controller + service + DTO) |
| `new-component` | Creating a new React component |

### Hooks (`hooks/`)
Automation scripts that run on tool events.

| Hook | Trigger | What it does |
|------|---------|--------------|
| `typescript-check.sh` | PostToolUse (Write/Edit) | Type-check modified project |
| `build-check.sh` | Stop | Verify both projects build |

### Templates (`templates/`)
Scaffolding templates that follow project conventions.

| Template | Creates |
|----------|---------|
| `component.template.tsx` | React function component with proper imports |
| `hook.template.ts` | Custom hook with loading/error states |
| `route.template.ts` | NestJS controller + service + DTO patterns |

## Project Conventions

- **TypeScript strict mode** in both projects
- **`emitDecoratorMetadata`** + **`experimentalDecorators`** in backend tsconfig
- **`import type { X }`** for type-only imports (frontend `verbatimModuleSyntax`)
- **Platforms:** `"PC" | "Mobile" | "Console"` (strict enum via `@IsEnum()`)
- **Validation:** class-validator DTOs with `ValidationPipe` (whitelist, transform, forbidNonWhitelisted)
- **Error format:** NestJS returns `{ message: string[] }` for validation errors
- **Components:** function components only, no classes
- **Hooks:** all API logic in custom hooks (`hooks/` folder)
- **CSS:** variables with `[data-theme]` for dark/light mode, no framework
