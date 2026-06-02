import type { WarningResponseDto, CreateWarningDto, UpdateWarningDto } from "@dtos/warning.dto";

export interface WarningServiceInterface {
  findAll(): Promise<WarningResponseDto[]>;
  findById(id: string): Promise<WarningResponseDto | null>;
  create(data: unknown): Promise<WarningResponseDto>;
  update(id: string, data: unknown): Promise<WarningResponseDto>;
  delete(id: string): Promise<void>;
}
