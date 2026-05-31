import type { EMployeeTrainingResponseDto, CreateEMployeeTrainingDto, UpdateEMployeeTrainingDto } from "@dtos/employeeTraining.dto";

export interface EmployeeTrainingServiceInterface {
  findAll(): Promise<EMployeeTrainingResponseDto[]>;
  findById(id: string): Promise<EMployeeTrainingResponseDto | null>;
  create(data: unknown): Promise<EMployeeTrainingResponseDto>;
  update(id: string, data: unknown): Promise<EMployeeTrainingResponseDto>;
  delete(id: string): Promise<void>;
}
