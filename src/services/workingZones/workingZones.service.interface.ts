import type { WOrkingZoneResponseDto, CreateWOrkingZoneDto, UpdateWOrkingZoneDto } from "@dtos/workingZone.dto";

export interface WorkingZoneServiceInterface {
  findAll(): Promise<WOrkingZoneResponseDto[]>;
  findById(id: string): Promise<WOrkingZoneResponseDto | null>;
  create(data: unknown): Promise<WOrkingZoneResponseDto>;
  update(id: string, data: unknown): Promise<WOrkingZoneResponseDto>;
  delete(id: string): Promise<void>;
}
