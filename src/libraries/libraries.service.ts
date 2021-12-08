import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { CreateLibraryDto } from "./dto/create-library.dto";
import { UpdateLibraryDto } from "./dto/update-library.dto";
import { Library, LibraryDocument } from "./schemas/library.schema";
import { Employee } from "src/employees/schemas/employee.schema";

@Injectable()
export class LibrariesService {

  constructor(@InjectModel(Library.name) private libraryModel: Model<LibraryDocument>) {}

  async getAll(): Promise<Library[]> {
    return await this.libraryModel.find().exec();
  }

  async getById(id: string): Promise<Library> {
    return await this.libraryModel.findById(id).exec();
  }

  async create(libraryDto: CreateLibraryDto): Promise<Library> {
    const newLibrary = new this.libraryModel(libraryDto);
    return await newLibrary.save();
  }

  async remove(id: string): Promise<Library> {
    return await this.libraryModel.findByIdAndRemove(id);
  }

  async update(id: string, libraryDto: UpdateLibraryDto): Promise<Library> {
    return await this.libraryModel.findByIdAndUpdate(id, libraryDto, { new: true });
  }

  async getEmployees(id: string): Promise<Employee[]> {
    const library = await this.libraryModel.findById(id);
    return (await library.populate("employees")).employees;
  }

}