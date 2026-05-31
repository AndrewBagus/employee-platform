import type { EmployeeTrainingResponseDto, CreateEmployeeTrainingDto, UpdateEmployeeTrainingDto } from "@dtos/employeeTraining.dto";

export interface EmployeeTrainingRepositoryInterface {
  findAll(): Promise<EmployeeTrainingResponseDto[]>;
  findById(id: string): Promise<EmployeeTrainingResponseDto | null>;
  create(data: CreateEmployeeTrainingDto): Promise<EmployeeTrainingResponseDto>;
  update(id: string, data: UpdateEmployeeTrainingDto): Promise<EmployeeTrainingResponseDto | null>;
  softDelete(id: string): Promise<void>;
}
