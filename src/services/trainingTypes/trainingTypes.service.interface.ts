import type { TrainingTypeResponseDto, CreateTrainingTypeDto, UpdateTrainingTypeDto } from "@dtos/trainingType.dto";

export interface TrainingTypeServiceInterface {
  findAll(): Promise<TrainingTypeResponseDto[]>;
  findById(id: string): Promise<TrainingTypeResponseDto | null>;
  create(data: unknown): Promise<TrainingTypeResponseDto>;
  update(id: string, data: unknown): Promise<TrainingTypeResponseDto>;
  delete(id: string): Promise<void>;
}
