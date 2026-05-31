import type { CompanyResponseDto } from "../dtos/company.dto";

export interface ICompanyService {
  findAll(): Promise<CompanyResponseDto[]>;
}
