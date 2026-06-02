import type { TrainingResponseDto, CreateTrainingDto, UpdateTrainingDto } from "@dtos/training.dto";

export interface TrainingServiceInterface {
  findAll(): Promise<TrainingResponseDto[]>;
  findById(id: string): Promise<TrainingResponseDto | null>;
  create(data: unknown): Promise<TrainingResponseDto>;
  update(id: string, data: unknown): Promise<TrainingResponseDto>;
  delete(id: string): Promise<void>;
}
