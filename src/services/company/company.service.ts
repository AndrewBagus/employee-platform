import { injectable, inject } from "inversify";
import { TYPES } from "../../cores/types";
import type { CompanyServiceInterface } from "./company.service.interface";
import type { CompanyRepositoryInterface } from "../repositories/company/company.repository.interface";
import type { CompanyResponseDto } from "../../dtos/company.dto";

@injectable()
export class CompanyService implements CompanyServiceInterface {
  constructor(
    @inject(TYPES.CompanyRepositoryInterface) private readonly repository: CompanyRepositoryInterface,
  ) {}

  async findAll(): Promise<CompanyResponseDto[]> {
    return this.repository.findAll();
  }
}
