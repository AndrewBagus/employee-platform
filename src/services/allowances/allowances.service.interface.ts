import type { ALlowanceResponseDto, CreateALlowanceDto, UpdateALlowanceDto } from "@dtos/allowance.dto";

export interface AllowanceServiceInterface {
  findAll(): Promise<ALlowanceResponseDto[]>;
  findById(id: string): Promise<ALlowanceResponseDto | null>;
  create(data: unknown): Promise<ALlowanceResponseDto>;
  update(id: string, data: unknown): Promise<ALlowanceResponseDto>;
  delete(id: string): Promise<void>;
}
