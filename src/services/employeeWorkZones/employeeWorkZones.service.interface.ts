import type { EmployeeWorkZoneResponseDto, CreateEmployeeWorkZoneDto, UpdateEmployeeWorkZoneDto } from "@dtos/employeeWorkZone.dto";

export interface EmployeeWorkZoneServiceInterface {
  findAll(): Promise<EmployeeWorkZoneResponseDto[]>;
  findById(id: string): Promise<EmployeeWorkZoneResponseDto | null>;
  create(data: unknown): Promise<EmployeeWorkZoneResponseDto>;
  update(id: string, data: unknown): Promise<EmployeeWorkZoneResponseDto>;
  delete(id: string): Promise<void>;
}
