import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { CreateEmployeeDto } from "./dto/create-employee.dto";
import { UpdateEmployeeDto } from "./dto/update-employee.dto";
import { Employee, EmployeeDocument } from "./schemas/employee.schema";
import { Library, LibraryDocument } from "src/libraries/schemas/library.schema";

@Injectable()
export class EmployeesService {

  constructor(@InjectModel(Employee.name) private employeeModel: Model<EmployeeDocument>,
  @InjectModel(Library.name) private libraryModel: Model<LibraryDocument>) {}

  async getAll(): Promise<Employee[]> {
    return await this.employeeModel.find().populate('library');
  }

  async getById(id: string): Promise<Employee> {
    return this.employeeModel.findById(id).populate('library');
  }

  async create(library: string, employeeDto: CreateEmployeeDto): Promise<Employee> {
    const newEmployee = new this.employeeModel({
      library,
      ...employeeDto
    });
    
    const libraryModel = await this.libraryModel.findById(library);
    (await libraryModel.populate('employees')).employees.push(newEmployee);
    libraryModel.save();
    return newEmployee.save();
  }

  async remove(id: string): Promise<Employee> {
    return this.employeeModel.findByIdAndRemove(id);
  }

  async update(id: string, employeeDto: UpdateEmployeeDto): Promise<Employee> {
    return this.employeeModel.findByIdAndUpdate(id, employeeDto, { new: true });
  }

}