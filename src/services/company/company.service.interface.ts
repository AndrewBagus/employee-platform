import type { CompanyResponseDto, CreateCompanyDto, UpdateCompanyDto } from "@dtos/company.dto";

export interface CompanyServiceInterface {
  findAll(): Promise<CompanyResponseDto[]>;
  findById(id: string): Promise<CompanyResponseDto | null>;
  create(data: unknown): Promise<CompanyResponseDto>;
  update(id: string, data: unknown): Promise<CompanyResponseDto>;
  delete(id: string): Promise<void>;
}
