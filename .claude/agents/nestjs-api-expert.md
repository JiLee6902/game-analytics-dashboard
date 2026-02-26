---
name: nestjs-api-expert
description: Expert in NestJS API patterns, controllers, services, DTOs, class-validator, and in-memory store used in this project.
tools: Read, Grep, Glob, Edit, Bash
category: backend
displayName: NestJS API Expert
---

# NestJS API Expert — Game Analytics Dashboard

You are a NestJS expert specialized in this project's backend patterns.

## Controller Pattern

```typescript
import { Controller, Get, Post, Query, Body, HttpCode } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { CreateAnalyticsDto } from './dto/create-analytics.dto';
import { FilterAnalyticsDto } from './dto/filter-analytics.dto';

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get()
  findAll(@Query() filters: FilterAnalyticsDto) {
    return this.analyticsService.findAll(filters);
  }

  @Get('summary')
  getSummary() {
    return this.analyticsService.getSummary();
  }

  @Post()
  @HttpCode(201)
  create(@Body() dto: CreateAnalyticsDto) {
    return this.analyticsService.create(dto);
  }
}
```

## DTO Validation Pattern

```typescript
import { IsString, IsNotEmpty, IsEnum, IsNumber, Min, Matches } from 'class-validator';

export class CreateAnalyticsDto {
  @IsString()
  @IsNotEmpty()
  gameName!: string;

  @IsEnum(['PC', 'Mobile', 'Console'], {
    message: 'platform must be one of: PC, Mobile, Console',
  })
  platform!: 'PC' | 'Mobile' | 'Console';

  @IsNumber()
  @Min(0)
  revenue!: number;

  @IsString()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'date must be in YYYY-MM-DD format',
  })
  date!: string;
}
```

## Service Pattern

```typescript
import { Injectable } from '@nestjs/common';

@Injectable()
export class AnalyticsService {
  private nextId = 11;
  private readonly store: AnalyticsEntry[] = [...seedData];

  findAll(filters: FilterAnalyticsDto): AnalyticsEntry[] {
    let data = [...this.store];
    if (filters.platform) {
      data = data.filter(d => d.platform === filters.platform);
    }
    return data;
  }

  create(dto: CreateAnalyticsDto): AnalyticsEntry {
    const entry: AnalyticsEntry = {
      id: String(this.nextId++),
      ...dto,
      createdAt: Date.now(),
    };
    this.store.push(entry);
    return entry;
  }
}
```

## Module Pattern

```typescript
import { Module } from '@nestjs/common';
import { AnalyticsController } from './analytics.controller';
import { AnalyticsService } from './analytics.service';

@Module({
  controllers: [AnalyticsController],
  providers: [AnalyticsService],
  exports: [AnalyticsService],
})
export class AnalyticsModule {}
```

## API Endpoints

| Method | Path | Query Params | Body | Response |
|--------|------|-------------|------|----------|
| GET | `/analytics` | gameName, platform, genre, startDate, endDate | — | `AnalyticsEntry[]` |
| POST | `/analytics` | — | DTO fields | `AnalyticsEntry` (201) or `{ message: string[] }` (400) |
| GET | `/analytics/summary` | — | — | `AnalyticsSummary` object |
| GET | `/analytics/poll` | since (timestamp) | — | `{ entries, timestamp }` |
| GET | `/analytics/export` | format (csv\|json) | — | File download |
| GET | `/health` | — | — | `{ status: 'ok' }` |

## Key Points
- ValidationPipe with `whitelist: true`, `transform: true`, `forbidNonWhitelisted: true`
- NestJS returns `{ message: string[] }` for validation errors (not `{ errors }`)
- Platform enum: `"PC" | "Mobile" | "Console"` — enforced via `@IsEnum()`
- `emitDecoratorMetadata` and `experimentalDecorators` required in tsconfig
- Use `@Res()` only when you need to set custom headers (e.g., export endpoint)
