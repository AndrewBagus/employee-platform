import type { EMployeeProjectResponseDto, CreateEMployeeProjectDto, UpdateEMployeeProjectDto } from "@dtos/employeeProject.dto";

export interface EmployeeProjectRepositoryInterface {
  findAll(): Promise<EMployeeProjectResponseDto[]>;
  findById(id: string): Promise<EMployeeProjectResponseDto | null>;
  create(data: CreateEMployeeProjectDto): Promise<EMployeeProjectResponseDto>;
  update(id: string, data: UpdateEMployeeProjectDto): Promise<EMployeeProjectResponseDto | null>;
  softDelete(id: string): Promise<void>;
}
