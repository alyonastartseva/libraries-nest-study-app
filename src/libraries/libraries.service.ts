import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { LibraryDto } from "./dto/library.dto";
import { Library, LibraryDocument } from "./schemas/library.schema";

@Injectable()
export class LibrariesService {

  constructor(@InjectModel(Library.name) private libraryModel: Model<LibraryDocument>) {}

  async getAll(): Promise<Library[]> {
    return await this.libraryModel.find().populate('employee');
  }

  async getById(id: string): Promise<Library> {
    return await this.libraryModel.findById(id).populate('employee');
  }

  async create(libraryDto: LibraryDto): Promise<Library> {
    const newLibrary = new this.libraryModel(libraryDto);
    return await newLibrary.save();
  }

  async update(id: string, libraryDto: LibraryDto): Promise<Library> {
    return await this.libraryModel.findByIdAndUpdate(id, libraryDto, { new: true });
  }

  async remove(id: string): Promise<Library> {
    return await this.libraryModel.findByIdAndRemove(id);
  }
  
  // async getBooks(id: string): Promise<Book[]> {
  //   const library = await this.libraryModel.findById(id);
  //   return (await library.populate('book')).book;
  // }
}