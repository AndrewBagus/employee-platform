import { injectable, inject } from "inversify";
import { type NodePgDatabase } from "drizzle-orm/node-postgres";
import { TYPES } from "@cores/types";
import { BaseRepository } from "@repositories/base.repository";
import { companies } from "@db/schema/companies";
import type { CompanyResponseDto, CreateCompanyDto, UpdateCompanyDto } from "@dtos/company.dto";

@injectable()
export class CompanyRepository extends BaseRepository<
  typeof companies,
  CompanyResponseDto,
  CreateCompanyDto,
  UpdateCompanyDto
> {
  constructor(
    @inject(TYPES.Database) db: NodePgDatabase,
  ) {
    super(db, companies);
  }
}
