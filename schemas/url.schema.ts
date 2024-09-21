import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type UrlDocument = HydratedDocument<Url>;

@Schema()
export class Url {
  @Prop({ required: true })
  url: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  image: string;

  @Prop({ required: true })
  text: string;
}

export const UrlSchema = SchemaFactory.createForClass(Url)
