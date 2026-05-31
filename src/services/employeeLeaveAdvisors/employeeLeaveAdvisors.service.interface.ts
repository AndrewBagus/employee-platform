import type { EmployeeLeaveAdvisorResponseDto, CreateEmployeeLeaveAdvisorDto, UpdateEmployeeLeaveAdvisorDto } from "@dtos/employeeLeaveAdvisor.dto";

export interface EmployeeLeaveAdvisorServiceInterface {
  findAll(): Promise<EmployeeLeaveAdvisorResponseDto[]>;
  findById(id: string): Promise<EmployeeLeaveAdvisorResponseDto | null>;
  create(data: unknown): Promise<EmployeeLeaveAdvisorResponseDto>;
  update(id: string, data: unknown): Promise<EmployeeLeaveAdvisorResponseDto>;
  delete(id: string): Promise<void>;
}
