import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ScrapingService } from "./scraping.service";
import { ScrapeUrlDto } from "./dto/scrape-url.dto";

@Controller('scraping')
export class ScrapingController {
  constructor(private readonly scrapingService: ScrapingService) {}

  @Post()
  async scrapeUrl(@Body() scrapeUrlDto: ScrapeUrlDto) {
    return this.scrapingService.scrapeUrl(scrapeUrlDto.url)
  }

  @Get()
  async getUrls() {
    return this.scrapingService.getUrls()
  }

  @Get(':id')
  async getUrl(@Param('id') id: string) {
    return this.scrapingService.getUrl(id)
  }
}
