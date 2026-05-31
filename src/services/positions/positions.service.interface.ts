import type { PositionResponseDto, CreatePositionDto, UpdatePositionDto } from "@dtos/position.dto";

export interface PositionServiceInterface {
  findAll(): Promise<PositionResponseDto[]>;
  findById(id: string): Promise<PositionResponseDto | null>;
  create(data: unknown): Promise<PositionResponseDto>;
  update(id: string, data: unknown): Promise<PositionResponseDto>;
  delete(id: string): Promise<void>;
}
