import type { EMployeeTrainingResponseDto, CreateEMployeeTrainingDto, UpdateEMployeeTrainingDto } from "@dtos/employeeTraining.dto";

export interface EmployeeTrainingRepositoryInterface {
  findAll(): Promise<EMployeeTrainingResponseDto[]>;
  findById(id: string): Promise<EMployeeTrainingResponseDto | null>;
  create(data: CreateEMployeeTrainingDto): Promise<EMployeeTrainingResponseDto>;
  update(id: string, data: UpdateEMployeeTrainingDto): Promise<EMployeeTrainingResponseDto | null>;
  softDelete(id: string): Promise<void>;
}
