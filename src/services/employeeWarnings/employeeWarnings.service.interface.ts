import type { EMployeeWarningResponseDto, CreateEMployeeWarningDto, UpdateEMployeeWarningDto } from "@dtos/employeeWarning.dto";

export interface EmployeeWarningServiceInterface {
  findAll(): Promise<EMployeeWarningResponseDto[]>;
  findById(id: string): Promise<EMployeeWarningResponseDto | null>;
  create(data: unknown): Promise<EMployeeWarningResponseDto>;
  update(id: string, data: unknown): Promise<EMployeeWarningResponseDto>;
  delete(id: string): Promise<void>;
}
