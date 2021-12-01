import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LibrariesModule } from './libraries/libraries.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://astartseva:alyona@libraries-nestjs.9gnlz.mongodb.net/libraries-nestjs?retryWrites=true&w=majority'), 
    LibrariesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
