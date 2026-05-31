import type { EMployeeMcuResponseDto, CreateEMployeeMcuDto, UpdateEMployeeMcuDto } from "@dtos/employeeMcu.dto";

export interface EmployeeMcuServiceInterface {
  findAll(): Promise<EMployeeMcuResponseDto[]>;
  findById(id: string): Promise<EMployeeMcuResponseDto | null>;
  create(data: unknown): Promise<EMployeeMcuResponseDto>;
  update(id: string, data: unknown): Promise<EMployeeMcuResponseDto>;
  delete(id: string): Promise<void>;
}
