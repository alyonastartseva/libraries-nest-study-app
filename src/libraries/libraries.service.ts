import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { CreateLibraryDto } from "./dto/create-library.dto";
import { UpdateLibraryDto } from "./dto/update-library.dto";
import { Library, LibraryDocument } from "./schemas/library.schema";

@Injectable()
export class LibrariesService {

  constructor(@InjectModel(Library.name) private libraryModel: Model<LibraryDocument>) {}

  async getAll(): Promise<Library[]> {
    return this.libraryModel.find().exec();
  }

  async getById(id: string): Promise<Library> {
    return this.libraryModel.findById(id);
  }

  async create(libraryDto: CreateLibraryDto): Promise<Library> {
    const newLibrary = new this.libraryModel(libraryDto);
    return newLibrary.save();
  }

  async remove(id: string): Promise<Library> {
    return this.libraryModel.findByIdAndRemove(id);
  }

  async update(id: string, libraryDto: UpdateLibraryDto): Promise<Library> {
    return this.libraryModel.findByIdAndUpdate(id, libraryDto, { new: true });
  }
}