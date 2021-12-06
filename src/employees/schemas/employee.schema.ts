import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";

import { Library } from "src/libraries/schemas/library.schema";

export type EmployeeDocument = Employee & mongoose.Document;

@Schema()
export class Employee {

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  position: string;

  @Prop()
  address: string;

  @Prop()
  startedWork: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Library' }] })
  library: Library;

}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);