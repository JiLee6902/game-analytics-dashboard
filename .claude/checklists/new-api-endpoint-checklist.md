# New API Endpoint Checklist

Use this when adding a new endpoint to the NestJS backend.

## Design

- [ ] Define the endpoint: `METHOD /path`
- [ ] Define query parameters (if GET) → create Filter DTO
- [ ] Define request body shape (if POST/PUT) → create Create DTO
- [ ] Define response shape and status codes
- [ ] Check for conflicts with existing routes in controller

## Types

- [ ] Add/update interfaces in `backend/src/analytics/entities/analytics.entity.ts`
- [ ] Mirror relevant types in `frontend/src/types.ts`
- [ ] Types match exactly between backend and frontend

## Implementation

- [ ] Create DTO in `backend/src/analytics/dto/` with class-validator decorators
- [ ] Add service method in `backend/src/analytics/analytics.service.ts`
- [ ] Add controller method in `backend/src/analytics/analytics.controller.ts`
- [ ] Use appropriate decorators: `@Get()`, `@Post()`, `@Query()`, `@Body()`
- [ ] Set correct HTTP status code (e.g., `@HttpCode(201)` for POST)
- [ ] Use `@Res()` only if custom headers needed (e.g., file download)
- [ ] DTO validation decorators:
  - [ ] `@IsString()`, `@IsNotEmpty()` for required strings
  - [ ] `@IsEnum()` for platform field
  - [ ] `@IsNumber()`, `@Min(0)` for numeric fields
  - [ ] `@Matches()` for date format
  - [ ] `@IsOptional()` for filter fields
- [ ] Return consistent JSON response shape

## Frontend Integration

- [ ] Add fetch function in hook (`frontend/src/hooks/`)
- [ ] Handle NestJS error format: `{ message: string[] }` and `{ errors: string[] }`
- [ ] Handle loading state
- [ ] Handle error state
- [ ] Parse response correctly

## Verification

- [ ] `cd backend && npx tsc --noEmit` passes
- [ ] Test with curl: happy path
- [ ] Test with curl: validation errors (NestJS returns 400 with `{ message: [...] }`)
- [ ] Test with curl: edge cases (empty body, wrong method)
- [ ] Update CLAUDE.md API section if needed
