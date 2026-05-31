import type { EMployeeResponseDto, CreateEMployeeDto, UpdateEMployeeDto } from "@dtos/employee.dto";

export interface EmployeeServiceInterface {
  findAll(): Promise<EMployeeResponseDto[]>;
  findById(id: string): Promise<EMployeeResponseDto | null>;
  create(data: unknown): Promise<EMployeeResponseDto>;
  update(id: string, data: unknown): Promise<EMployeeResponseDto>;
  delete(id: string): Promise<void>;
}
