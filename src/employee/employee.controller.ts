import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get()
  getEmployeeDashboard(): string {
    return 'Employee Dashboad';
  }

  @Post('create')
  createEmployee(@Body() data: any): string {
    console.log('data', data);
    const res: boolean = this.employeeService.save(data);
    return res ? 'Employee create' : 'Employee not create';
  }

  @Get('list')
  getList(): string {
    return this.employeeService.findAll();
  }

  @Get('detail/:id')
  getDetail(@Param('id', ParseIntPipe) id: number): string {
    return this.employeeService.findOne(id);
  }

  @Put('update/:id')
  getEmployee(@Param() params: any, @Body() data: any): boolean {
    const empId: number = parseInt(params.id);

    console.log('empId', empId, data);
    return this.employeeService.updateOne(empId, data);
  }
}
