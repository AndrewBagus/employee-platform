import { injectable, inject } from "inversify";
import type { NodePgDatabase } from "drizzle-orm/node-postgres";
import { eq } from "drizzle-orm";
import { TYPES } from "../../di/identifiers";
import type { ICompanyRepository } from "./interfaces/ICompanyRepository";
import { companies } from "../../db/schema/companies";
import type { CompanyResponseDto } from "./dtos/company.dto";

@injectable()
export class CompanyRepository implements ICompanyRepository {
  constructor(
    @inject(TYPES.Database) private readonly db: NodePgDatabase,
  ) {}

  async findAll(): Promise<CompanyResponseDto[]> {
    const rows = await this.db
      .select()
      .from(companies)
      .where(eq(companies.stsActive, true))
      .orderBy(companies.name);

    return rows as CompanyResponseDto[];
  }
}
