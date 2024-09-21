import { Injectable } from '@nestjs/common';

@Injectable()
export class ScrapingService {
  async scrapeUrl(url: string) {
    return 'Hello World!';
  }
}
