import type { TRainingResponseDto, CreateTRainingDto, UpdateTRainingDto } from "@dtos/training.dto";

export interface TrainingServiceInterface {
  findAll(): Promise<TRainingResponseDto[]>;
  findById(id: string): Promise<TRainingResponseDto | null>;
  create(data: unknown): Promise<TRainingResponseDto>;
  update(id: string, data: unknown): Promise<TRainingResponseDto>;
  delete(id: string): Promise<void>;
}
