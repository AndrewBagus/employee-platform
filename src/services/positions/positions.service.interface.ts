import type { POsitionResponseDto, CreatePOsitionDto, UpdatePOsitionDto } from "@dtos/position.dto";

export interface PositionServiceInterface {
  findAll(): Promise<POsitionResponseDto[]>;
  findById(id: string): Promise<POsitionResponseDto | null>;
  create(data: unknown): Promise<POsitionResponseDto>;
  update(id: string, data: unknown): Promise<POsitionResponseDto>;
  delete(id: string): Promise<void>;
}
