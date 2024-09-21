import { Module } from "@nestjs/common";
import { ScrapingService } from "./scraping.service";
import { ScrapingController } from "./scraping.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Url, UrlSchema } from "../../schemas/url.schema";

@Module({
  imports: [MongooseModule.forFeature([{ name: Url.name, schema: UrlSchema }])],
  providers: [ScrapingService],
  controllers: [ScrapingController]
})
export class ScrapingModule {}
