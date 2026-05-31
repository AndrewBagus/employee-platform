import type { EMployeeContractResponseDto, CreateEMployeeContractDto, UpdateEMployeeContractDto } from "@dtos/employeeContract.dto";

export interface EmployeeContractRepositoryInterface {
  findAll(): Promise<EMployeeContractResponseDto[]>;
  findById(id: string): Promise<EMployeeContractResponseDto | null>;
  create(data: CreateEMployeeContractDto): Promise<EMployeeContractResponseDto>;
  update(id: string, data: UpdateEMployeeContractDto): Promise<EMployeeContractResponseDto | null>;
  softDelete(id: string): Promise<void>;
}
