import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';

import { LibraryDto } from './dto/library.dto';
import { LibrariesService } from './libraries.service';
import { Library } from './schemas/library.schema';

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
  create(@Body() libraryDto: LibraryDto): Promise<Library> {
    return this.librariesService.create(libraryDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() libraryDto: LibraryDto): Promise<Library> {
    return this.librariesService.update(id, libraryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Library> {
    return this.librariesService.remove(id);
  }

  // @Get('books/:id')
  // getBooks(@Param('id') id: string): Promise<Book[]> {
  //   return this.librariesService.getBooks(id);
  // }
}
