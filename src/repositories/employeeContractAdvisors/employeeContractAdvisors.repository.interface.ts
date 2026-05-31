import type { EmployeeContractAdvisorResponseDto, CreateEmployeeContractAdvisorDto, UpdateEmployeeContractAdvisorDto } from "@dtos/employeeContractAdvisor.dto";

export interface EmployeeContractAdvisorRepositoryInterface {
  findAll(): Promise<EmployeeContractAdvisorResponseDto[]>;
  findById(id: string): Promise<EmployeeContractAdvisorResponseDto | null>;
  create(data: CreateEmployeeContractAdvisorDto): Promise<EmployeeContractAdvisorResponseDto>;
  update(id: string, data: UpdateEmployeeContractAdvisorDto): Promise<EmployeeContractAdvisorResponseDto | null>;
  softDelete(id: string): Promise<void>;
}
