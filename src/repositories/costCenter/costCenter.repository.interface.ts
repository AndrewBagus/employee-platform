import type { CostCenterResponseDto, CreateCostCenterDto, UpdateCostCenterDto } from "@dtos/costCenter.dto";

export interface CostCenterRepositoryInterface {
  findAll(): Promise<CostCenterResponseDto[]>;
  findById(id: string): Promise<CostCenterResponseDto | null>;
  create(data: CreateCostCenterDto): Promise<CostCenterResponseDto>;
  update(id: string, data: UpdateCostCenterDto): Promise<CostCenterResponseDto | null>;
  softDelete(id: string): Promise<void>;
}
