import { Injectable } from '@nestjs/common';

interface EmployeeData {
  id: number;
  name: string;
  rollNo: number;
}

@Injectable()
export class EmployeeService {
  private readonly employees: EmployeeData[] = [];

  findAll(): any {
    return this.employees;
  }

  save(data: EmployeeData): boolean {
    this.employees.push(data);
    return true;
  }

  findOne(id: number): any {
    return this.employees.find((emp) => emp.id === id);
  }

  updateOne(id: number, data: EmployeeData): boolean {
    const empIndex: number = this.employees.findIndex((emp) => emp.id === id);

    if (empIndex > 0) {
      this.employees[empIndex].name = data.name;
      this.employees[empIndex].rollNo = data.rollNo;

      return true;
    } else {
      return false;
    }
  }
}
