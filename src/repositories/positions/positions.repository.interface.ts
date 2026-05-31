import type { POsitionResponseDto, CreatePOsitionDto, UpdatePOsitionDto } from "@dtos/position.dto";

export interface PositionRepositoryInterface {
  findAll(): Promise<POsitionResponseDto[]>;
  findById(id: string): Promise<POsitionResponseDto | null>;
  create(data: CreatePOsitionDto): Promise<POsitionResponseDto>;
  update(id: string, data: UpdatePOsitionDto): Promise<POsitionResponseDto | null>;
  softDelete(id: string): Promise<void>;
}
