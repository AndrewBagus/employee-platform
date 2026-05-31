import type { WArningResponseDto, CreateWArningDto, UpdateWArningDto } from "@dtos/warning.dto";

export interface WarningRepositoryInterface {
  findAll(): Promise<WArningResponseDto[]>;
  findById(id: string): Promise<WArningResponseDto | null>;
  create(data: CreateWArningDto): Promise<WArningResponseDto>;
  update(id: string, data: UpdateWArningDto): Promise<WArningResponseDto | null>;
  softDelete(id: string): Promise<void>;
}
