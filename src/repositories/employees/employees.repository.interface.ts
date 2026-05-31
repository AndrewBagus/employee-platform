import type { EMployeeResponseDto, CreateEMployeeDto, UpdateEMployeeDto } from "@dtos/employee.dto";

export interface EmployeeRepositoryInterface {
  findAll(): Promise<EMployeeResponseDto[]>;
  findById(id: string): Promise<EMployeeResponseDto | null>;
  create(data: CreateEMployeeDto): Promise<EMployeeResponseDto>;
  update(id: string, data: UpdateEMployeeDto): Promise<EMployeeResponseDto | null>;
  softDelete(id: string): Promise<void>;
}
