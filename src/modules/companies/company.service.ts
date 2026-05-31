import { injectable, inject } from "inversify";
import { TYPES } from "../../di/identifiers";
import type { ICompanyService } from "./interfaces/ICompanyService";
import type { ICompanyRepository } from "./interfaces/ICompanyRepository";
import type { CompanyResponseDto } from "./dtos/company.dto";

@injectable()
export class CompanyService implements ICompanyService {
  constructor(
    @inject(TYPES.ICompanyRepository) private readonly repository: ICompanyRepository,
  ) {}

  async findAll(): Promise<CompanyResponseDto[]> {
    return this.repository.findAll();
  }
}
