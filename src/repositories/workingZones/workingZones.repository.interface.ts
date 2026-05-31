import type { WOrkingZoneResponseDto, CreateWOrkingZoneDto, UpdateWOrkingZoneDto } from "@dtos/workingZone.dto";

export interface WorkingZoneRepositoryInterface {
  findAll(): Promise<WOrkingZoneResponseDto[]>;
  findById(id: string): Promise<WOrkingZoneResponseDto | null>;
  create(data: CreateWOrkingZoneDto): Promise<WOrkingZoneResponseDto>;
  update(id: string, data: UpdateWOrkingZoneDto): Promise<WOrkingZoneResponseDto | null>;
  softDelete(id: string): Promise<void>;
}
