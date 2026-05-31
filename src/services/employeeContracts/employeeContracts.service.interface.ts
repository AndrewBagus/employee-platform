import type { EmployeeContractResponseDto, CreateEmployeeContractDto, UpdateEmployeeContractDto } from "@dtos/employeeContract.dto";

export interface EmployeeContractServiceInterface {
  findAll(): Promise<EmployeeContractResponseDto[]>;
  findById(id: string): Promise<EmployeeContractResponseDto | null>;
  create(data: unknown): Promise<EmployeeContractResponseDto>;
  update(id: string, data: unknown): Promise<EmployeeContractResponseDto>;
  delete(id: string): Promise<void>;
}
