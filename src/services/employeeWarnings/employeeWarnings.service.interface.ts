import type { EmployeeWarningResponseDto, CreateEmployeeWarningDto, UpdateEmployeeWarningDto } from "@dtos/employeeWarning.dto";

export interface EmployeeWarningServiceInterface {
  findAll(): Promise<EmployeeWarningResponseDto[]>;
  findById(id: string): Promise<EmployeeWarningResponseDto | null>;
  create(data: unknown): Promise<EmployeeWarningResponseDto>;
  update(id: string, data: unknown): Promise<EmployeeWarningResponseDto>;
  delete(id: string): Promise<void>;
}
