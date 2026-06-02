import type { WarningResponseDto, CreateWarningDto, UpdateWarningDto } from "@dtos/warning.dto";

export interface WarningRepositoryInterface {
  findAll(): Promise<WarningResponseDto[]>;
  findById(id: string): Promise<WarningResponseDto | null>;
  create(data: CreateWarningDto): Promise<WarningResponseDto>;
  update(id: string, data: UpdateWarningDto): Promise<WarningResponseDto | null>;
  softDelete(id: string): Promise<void>;
}
