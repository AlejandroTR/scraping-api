import { ValidateNested } from 'class-validator';

import { ScrapeDto } from './scrape.dto';
import { ApiProperty } from "@nestjs/swagger";

export class ListScrapeDto {
  @ValidateNested()
  @ApiProperty()
  urls: ScrapeDto[];
  @ApiProperty()
  count: number;
}
