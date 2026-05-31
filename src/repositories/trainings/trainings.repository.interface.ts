import type { TrainingResponseDto, CreateTrainingDto, UpdateTrainingDto } from "@dtos/training.dto";

export interface TrainingRepositoryInterface {
  findAll(): Promise<TrainingResponseDto[]>;
  findById(id: string): Promise<TrainingResponseDto | null>;
  create(data: CreateTrainingDto): Promise<TrainingResponseDto>;
  update(id: string, data: UpdateTrainingDto): Promise<TrainingResponseDto | null>;
  softDelete(id: string): Promise<void>;
}
