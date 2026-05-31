import type { CompanyResponseDto } from "@dtos/company.dto";
import type { CreateCompanyDto, UpdateCompanyDto } from "@dtos/company.dto";


export interface CompanyRepositoryInterface {
  findAll(): Promise<CompanyResponseDto[]>;
  findById(id: string): Promise<CompanyResponseDto | null>;
  create(data: CreateCompanyDto): Promise<CompanyResponseDto>;
  update(id: string, data: UpdateCompanyDto): Promise<CompanyResponseDto | null>;
  softDelete(id: string): Promise<void>;
}
