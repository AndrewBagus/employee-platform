import type { DepartmentResponseDto, CreateDepartmentDto, UpdateDepartmentDto } from "@dtos/department.dto";

export interface DepartmentServiceInterface {
  findAll(): Promise<DepartmentResponseDto[]>;
  findById(id: string): Promise<DepartmentResponseDto | null>;
  create(data: unknown): Promise<DepartmentResponseDto>;
  update(id: string, data: unknown): Promise<DepartmentResponseDto>;
  delete(id: string): Promise<void>;
}
