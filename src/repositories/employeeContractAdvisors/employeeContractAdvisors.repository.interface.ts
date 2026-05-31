import type { EMployeeContractAdvisorResponseDto, CreateEMployeeContractAdvisorDto, UpdateEMployeeContractAdvisorDto } from "@dtos/employeeContractAdvisor.dto";

export interface EmployeeContractAdvisorRepositoryInterface {
  findAll(): Promise<EMployeeContractAdvisorResponseDto[]>;
  findById(id: string): Promise<EMployeeContractAdvisorResponseDto | null>;
  create(data: CreateEMployeeContractAdvisorDto): Promise<EMployeeContractAdvisorResponseDto>;
  update(id: string, data: UpdateEMployeeContractAdvisorDto): Promise<EMployeeContractAdvisorResponseDto | null>;
  softDelete(id: string): Promise<void>;
}
