import type { AllowanceResponseDto, CreateAllowanceDto, UpdateAllowanceDto } from "@dtos/allowance.dto";

export interface AllowanceServiceInterface {
  findAll(): Promise<AllowanceResponseDto[]>;
  findById(id: string): Promise<AllowanceResponseDto | null>;
  create(data: unknown): Promise<AllowanceResponseDto>;
  update(id: string, data: unknown): Promise<AllowanceResponseDto>;
  delete(id: string): Promise<void>;
}
