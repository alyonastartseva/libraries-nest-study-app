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

  //async remove(libraryId: string, id: string):Promise<Library> {

    // const library = await this.libraryModel.findById(libraryId);
    // return ((await library.populate('employees')).employees);

    // let library = (await this.libraryModel.findById(libraryId)).employees;

    // return (await this.libraryModel.findOneAndUpdate(
    //   { $pull: { '$.employees': { _id: id } }}
    // ))

    // this.libraryModel.findById(libraryId)
    // .then(result => {
    //   result.employees.id(id).remove();
    //   result.save()
    // })

    // return this.libraryModel.findById(libraryId);

    // library.employees.id(id).remove();
    // let finalResult = await library.save()
    // console.log(finalResult)

    // library.then(result => {
    //   result.employees.id(id).remove();
    //   result.save()
    // });

    // return library;

    // const library = (await this.libraryModel.findById(libraryId).populate('employees'));
    
    // console.log(library);


    // this.libraryModel.findOne(
    //   {
    //     '_id': libraryId,
    //     function (result) {
    //       result.employees._id(id).remove();
    //       result.save();
    //     }
    //   }
    // )
    
    // return this.libraryModel.findById(libraryId);

    // return (await this.libraryModel.findByIdAndUpdate(
    //   libraryId,
    //   {
    //     $pull: {
    //       employees: {
    //         _id: id,
    //         library: libraryId
    //       }
    //     }
    //   },
    //   {  new: true }
    // ))


    // (await library
    //   .updateOne(
    //     {
    //       '$pull': {
    //               'employees': {
    //                 '_id':  new Types.ObjectId(id)
    //               }
    //             },
    //       'new': true
    //     }
    //   ))

  //}

  async update(id: string, employeeDto: UpdateEmployeeDto): Promise<Employee> {
    return this.employeeModel.findByIdAndUpdate(id, employeeDto, { new: true });
  }

}