import type { TRainingTypeResponseDto, CreateTRainingTypeDto, UpdateTRainingTypeDto } from "@dtos/trainingType.dto";

export interface TrainingTypeServiceInterface {
  findAll(): Promise<TRainingTypeResponseDto[]>;
  findById(id: string): Promise<TRainingTypeResponseDto | null>;
  create(data: unknown): Promise<TRainingTypeResponseDto>;
  update(id: string, data: unknown): Promise<TRainingTypeResponseDto>;
  delete(id: string): Promise<void>;
}
