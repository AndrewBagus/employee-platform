import type { EmployeeMcuResponseDto, CreateEmployeeMcuDto, UpdateEmployeeMcuDto } from "@dtos/employeeMcu.dto";

export interface EmployeeMcuRepositoryInterface {
  findAll(): Promise<EmployeeMcuResponseDto[]>;
  findById(id: string): Promise<EmployeeMcuResponseDto | null>;
  create(data: CreateEmployeeMcuDto): Promise<EmployeeMcuResponseDto>;
  update(id: string, data: UpdateEmployeeMcuDto): Promise<EmployeeMcuResponseDto | null>;
  softDelete(id: string): Promise<void>;
}
