import type { DEpartmentResponseDto, CreateDEpartmentDto, UpdateDEpartmentDto } from "@dtos/department.dto";

export interface DepartmentServiceInterface {
  findAll(): Promise<DEpartmentResponseDto[]>;
  findById(id: string): Promise<DEpartmentResponseDto | null>;
  create(data: unknown): Promise<DEpartmentResponseDto>;
  update(id: string, data: unknown): Promise<DEpartmentResponseDto>;
  delete(id: string): Promise<void>;
}
