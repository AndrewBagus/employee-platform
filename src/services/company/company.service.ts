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
import type { CompanyRepositoryInterface } from "@repositories/company/company.repository.interface";
import type { CompanyServiceInterface } from "./company.service.interface";

@injectable()
export class CompanyService
  extends BaseService<CompanyResponseDto, CreateCompanyDto, UpdateCompanyDto, CompanyRepositoryInterface>
  implements CompanyServiceInterface
{
  constructor(
    @inject(TYPES.CompanyRepositoryInterface) repository: CompanyRepositoryInterface,
  ) {
    super(repository, CreateCompanySchema, UpdateCompanySchema, "Company");
  }
}
