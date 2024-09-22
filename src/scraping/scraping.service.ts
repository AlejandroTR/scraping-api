import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import puppeteer, { Browser } from "puppeteer";
import { Url, UrlDocument } from "../../schemas/url.schema";

@Injectable()
export class ScrapingService implements OnModuleInit, OnModuleDestroy {
  private browser: Browser

  constructor(@InjectModel(Url.name) private urlModel: Model<UrlDocument>) {}

  async onModuleInit() {
    this.browser = await puppeteer.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"]
    });
  }

  async onModuleDestroy() {
    if (this.browser) {
      await this.browser.close();
    }
  }

  async scrapeUrl(url: string): Promise<Url> {
    const page = await this.browser.newPage();

    try {
      await page.goto(url);

      const title = await page.title();
      const image = await page.$eval("img", (img: HTMLImageElement) => img.src).catch(() => null);
      const text = await page.$eval("article p", (p: HTMLParagraphElement) => p.innerText).catch(() => {
        console.error("'article p' not found, searching for other text on the page...");
        return page.$eval("body", (body: HTMLBodyElement) => body.innerText);
      })

      return this.urlModel.findOneAndUpdate(
        { url },
        { url, title, image, text },
        { new: true, upsert: true }
      ).exec()
    } catch (error) {
      console.error("Error scraping URL:", error.message);
    } finally {
      await page.close();
    }
  }

  async getUrls(): Promise<[Url[], number]> {
    const results = await this.urlModel.find().exec();
    const count = await this.urlModel.countDocuments().exec();

    return [results, count];
  }

  async getUrl(id: string): Promise<Url> {
    return this.urlModel.findById(id).exec();
  }
}
