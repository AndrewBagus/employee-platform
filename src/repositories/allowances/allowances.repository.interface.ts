import type { ALlowanceResponseDto, CreateALlowanceDto, UpdateALlowanceDto } from "@dtos/allowance.dto";

export interface AllowanceRepositoryInterface {
  findAll(): Promise<ALlowanceResponseDto[]>;
  findById(id: string): Promise<ALlowanceResponseDto | null>;
  create(data: CreateALlowanceDto): Promise<ALlowanceResponseDto>;
  update(id: string, data: UpdateALlowanceDto): Promise<ALlowanceResponseDto | null>;
  softDelete(id: string): Promise<void>;
}
