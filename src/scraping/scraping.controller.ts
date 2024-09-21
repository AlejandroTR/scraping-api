import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ScrapingService } from "./scraping.service";

@Controller('scraping')
export class ScrapingController {
  constructor(private readonly scrapingService: ScrapingService) {}

  @Post()
  async scrapeUrl(@Body('url') url: string) {
    return this.scrapingService.scrapeUrl(url)
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
