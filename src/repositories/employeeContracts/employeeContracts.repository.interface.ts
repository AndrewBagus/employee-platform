import type { EmployeeContractResponseDto, CreateEmployeeContractDto, UpdateEmployeeContractDto } from "@dtos/employeeContract.dto";

export interface EmployeeContractRepositoryInterface {
  findAll(): Promise<EmployeeContractResponseDto[]>;
  findById(id: string): Promise<EmployeeContractResponseDto | null>;
  create(data: CreateEmployeeContractDto): Promise<EmployeeContractResponseDto>;
  update(id: string, data: UpdateEmployeeContractDto): Promise<EmployeeContractResponseDto | null>;
  softDelete(id: string): Promise<void>;
}
