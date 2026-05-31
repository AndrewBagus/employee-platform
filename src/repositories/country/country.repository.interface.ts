import type { CountryResponseDto, CreateCountryDto, UpdateCountryDto } from "@dtos/country.dto";

export interface CountryRepositoryInterface {
  findAll(): Promise<CountryResponseDto[]>;
  findById(id: string): Promise<CountryResponseDto | null>;
  create(data: CreateCountryDto): Promise<CountryResponseDto>;
  update(id: string, data: UpdateCountryDto): Promise<CountryResponseDto | null>;
  softDelete(id: string): Promise<void>;
}
