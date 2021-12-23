import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';

import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { EmployeesService } from './employees.service';
import { Employee } from './schemas/employee.schema';

@Controller('employees')
export class EmployeesController {

  constructor(private readonly employeesService: EmployeesService) {}

  @Get()
  getAll(): Promise<Employee[]> {
    return this.employeesService.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.employeesService.getById(id);
  }

  @Post(':libraryId')
  @HttpCode(HttpStatus.CREATED)
  create(@Param('libraryId') libraryId: string, @Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeesService.create(libraryId, createEmployeeDto);
  }

  // @Delete(':libraryId/:id')
  // remove(@Param('libraryId') libraryId: string, @Param('id') id: string) {
  //   return this.employeesService.remove(libraryId, id);
  // }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateEmployeeDto: UpdateEmployeeDto) {
    return this.employeesService.update(id, updateEmployeeDto);
  }
}
