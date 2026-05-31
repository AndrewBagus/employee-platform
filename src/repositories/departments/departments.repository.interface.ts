import type { DEpartmentResponseDto, CreateDEpartmentDto, UpdateDEpartmentDto } from "@dtos/department.dto";

export interface DepartmentRepositoryInterface {
  findAll(): Promise<DEpartmentResponseDto[]>;
  findById(id: string): Promise<DEpartmentResponseDto | null>;
  create(data: CreateDEpartmentDto): Promise<DEpartmentResponseDto>;
  update(id: string, data: UpdateDEpartmentDto): Promise<DEpartmentResponseDto | null>;
  softDelete(id: string): Promise<void>;
}
