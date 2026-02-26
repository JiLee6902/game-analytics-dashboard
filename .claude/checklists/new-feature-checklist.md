# New Feature Checklist

Use this checklist when adding any new feature to the project.

## Pre-work

- [ ] Read existing code in the area you'll modify
- [ ] Check CLAUDE.md for relevant conventions
- [ ] Identify all files that need changes (backend + frontend)
- [ ] Confirm the feature doesn't duplicate existing functionality

## Backend Changes

- [ ] Add/update entity in `backend/src/analytics/entities/analytics.entity.ts`
- [ ] Add/update DTOs in `backend/src/analytics/dto/` (use `class-validator` decorators)
- [ ] Add/update service methods in `backend/src/analytics/service/analytics.service.ts`
- [ ] Add/update controller methods in `backend/src/analytics/controller/analytics.controller.ts`
- [ ] Use NestJS decorators: `@Controller`, `@Get`, `@Post`, `@Query`, `@Body`
- [ ] Validation handled via DTOs + `ValidationPipe` (returns error array automatically)
- [ ] Platform enum enforced: `"PC" | "Mobile" | "Console"`
- [ ] Proper HTTP status codes (200, 201, 400, 404)

## Frontend Changes

- [ ] Add/update types in `frontend/src/types.ts` (must match backend)
- [ ] Use `import type { X }` for all type-only imports
- [ ] Add API logic in hook (`hooks/useAnalytics.ts` or new hook)
- [ ] Hook has loading + error states
- [ ] Component is a function component (no classes)
- [ ] Props are properly typed
- [ ] `.map()` calls have unique `key` props
- [ ] CSS uses variables from `:root` (no hardcoded colors)

## Verification

- [ ] `cd backend && npx tsc --noEmit` passes
- [ ] `cd frontend && npx tsc --noEmit` passes
- [ ] Test the feature manually (API + UI)
- [ ] Existing features still work (no regressions)
- [ ] No `any` types introduced
- [ ] No `console.log` left in production code
