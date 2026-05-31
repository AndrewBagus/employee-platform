import type { TRainingScheduleResponseDto, CreateTRainingScheduleDto, UpdateTRainingScheduleDto } from "@dtos/trainingSchedule.dto";

export interface TrainingScheduleServiceInterface {
  findAll(): Promise<TRainingScheduleResponseDto[]>;
  findById(id: string): Promise<TRainingScheduleResponseDto | null>;
  create(data: unknown): Promise<TRainingScheduleResponseDto>;
  update(id: string, data: unknown): Promise<TRainingScheduleResponseDto>;
  delete(id: string): Promise<void>;
}
