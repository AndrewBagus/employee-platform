import type { EMployeeLeaveAdvisorResponseDto, CreateEMployeeLeaveAdvisorDto, UpdateEMployeeLeaveAdvisorDto } from "@dtos/employeeLeaveAdvisor.dto";

export interface EmployeeLeaveAdvisorServiceInterface {
  findAll(): Promise<EMployeeLeaveAdvisorResponseDto[]>;
  findById(id: string): Promise<EMployeeLeaveAdvisorResponseDto | null>;
  create(data: unknown): Promise<EMployeeLeaveAdvisorResponseDto>;
  update(id: string, data: unknown): Promise<EMployeeLeaveAdvisorResponseDto>;
  delete(id: string): Promise<void>;
}
