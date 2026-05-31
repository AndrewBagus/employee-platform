import type { EMployeeContractResponseDto, CreateEMployeeContractDto, UpdateEMployeeContractDto } from "@dtos/employeeContract.dto";

export interface EmployeeContractServiceInterface {
  findAll(): Promise<EMployeeContractResponseDto[]>;
  findById(id: string): Promise<EMployeeContractResponseDto | null>;
  create(data: unknown): Promise<EMployeeContractResponseDto>;
  update(id: string, data: unknown): Promise<EMployeeContractResponseDto>;
  delete(id: string): Promise<void>;
}
