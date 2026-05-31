import { injectable, inject } from "inversify";
import type { NodePgDatabase } from "drizzle-orm/node-postgres";
import { and, eq, sql } from "drizzle-orm";
import { TYPES } from "@cores/types";
import type { CompanyRepositoryInterface } from "./company.repository.interface";
import { companies } from "@db/schema/companies";
import type { CompanyResponseDto, CreateCompanyDto, UpdateCompanyDto } from "@dtos/company.dto";

@injectable()
export class CompanyRepository implements CompanyRepositoryInterface {
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

  async findById(id: string): Promise<CompanyResponseDto | null> {
    const rows = await this.db
      .select()
      .from(companies)
      .where(and(eq(companies.id, id), eq(companies.stsActive, true)))
      .limit(1);

    return (rows[0] as CompanyResponseDto) ?? null;
  }

  async create(data: CreateCompanyDto): Promise<CompanyResponseDto> {
    const rows = await this.db
      .insert(companies)
      .values({
        name: data.name,
        nameShort: data.nameShort ?? null,
        type: data.type,
        countryId: data.countryId,
        haveWorkerEmployee: data.haveWorkerEmployee ?? false,
        isLdap: data.isLdap ?? false,
      })
      .returning();

    return rows[0] as CompanyResponseDto;
  }

  async update(id: string, data: UpdateCompanyDto): Promise<CompanyResponseDto | null> {
    // Filter to only fields that are actually provided (not undefined)
    const updateData: Record<string, unknown> = {};
    if (data.name !== undefined) updateData.name = data.name;
    if (data.nameShort !== undefined) updateData.nameShort = data.nameShort;
    if (data.type !== undefined) updateData.type = data.type;
    if (data.countryId !== undefined) updateData.countryId = data.countryId;
    if (data.haveWorkerEmployee !== undefined) updateData.haveWorkerEmployee = data.haveWorkerEmployee;
    if (data.isLdap !== undefined) updateData.isLdap = data.isLdap;

    const rows = await this.db
      .update(companies)
      .set(updateData)
      .where(eq(companies.id, id))
      .returning();

    return (rows[0] as CompanyResponseDto) ?? null;
  }

  async softDelete(id: string): Promise<void> {
    await this.db
      .update(companies)
      .set({
        stsActive: false,
        deletedAt: sql`now()`,
      })
      .where(eq(companies.id, id));
  }
}
