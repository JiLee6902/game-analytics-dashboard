import { IsString, IsNotEmpty, IsEnum, IsNumber, Min, Matches } from "class-validator";

export class CreateAnalyticsDto {
  @IsString()
  @IsNotEmpty()
  gameName!: string;

  @IsEnum(["PC", "Mobile", "Console"], {
    message: "platform must be one of: PC, Mobile, Console",
  })
  platform!: "PC" | "Mobile" | "Console";

  @IsString()
  @IsNotEmpty()
  genre!: string;

  @IsNumber()
  @Min(0)
  dailyActivePlayers!: number;

  @IsNumber()
  @Min(0)
  revenue!: number;

  @IsString()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: "date must be in YYYY-MM-DD format",
  })
  date!: string;
}
