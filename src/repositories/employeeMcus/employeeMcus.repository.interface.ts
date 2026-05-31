import type { EMployeeMcuResponseDto, CreateEMployeeMcuDto, UpdateEMployeeMcuDto } from "@dtos/employeeMcu.dto";

export interface EmployeeMcuRepositoryInterface {
  findAll(): Promise<EMployeeMcuResponseDto[]>;
  findById(id: string): Promise<EMployeeMcuResponseDto | null>;
  create(data: CreateEMployeeMcuDto): Promise<EMployeeMcuResponseDto>;
  update(id: string, data: UpdateEMployeeMcuDto): Promise<EMployeeMcuResponseDto | null>;
  softDelete(id: string): Promise<void>;
}
