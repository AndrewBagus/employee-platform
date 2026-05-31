import type { WArningResponseDto, CreateWArningDto, UpdateWArningDto } from "@dtos/warning.dto";

export interface WarningServiceInterface {
  findAll(): Promise<WArningResponseDto[]>;
  findById(id: string): Promise<WArningResponseDto | null>;
  create(data: unknown): Promise<WArningResponseDto>;
  update(id: string, data: unknown): Promise<WArningResponseDto>;
  delete(id: string): Promise<void>;
}
