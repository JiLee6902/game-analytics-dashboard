import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Res,
  HttpCode,
  HttpStatus,
} from "@nestjs/common";
import type { Response } from "express";
import { AnalyticsService } from "../service/analytics.service";
import {
  CreateAnalyticsDto,
  FilterAnalyticsDto,
  PollAnalyticsDto,
  ExportAnalyticsDto,
} from "../dto";

@Controller("analytics")
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get()
  async findAll(@Query() filters: FilterAnalyticsDto) {
    return this.analyticsService.findAll(filters);
  }

  @Get("summary")
  async getSummary() {
    return this.analyticsService.getSummary();
  }

  @Get("poll")
  async poll(@Query() query: PollAnalyticsDto) {
    return {
      entries: this.analyticsService.getEntriesSince(query.since),
      timestamp: Date.now(),
    };
  }

  @Get("export")
  async exportData(
    @Query() query: ExportAnalyticsDto,
    @Res() res: Response,
  ) {
    if (query.format === "csv") {
      const csv = this.analyticsService.generateCsv();
      res.setHeader("Content-Type", "text/csv");
      res.setHeader(
        "Content-Disposition",
        'attachment; filename="analytics.csv"',
      );
      res.send(csv);
    } else {
      const data = this.analyticsService.getAll();
      res.setHeader("Content-Type", "application/json");
      res.setHeader(
        "Content-Disposition",
        'attachment; filename="analytics.json"',
      );
      res.send(JSON.stringify(data, null, 2));
    }
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateAnalyticsDto) {
    return this.analyticsService.create(dto);
  }
}
