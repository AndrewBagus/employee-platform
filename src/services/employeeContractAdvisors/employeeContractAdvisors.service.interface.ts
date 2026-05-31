import type { EMployeeContractAdvisorResponseDto, CreateEMployeeContractAdvisorDto, UpdateEMployeeContractAdvisorDto } from "@dtos/employeeContractAdvisor.dto";

export interface EmployeeContractAdvisorServiceInterface {
  findAll(): Promise<EMployeeContractAdvisorResponseDto[]>;
  findById(id: string): Promise<EMployeeContractAdvisorResponseDto | null>;
  create(data: unknown): Promise<EMployeeContractAdvisorResponseDto>;
  update(id: string, data: unknown): Promise<EMployeeContractAdvisorResponseDto>;
  delete(id: string): Promise<void>;
}
