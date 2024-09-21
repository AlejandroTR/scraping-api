import { Injectable } from '@nestjs/common';
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import puppeteer from 'puppeteer';
import { Url, UrlDocument } from "../../schemas/url.schema";

@Injectable()
export class ScrapingService {
  constructor(@InjectModel(Url.name) private urlModel: Model<UrlDocument>) {}

  async scrapeUrl(url: string): Promise<Url> {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(url);

    const title = await page.title();
    const image = await page.$eval("img", (img: HTMLImageElement) => img.src);
    const text = await page.$eval('article p', (p: HTMLParagraphElement) => p.innerText)

    await browser.close();

    const scrapedData = new this.urlModel({ url, title, image, text });
    return scrapedData.save();
  }

  async getUrls(): Promise<Url[]> {
    return this.urlModel.find().exec();
  }

  async getUrl(id: string): Promise<Url> {
    return this.urlModel.findById(id).exec();
  }
}
