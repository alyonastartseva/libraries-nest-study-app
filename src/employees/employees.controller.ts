import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';

import { EmployeeDto } from './dto/employee.dto';
import { EmployeesService } from './employees.service';
import { Employee } from './schemas/employee.schema';

@Controller('employees')
export class EmployeesController {

  constructor(private readonly employeesService: EmployeesService) {}

  @Get()
  getAll(): Promise<Employee[]> {
    return this.employeesService.getAll();
  }

  @Get('byLibrary/:libraryId')
  getAllByLibrary(@Param('libraryId') libraryId: string): Promise<Employee[]> {
    return this.employeesService.getAllByLibrary(libraryId);
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.employeesService.getById(id);
  }

  @Post(':libraryId')
  @HttpCode(HttpStatus.CREATED)
  create(@Param('libraryId') libraryId: string, @Body() employeeDto: EmployeeDto) {
    return this.employeesService.create(libraryId, employeeDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() employeeDto: EmployeeDto) {
    return this.employeesService.update(id, employeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeesService.remove(id);
  }
}
