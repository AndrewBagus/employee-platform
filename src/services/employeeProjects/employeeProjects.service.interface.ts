import type { EmployeeProjectResponseDto, CreateEmployeeProjectDto, UpdateEmployeeProjectDto } from "@dtos/employeeProject.dto";

export interface EmployeeProjectServiceInterface {
  findAll(): Promise<EmployeeProjectResponseDto[]>;
  findById(id: string): Promise<EmployeeProjectResponseDto | null>;
  create(data: unknown): Promise<EmployeeProjectResponseDto>;
  update(id: string, data: unknown): Promise<EmployeeProjectResponseDto>;
  delete(id: string): Promise<void>;
}
