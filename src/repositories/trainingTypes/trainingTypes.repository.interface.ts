import type { TRainingTypeResponseDto, CreateTRainingTypeDto, UpdateTRainingTypeDto } from "@dtos/trainingType.dto";

export interface TrainingTypeRepositoryInterface {
  findAll(): Promise<TRainingTypeResponseDto[]>;
  findById(id: string): Promise<TRainingTypeResponseDto | null>;
  create(data: CreateTRainingTypeDto): Promise<TRainingTypeResponseDto>;
  update(id: string, data: UpdateTRainingTypeDto): Promise<TRainingTypeResponseDto | null>;
  softDelete(id: string): Promise<void>;
}
