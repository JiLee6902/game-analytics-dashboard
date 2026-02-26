# New Feature Checklist

Use this checklist when adding any new feature to the project.

## Pre-work

- [ ] Read existing code in the area you'll modify
- [ ] Check CLAUDE.md for relevant conventions
- [ ] Identify all files that need changes (backend + frontend)
- [ ] Confirm the feature doesn't duplicate existing functionality

## Backend Changes

- [ ] Add/update types in `backend/src/types.ts`
- [ ] Add/update store functions in `backend/src/store.ts` (if data changes needed)
- [ ] Add/update route handlers in `backend/src/routes.ts`
- [ ] Use explicit `Request`/`Response` types on all handlers
- [ ] Validation returns error array (not just first error)
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
