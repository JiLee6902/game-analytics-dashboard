import { IsOptional, IsString } from "class-validator";

export class FilterAnalyticsDto {
  @IsOptional()
  @IsString()
  gameName?: string;

  @IsOptional()
  @IsString()
  platform?: string;

  @IsOptional()
  @IsString()
  genre?: string;

  @IsOptional()
  @IsString()
  startDate?: string;

  @IsOptional()
  @IsString()
  endDate?: string;
}
