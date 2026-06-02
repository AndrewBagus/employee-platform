import type { ReligionResponseDto, CreateReligionDto, UpdateReligionDto } from "@dtos/religion.dto";

export interface ReligionServiceInterface {
  findAll(): Promise<ReligionResponseDto[]>;
  findById(id: string): Promise<ReligionResponseDto | null>;
  create(data: unknown): Promise<ReligionResponseDto>;
  update(id: string, data: unknown): Promise<ReligionResponseDto>;
  delete(id: string): Promise<void>;
}
