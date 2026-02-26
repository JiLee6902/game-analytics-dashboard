import { IsNumber, Min } from "class-validator";
import { Type } from "class-transformer";

export class PollAnalyticsDto {
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  since!: number;
}
