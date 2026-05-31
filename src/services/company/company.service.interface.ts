import type { CompanyResponseDto } from "@dtos/company.dto";

export interface CompanyServiceInterface {
  findAll(): Promise<CompanyResponseDto[]>;
}
