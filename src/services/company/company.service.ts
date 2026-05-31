import { injectable, inject } from "inversify";
import { TYPES } from "@cores/types";
import { BaseService } from "@services/base.service";
import {
  CreateCompanySchema,
  UpdateCompanySchema,
  type CompanyResponseDto,
  type CreateCompanyDto,
  type UpdateCompanyDto,
} from "@dtos/company.dto";
import type { CompanyRepository } from "@repositories/company/company.repository";

@injectable()
export class CompanyService extends BaseService<
  CompanyResponseDto,
  CreateCompanyDto,
  UpdateCompanyDto,
  CompanyRepository
> {
  constructor(
    @inject(TYPES.CompanyRepositoryInterface) repository: CompanyRepository,
  ) {
    super(repository, CreateCompanySchema, UpdateCompanySchema, "Company");
  }
}
