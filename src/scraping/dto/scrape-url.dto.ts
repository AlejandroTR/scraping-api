import { IsNotEmpty, IsUrl } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class ScrapeUrlDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsUrl()
  url: string;
}
