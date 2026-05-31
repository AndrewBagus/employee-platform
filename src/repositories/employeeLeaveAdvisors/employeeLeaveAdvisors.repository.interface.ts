import type { EmployeeLeaveAdvisorResponseDto, CreateEmployeeLeaveAdvisorDto, UpdateEmployeeLeaveAdvisorDto } from "@dtos/employeeLeaveAdvisor.dto";

export interface EmployeeLeaveAdvisorRepositoryInterface {
  findAll(): Promise<EmployeeLeaveAdvisorResponseDto[]>;
  findById(id: string): Promise<EmployeeLeaveAdvisorResponseDto | null>;
  create(data: CreateEmployeeLeaveAdvisorDto): Promise<EmployeeLeaveAdvisorResponseDto>;
  update(id: string, data: UpdateEmployeeLeaveAdvisorDto): Promise<EmployeeLeaveAdvisorResponseDto | null>;
  softDelete(id: string): Promise<void>;
}
