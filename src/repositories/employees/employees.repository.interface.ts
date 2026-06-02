import type { EmployeeResponseDto, CreateEmployeeDto, UpdateEmployeeDto } from "@dtos/employee.dto";

export interface EmployeeRepositoryInterface {
  findAll(): Promise<EmployeeResponseDto[]>;
  findById(id: string): Promise<EmployeeResponseDto | null>;
  create(data: CreateEmployeeDto): Promise<EmployeeResponseDto>;
  update(id: string, data: UpdateEmployeeDto): Promise<EmployeeResponseDto | null>;
  softDelete(id: string): Promise<void>;
}
