import type { DepartmentResponseDto, CreateDepartmentDto, UpdateDepartmentDto } from "@dtos/department.dto";

export interface DepartmentRepositoryInterface {
  findAll(): Promise<DepartmentResponseDto[]>;
  findById(id: string): Promise<DepartmentResponseDto | null>;
  create(data: CreateDepartmentDto): Promise<DepartmentResponseDto>;
  update(id: string, data: UpdateDepartmentDto): Promise<DepartmentResponseDto | null>;
  softDelete(id: string): Promise<void>;
}
