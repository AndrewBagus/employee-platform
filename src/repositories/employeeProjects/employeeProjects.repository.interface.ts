import type { EmployeeProjectResponseDto, CreateEmployeeProjectDto, UpdateEmployeeProjectDto } from "@dtos/employeeProject.dto";

export interface EmployeeProjectRepositoryInterface {
  findAll(): Promise<EmployeeProjectResponseDto[]>;
  findById(id: string): Promise<EmployeeProjectResponseDto | null>;
  create(data: CreateEmployeeProjectDto): Promise<EmployeeProjectResponseDto>;
  update(id: string, data: UpdateEmployeeProjectDto): Promise<EmployeeProjectResponseDto | null>;
  softDelete(id: string): Promise<void>;
}
