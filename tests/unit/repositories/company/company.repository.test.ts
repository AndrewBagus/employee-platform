import { describe, test, expect } from "bun:test";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";
import { CompanyRepository } from "../../../../src/repositories/company/company.repository";
import type { CompanyRepositoryInterface } from "../../../../src/repositories/company/company.repository.interface";
import { companies } from "../../../../src/db/schema/companies";

const testDb = drizzle({
  connection: "postgresql://test:test@localhost:5432/test",
  casing: "snake_case",
});

describe("CompanyRepository", () => {
  test("instantiation", () => {
    const repo = new CompanyRepository(testDb);
    expect(repo).toBeInstanceOf(CompanyRepository);
  });

  test("interface implementation", () => {
    const repo = new CompanyRepository(testDb);
    expect(typeof (repo as CompanyRepositoryInterface).findAll).toBe("function");
  });

  test("SQL shape", () => {
    const query = testDb
      .select()
      .from(companies)
      .where(eq(companies.stsActive, true))
      .orderBy(companies.name);

    const { sql, params } = query.toSQL();

    expect(sql).toContain("select");
    expect(sql).toContain("from");
    expect(sql).toContain("companies");
    expect(sql).toContain("sts_active");
    expect(sql).toContain("order by");
    expect(params).toBeInstanceOf(Array);
  });
});
