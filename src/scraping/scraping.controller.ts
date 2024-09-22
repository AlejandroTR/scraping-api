import { Body, Controller, Get, InternalServerErrorException, Param, Post } from "@nestjs/common";
import { ApiBody, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { ScrapingService } from "./scraping.service";
import { ScrapeUrlDto } from "./dto/scrape-url.dto";
import { ApiCreatedResponse } from "@nestjs/swagger/dist/decorators/api-response.decorator";
import { ListScrapeDto } from "./dto/list-scrape.dto";
import { ScrapeDto } from "./dto/scrape.dto";

@Controller('scraping')
@ApiTags('Scraping')
export class ScrapingController {
  constructor(private readonly scrapingService: ScrapingService) {}

  @ApiOperation({
    summary: 'Scrape URL',
    description: 'Used to scrape the URL',
  })
  @ApiBody({ type: ScrapeUrlDto })
  @ApiCreatedResponse({ type: ScrapeDto, description: 'The URL has been successfully scraped and save.' })
  @Post()
  async scrapeUrl(@Body() scrapeUrlDto: ScrapeUrlDto) {
    return this.scrapingService.scrapeUrl(scrapeUrlDto.url)
  }

  @ApiOperation({
    summary: 'Get URLs',
    description: 'Used to get a list of scraped URLs',
  })
  @ApiOkResponse({ type: ListScrapeDto, description: 'List of scraped URLs' })
  @Get()
  async getUrls() {
    const [urls, count] = await this.scrapingService.getUrls()

    return {
      urls,
      count,
    };
  }

  @ApiOperation({
    summary: 'Get URL',
    description: 'Used to get the details of a single URL',
  })
  @ApiParam({ name: 'id', description: 'ID of the scraped URL' })
  @ApiOkResponse({ type: ScrapeDto, description: 'Scraped URL data' })
  @Get(':id')
  async getUrl(@Param('id') id: string) {
    try {
      return this.scrapingService.getUrl(id)
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }
}
