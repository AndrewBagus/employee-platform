import type { WorkingZoneResponseDto, CreateWorkingZoneDto, UpdateWorkingZoneDto } from "@dtos/workingZone.dto";

export interface WorkingZoneRepositoryInterface {
  findAll(): Promise<WorkingZoneResponseDto[]>;
  findById(id: string): Promise<WorkingZoneResponseDto | null>;
  create(data: CreateWorkingZoneDto): Promise<WorkingZoneResponseDto>;
  update(id: string, data: UpdateWorkingZoneDto): Promise<WorkingZoneResponseDto | null>;
  softDelete(id: string): Promise<void>;
}
