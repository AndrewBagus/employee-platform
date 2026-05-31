import type { EmployeeMcuResponseDto, CreateEmployeeMcuDto, UpdateEmployeeMcuDto } from "@dtos/employeeMcu.dto";

export interface EmployeeMcuServiceInterface {
  findAll(): Promise<EmployeeMcuResponseDto[]>;
  findById(id: string): Promise<EmployeeMcuResponseDto | null>;
  create(data: unknown): Promise<EmployeeMcuResponseDto>;
  update(id: string, data: unknown): Promise<EmployeeMcuResponseDto>;
  delete(id: string): Promise<void>;
}
