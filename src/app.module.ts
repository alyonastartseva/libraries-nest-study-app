import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { EmployeesModule } from './employees/employees.module';
import { LibrariesModule } from './libraries/libraries.module';
import { BooksModule } from './books/books.module';

@Module({
  imports: [
    LibrariesModule,
    EmployeesModule,
    BooksModule,
    MongooseModule.forRoot('mongodb+srv://astartseva:alyona@cluster0.9gnlz.mongodb.net/libraries-app?retryWrites=true&w=majority')
  ]
})
export class AppModule {}
