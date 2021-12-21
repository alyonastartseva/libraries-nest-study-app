import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';

import { CreateLibraryDto } from './dto/create-library.dto';
import { UpdateLibraryDto } from './dto/update-library.dto';
import { LibrariesService } from './libraries.service';
import { Library } from './schemas/library.schema';
import { Book } from 'src/books/schema/book.schema';
import { Employee } from 'src/employees/schemas/employee.schema';

@Controller('libraries')
export class LibrariesController {

  constructor(private readonly librariesService: LibrariesService) {}

  @Get()
  getAll(): Promise<Library[]> {
    return this.librariesService.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: string): Promise<Library> {
    return this.librariesService.getById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createLibraryDto: CreateLibraryDto): Promise<Library> {
    return this.librariesService.create(createLibraryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Library> {
    return this.librariesService.remove(id);
  }
  
  @Put(':id')
  update(@Param('id') id: string, @Body() updateLibraryDto: UpdateLibraryDto): Promise<Library> {
    return this.librariesService.update(id, updateLibraryDto);
  }

  @Get('employees/:id')
  getEmployees(@Param('id') id: string): Promise<Employee[]> {
    return this.librariesService.getEmployees(id);
  }

  @Get('books/:id')
  getBooks(@Param('id') id: string): Promise<Book[]> {
    return this.librariesService.getBooks(id);
  }
}
