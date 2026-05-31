import type { EMployeeProjectResponseDto, CreateEMployeeProjectDto, UpdateEMployeeProjectDto } from "@dtos/employeeProject.dto";

export interface EmployeeProjectServiceInterface {
  findAll(): Promise<EMployeeProjectResponseDto[]>;
  findById(id: string): Promise<EMployeeProjectResponseDto | null>;
  create(data: unknown): Promise<EMployeeProjectResponseDto>;
  update(id: string, data: unknown): Promise<EMployeeProjectResponseDto>;
  delete(id: string): Promise<void>;
}
