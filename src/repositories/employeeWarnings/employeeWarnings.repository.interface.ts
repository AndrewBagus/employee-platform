import type { EmployeeWarningResponseDto, CreateEmployeeWarningDto, UpdateEmployeeWarningDto } from "@dtos/employeeWarning.dto";

export interface EmployeeWarningRepositoryInterface {
  findAll(): Promise<EmployeeWarningResponseDto[]>;
  findById(id: string): Promise<EmployeeWarningResponseDto | null>;
  create(data: CreateEmployeeWarningDto): Promise<EmployeeWarningResponseDto>;
  update(id: string, data: UpdateEmployeeWarningDto): Promise<EmployeeWarningResponseDto | null>;
  softDelete(id: string): Promise<void>;
}
