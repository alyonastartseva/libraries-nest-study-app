import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeesModule } from './employees/employees.module';
import { LibrariesModule } from './libraries/libraries.module';
import { BooksModule } from './books/books.module';

@Module({
  imports: [
    LibrariesModule,
    EmployeesModule,
    BooksModule,
    MongooseModule.forRoot('mongodb+srv://astartseva:alyona@libraries-nestjs.9gnlz.mongodb.net/libraries-nestjs?retryWrites=true&w=majority')
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
