import type { EMployeeWarningResponseDto, CreateEMployeeWarningDto, UpdateEMployeeWarningDto } from "@dtos/employeeWarning.dto";

export interface EmployeeWarningRepositoryInterface {
  findAll(): Promise<EMployeeWarningResponseDto[]>;
  findById(id: string): Promise<EMployeeWarningResponseDto | null>;
  create(data: CreateEMployeeWarningDto): Promise<EMployeeWarningResponseDto>;
  update(id: string, data: UpdateEMployeeWarningDto): Promise<EMployeeWarningResponseDto | null>;
  softDelete(id: string): Promise<void>;
}
