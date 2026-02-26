import { IsEnum } from "class-validator";

export class ExportAnalyticsDto {
  @IsEnum(["csv", "json"], {
    message: "format must be csv or json",
  })
  format!: "csv" | "json";
}
