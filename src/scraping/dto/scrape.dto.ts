import { ApiProperty } from '@nestjs/swagger';

export class ScrapeDto {
  @ApiProperty()
  url: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  image: string;

  @ApiProperty()
  text: string;
}
