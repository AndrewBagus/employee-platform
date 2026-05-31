import type { CompanyResponseDto } from "../dtos/company.dto";

export interface ICompanyRepository {
  findAll(): Promise<CompanyResponseDto[]>;
}
