import { Module } from "@nestjs/common";
import { HealthController } from "./health/health.controller";
import { AnalyticsModule } from "./analytics/analytics.module";

@Module({
  imports: [AnalyticsModule],
  controllers: [HealthController],
})
export class AppModule {}
