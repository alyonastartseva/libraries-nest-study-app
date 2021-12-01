import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type EmployeeDocument = Employee & Document;

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

}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);