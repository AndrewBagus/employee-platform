import type { EMployeeWorkZoneResponseDto, CreateEMployeeWorkZoneDto, UpdateEMployeeWorkZoneDto } from "@dtos/employeeWorkZone.dto";

export interface EmployeeWorkZoneServiceInterface {
  findAll(): Promise<EMployeeWorkZoneResponseDto[]>;
  findById(id: string): Promise<EMployeeWorkZoneResponseDto | null>;
  create(data: unknown): Promise<EMployeeWorkZoneResponseDto>;
  update(id: string, data: unknown): Promise<EMployeeWorkZoneResponseDto>;
  delete(id: string): Promise<void>;
}
