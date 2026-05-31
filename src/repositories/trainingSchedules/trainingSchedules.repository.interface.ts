import type { TRainingScheduleResponseDto, CreateTRainingScheduleDto, UpdateTRainingScheduleDto } from "@dtos/trainingSchedule.dto";

export interface TrainingScheduleRepositoryInterface {
  findAll(): Promise<TRainingScheduleResponseDto[]>;
  findById(id: string): Promise<TRainingScheduleResponseDto | null>;
  create(data: CreateTRainingScheduleDto): Promise<TRainingScheduleResponseDto>;
  update(id: string, data: UpdateTRainingScheduleDto): Promise<TRainingScheduleResponseDto | null>;
  softDelete(id: string): Promise<void>;
}
