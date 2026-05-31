import type { ReligionResponseDto, CreateReligionDto, UpdateReligionDto } from "@dtos/religion.dto";

export interface ReligionRepositoryInterface {
  findAll(): Promise<ReligionResponseDto[]>;
  findById(id: string): Promise<ReligionResponseDto | null>;
  create(data: CreateReligionDto): Promise<ReligionResponseDto>;
  update(id: string, data: UpdateReligionDto): Promise<ReligionResponseDto | null>;
  softDelete(id: string): Promise<void>;
}
