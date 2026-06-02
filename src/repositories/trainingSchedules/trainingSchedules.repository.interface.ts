import type { TrainingScheduleResponseDto, CreateTrainingScheduleDto, UpdateTrainingScheduleDto } from "@dtos/trainingSchedule.dto";

export interface TrainingScheduleRepositoryInterface {
  findAll(): Promise<TrainingScheduleResponseDto[]>;
  findById(id: string): Promise<TrainingScheduleResponseDto | null>;
  create(data: CreateTrainingScheduleDto): Promise<TrainingScheduleResponseDto>;
  update(id: string, data: UpdateTrainingScheduleDto): Promise<TrainingScheduleResponseDto | null>;
  softDelete(id: string): Promise<void>;
}
