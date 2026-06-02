import type { CostCenterResponseDto, CreateCostCenterDto, UpdateCostCenterDto } from "@dtos/costCenter.dto";

export interface CostCenterServiceInterface {
  findAll(): Promise<CostCenterResponseDto[]>;
  findById(id: string): Promise<CostCenterResponseDto | null>;
  create(data: unknown): Promise<CostCenterResponseDto>;
  update(id: string, data: unknown): Promise<CostCenterResponseDto>;
  delete(id: string): Promise<void>;
}
