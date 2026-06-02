import type { PositionResponseDto, CreatePositionDto, UpdatePositionDto } from "@dtos/position.dto";

export interface PositionRepositoryInterface {
  findAll(): Promise<PositionResponseDto[]>;
  findById(id: string): Promise<PositionResponseDto | null>;
  create(data: CreatePositionDto): Promise<PositionResponseDto>;
  update(id: string, data: UpdatePositionDto): Promise<PositionResponseDto | null>;
  softDelete(id: string): Promise<void>;
}
