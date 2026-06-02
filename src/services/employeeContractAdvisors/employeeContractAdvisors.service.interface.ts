import type { EmployeeContractAdvisorResponseDto, CreateEmployeeContractAdvisorDto, UpdateEmployeeContractAdvisorDto } from "@dtos/employeeContractAdvisor.dto";

export interface EmployeeContractAdvisorServiceInterface {
  findAll(): Promise<EmployeeContractAdvisorResponseDto[]>;
  findById(id: string): Promise<EmployeeContractAdvisorResponseDto | null>;
  create(data: unknown): Promise<EmployeeContractAdvisorResponseDto>;
  update(id: string, data: unknown): Promise<EmployeeContractAdvisorResponseDto>;
  delete(id: string): Promise<void>;
}
