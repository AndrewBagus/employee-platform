import type { EmployeeResponseDto, CreateEmployeeDto, UpdateEmployeeDto } from "@dtos/employee.dto";

export interface EmployeeServiceInterface {
  findAll(): Promise<EmployeeResponseDto[]>;
  findById(id: string): Promise<EmployeeResponseDto | null>;
  create(data: unknown): Promise<EmployeeResponseDto>;
  update(id: string, data: unknown): Promise<EmployeeResponseDto>;
  delete(id: string): Promise<void>;
}
