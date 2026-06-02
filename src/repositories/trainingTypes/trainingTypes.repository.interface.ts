import type { TrainingTypeResponseDto, CreateTrainingTypeDto, UpdateTrainingTypeDto } from "@dtos/trainingType.dto";

export interface TrainingTypeRepositoryInterface {
  findAll(): Promise<TrainingTypeResponseDto[]>;
  findById(id: string): Promise<TrainingTypeResponseDto | null>;
  create(data: CreateTrainingTypeDto): Promise<TrainingTypeResponseDto>;
  update(id: string, data: UpdateTrainingTypeDto): Promise<TrainingTypeResponseDto | null>;
  softDelete(id: string): Promise<void>;
}
