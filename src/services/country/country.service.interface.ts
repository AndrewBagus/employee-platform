import type { CountryResponseDto, CreateCountryDto, UpdateCountryDto } from "@dtos/country.dto";

export interface CountryServiceInterface {
  findAll(): Promise<CountryResponseDto[]>;
  findById(id: string): Promise<CountryResponseDto | null>;
  create(data: unknown): Promise<CountryResponseDto>;
  update(id: string, data: unknown): Promise<CountryResponseDto>;
  delete(id: string): Promise<void>;
}
