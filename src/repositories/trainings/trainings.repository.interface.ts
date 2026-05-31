import type { TRainingResponseDto, CreateTRainingDto, UpdateTRainingDto } from "@dtos/training.dto";

export interface TrainingRepositoryInterface {
  findAll(): Promise<TRainingResponseDto[]>;
  findById(id: string): Promise<TRainingResponseDto | null>;
  create(data: CreateTRainingDto): Promise<TRainingResponseDto>;
  update(id: string, data: UpdateTRainingDto): Promise<TRainingResponseDto | null>;
  softDelete(id: string): Promise<void>;
}
