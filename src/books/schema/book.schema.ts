import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";

import { Library } from "src/libraries/schemas/library.schema";

export type BookDocument = Book & mongoose.Document;

@Schema()
export class Book {

  @Prop()
  title: string;

  @Prop()
  author: string;

  @Prop()
  genre: string;

  @Prop()
  dataFirstPublic: string;

  @Prop()
  numberCompies: number;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Library' }] })
  library: Library;

}

export const BookSchema = SchemaFactory.createForClass(Book);