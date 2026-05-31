import type { EmployeeTrainingResponseDto, CreateEmployeeTrainingDto, UpdateEmployeeTrainingDto } from "@dtos/employeeTraining.dto";

export interface EmployeeTrainingServiceInterface {
  findAll(): Promise<EmployeeTrainingResponseDto[]>;
  findById(id: string): Promise<EmployeeTrainingResponseDto | null>;
  create(data: unknown): Promise<EmployeeTrainingResponseDto>;
  update(id: string, data: unknown): Promise<EmployeeTrainingResponseDto>;
  delete(id: string): Promise<void>;
}
