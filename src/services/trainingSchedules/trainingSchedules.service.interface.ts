import type { TrainingScheduleResponseDto, CreateTrainingScheduleDto, UpdateTrainingScheduleDto } from "@dtos/trainingSchedule.dto";

export interface TrainingScheduleServiceInterface {
  findAll(): Promise<TrainingScheduleResponseDto[]>;
  findById(id: string): Promise<TrainingScheduleResponseDto | null>;
  create(data: unknown): Promise<TrainingScheduleResponseDto>;
  update(id: string, data: unknown): Promise<TrainingScheduleResponseDto>;
  delete(id: string): Promise<void>;
}
