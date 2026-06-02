import type { AllowanceResponseDto, CreateAllowanceDto, UpdateAllowanceDto } from "@dtos/allowance.dto";

export interface AllowanceRepositoryInterface {
  findAll(): Promise<AllowanceResponseDto[]>;
  findById(id: string): Promise<AllowanceResponseDto | null>;
  create(data: CreateAllowanceDto): Promise<AllowanceResponseDto>;
  update(id: string, data: UpdateAllowanceDto): Promise<AllowanceResponseDto | null>;
  softDelete(id: string): Promise<void>;
}
