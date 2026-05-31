import type { EmployeeWorkZoneResponseDto, CreateEmployeeWorkZoneDto, UpdateEmployeeWorkZoneDto } from "@dtos/employeeWorkZone.dto";

export interface EmployeeWorkZoneRepositoryInterface {
  findAll(): Promise<EmployeeWorkZoneResponseDto[]>;
  findById(id: string): Promise<EmployeeWorkZoneResponseDto | null>;
  create(data: CreateEmployeeWorkZoneDto): Promise<EmployeeWorkZoneResponseDto>;
  update(id: string, data: UpdateEmployeeWorkZoneDto): Promise<EmployeeWorkZoneResponseDto | null>;
  softDelete(id: string): Promise<void>;
}
