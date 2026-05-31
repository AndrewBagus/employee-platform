import type { WorkingZoneResponseDto, CreateWorkingZoneDto, UpdateWorkingZoneDto } from "@dtos/workingZone.dto";

export interface WorkingZoneServiceInterface {
  findAll(): Promise<WorkingZoneResponseDto[]>;
  findById(id: string): Promise<WorkingZoneResponseDto | null>;
  create(data: unknown): Promise<WorkingZoneResponseDto>;
  update(id: string, data: unknown): Promise<WorkingZoneResponseDto>;
  delete(id: string): Promise<void>;
}
