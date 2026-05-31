import type { EMployeeWorkZoneResponseDto, CreateEMployeeWorkZoneDto, UpdateEMployeeWorkZoneDto } from "@dtos/employeeWorkZone.dto";

export interface EmployeeWorkZoneRepositoryInterface {
  findAll(): Promise<EMployeeWorkZoneResponseDto[]>;
  findById(id: string): Promise<EMployeeWorkZoneResponseDto | null>;
  create(data: CreateEMployeeWorkZoneDto): Promise<EMployeeWorkZoneResponseDto>;
  update(id: string, data: UpdateEMployeeWorkZoneDto): Promise<EMployeeWorkZoneResponseDto | null>;
  softDelete(id: string): Promise<void>;
}
