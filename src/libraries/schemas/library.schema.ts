import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";

import { Employee } from "src/employees/schemas/employee.schema";
import { Book } from "src/books/schema/book.schema";

export type LibraryDocument = Library & mongoose.Document;

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

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Employee' }] })
  employee: Employee[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }] })
  book: Book[];
  
}

export const LibrarySchema = SchemaFactory.createForClass(Library);