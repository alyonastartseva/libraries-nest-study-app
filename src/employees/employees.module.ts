import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { EmployeesController } from "./employees.controller";
import { EmployeesService } from "./employees.service";
import { Employee, EmployeeSchema } from "./schemas/employee.schema";
import { Library, LibrarySchema } from "src/libraries/schemas/library.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Employee.name,
        schema: EmployeeSchema
      },
      {
        name: Library.name,
        schema: LibrarySchema
      }
    ])
  ],
  controllers: [EmployeesController],
  providers: [EmployeesService]
})
export class EmployeesModule {}