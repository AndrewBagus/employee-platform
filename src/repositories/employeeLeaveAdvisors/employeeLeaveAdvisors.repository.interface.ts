import type { EMployeeLeaveAdvisorResponseDto, CreateEMployeeLeaveAdvisorDto, UpdateEMployeeLeaveAdvisorDto } from "@dtos/employeeLeaveAdvisor.dto";

export interface EmployeeLeaveAdvisorRepositoryInterface {
  findAll(): Promise<EMployeeLeaveAdvisorResponseDto[]>;
  findById(id: string): Promise<EMployeeLeaveAdvisorResponseDto | null>;
  create(data: CreateEMployeeLeaveAdvisorDto): Promise<EMployeeLeaveAdvisorResponseDto>;
  update(id: string, data: UpdateEMployeeLeaveAdvisorDto): Promise<EMployeeLeaveAdvisorResponseDto | null>;
  softDelete(id: string): Promise<void>;
}
