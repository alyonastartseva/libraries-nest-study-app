import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { EmployeeDto } from "./dto/employee.dto";
import { Employee, EmployeeDocument } from "./schemas/employee.schema";
import { Library, LibraryDocument } from "src/libraries/schemas/library.schema";

@Injectable()
export class EmployeesService {

  constructor(@InjectModel(Employee.name) private employeeModel: Model<EmployeeDocument>,
  @InjectModel(Library.name) private libraryModel: Model<LibraryDocument>) {}

  async getAll(): Promise<Employee[]> {
    return await this.employeeModel.find().populate('library');
  }

  async getAllByLibrary(libraryId: string): Promise<Employee[]> {
    const library = await this.libraryModel.findById(libraryId);
    return (await library.populate('employee')).employee;
  }

  async getById(id: string): Promise<Employee> {
    return this.employeeModel.findById(id).populate('library');
  }

  async create(libraryId: string, employeeDto: EmployeeDto): Promise<Employee> {
    const newEmployee = new this.employeeModel({
      library: libraryId,
      ...employeeDto
    });
    
    const library = await this.libraryModel.findById(libraryId);
    (await library.populate('employee')).employee.push(newEmployee);
    library.save();
    
    return newEmployee.save();
  }

  async update(id: string, employeeDto: EmployeeDto): Promise<Employee> {
    return this.employeeModel.findByIdAndUpdate(id, employeeDto, { new: true });
  }

  async remove(id: string): Promise<Employee> {
    return await this.employeeModel.findByIdAndRemove(id);
  }
}