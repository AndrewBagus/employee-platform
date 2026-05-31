import type { CompanyResponseDto } from "@dtos/company.dto";

export interface CompanyRepositoryInterface {
  findAll(): Promise<CompanyResponseDto[]>;
}
