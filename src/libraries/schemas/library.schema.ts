import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

export type LibraryDocument = Library & Document;

@Schema()
export class Library {

  @Prop()
  name: string;

  @Prop()
  locale: string;

  @Prop()
  address: string;

  @Prop()
  organizationName: string;

  @Prop()
  description: string;
}

export const LibrarySchema = SchemaFactory.createForClass(Library);