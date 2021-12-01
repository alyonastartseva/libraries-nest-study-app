import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book, BookDocument } from './schema/book.schema';

@Injectable()
export class BooksService {

  constructor(@InjectModel(Book.name) private bookModel: Model<BookDocument>) {}

  async getAll(): Promise<Book[]> {
    return this.bookModel.find().exec();
  }

  async getById(id: string): Promise<Book> {
    return this.bookModel.findById(id);
  }

  async create(createBookDto: CreateBookDto): Promise<Book> {
    const newBook = new this.bookModel(createBookDto);
    return newBook.save();
  }

  async update(id: string, updateBookDto: UpdateBookDto) {
    return this.bookModel.findByIdAndUpdate(id, updateBookDto, { new: true });
  }

  async remove(id: string): Promise<Book> {
    return this.bookModel.findByIdAndRemove(id);
  }
  
}
