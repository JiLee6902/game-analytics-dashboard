// @ts-nocheck
// Template: NestJS Controller + Service + DTO
// Usage: Copy patterns into backend/src/<module>/

// === DTO (dto/create-<entity>.dto.ts) ===
import { IsString, IsNotEmpty, IsEnum, IsNumber, Min, IsOptional, Matches } from 'class-validator';

export class CreateEntityDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsEnum(['PC', 'Mobile', 'Console'], {
    message: 'platform must be one of: PC, Mobile, Console',
  })
  platform!: 'PC' | 'Mobile' | 'Console';

  @IsNumber()
  @Min(0)
  value!: number;

  @IsString()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'date must be in YYYY-MM-DD format',
  })
  date!: string;
}

// === Filter DTO (dto/filter-<entity>.dto.ts) ===
export class FilterEntityDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  platform?: string;
}

// === Service (<entity>.service.ts) ===
import { Injectable } from '@nestjs/common';

@Injectable()
export class EntityService {
  private nextId = 1;
  private readonly store: Entity[] = [];

  findAll(filters: FilterEntityDto): Entity[] {
    let data = [...this.store];
    if (filters.name) {
      data = data.filter(d => d.name.toLowerCase().includes(filters.name!.toLowerCase()));
    }
    return data;
  }

  create(dto: CreateEntityDto): Entity {
    const entry = { id: String(this.nextId++), ...dto, createdAt: Date.now() };
    this.store.push(entry);
    return entry;
  }
}

// === Controller (<entity>.controller.ts) ===
import { Controller, Get, Post, Query, Body, HttpCode } from '@nestjs/common';

@Controller('entities')
export class EntityController {
  constructor(private readonly entityService: EntityService) {}

  @Get()
  findAll(@Query() filters: FilterEntityDto) {
    return this.entityService.findAll(filters);
  }

  @Post()
  @HttpCode(201)
  create(@Body() dto: CreateEntityDto) {
    return this.entityService.create(dto);
  }
}

// === Module (<entity>.module.ts) ===
import { Module } from '@nestjs/common';

@Module({
  controllers: [EntityController],
  providers: [EntityService],
  exports: [EntityService],
})
export class EntityModule {}
