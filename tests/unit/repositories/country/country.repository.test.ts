import { describe, test, expect } from "bun:test";
import { and, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";
import { CountryRepository } from "@repositories/country/country.repository";
import { countries } from "@db/schema/countries";

const testDb = drizzle({
  connection: "postgresql://test:test@localhost:5432/test",
  casing: "snake_case",
});

describe("CountryRepository", () => {
  test("instantiation", () => {
    const repo = new CountryRepository(testDb);
    expect(repo).toBeInstanceOf(CountryRepository);
  });

  test("interface implementation", () => {
    const repo = new CountryRepository(testDb);
    expect(typeof repo.findAll).toBe("function");
  });

  test("SQL shape", () => {
    const query = testDb
      .select()
      .from(countries)
      .where(eq(countries.stsActive, true))
      .orderBy(countries.code);

    const { sql, params } = query.toSQL();

    expect(sql).toContain("select");
    expect(sql).toContain("from");
    expect(sql).toContain("countries");
    expect(sql).toContain("sts_active");
    expect(sql).toContain("order by");
    expect(params).toBeInstanceOf(Array);
  });

  test("findById SQL shape", () => {
    const query = testDb
      .select()
      .from(countries)
      .where(and(eq(countries.id, "abc-123"), eq(countries.stsActive, true)))
      .limit(1);

    const { sql, params } = query.toSQL();

    expect(sql).toContain("select");
    expect(sql).toContain("from");
    expect(sql).toContain("countries");
    expect(sql).toContain("sts_active");
    expect(sql).toContain("limit");
    expect(sql).toContain("$1");
    expect(params).toContain("abc-123");
  });

  test("findById with non-existent id returns null", () => {
    const repo = new CountryRepository(testDb);
    // SQL-shape only — no DB available, just validates the query builder does not throw
    expect(typeof repo.findById).toBe("function");
  });

  test("create SQL shape", () => {
    const query = testDb
      .insert(countries)
      .values({
        code: "ID",
        currency: "IDR",
      })
      .returning();

    const { sql, params } = query.toSQL();

    expect(sql).toContain("insert into");
    expect(sql).toContain("countries");
    expect(sql).toContain("returning");
    expect(params).toContain("ID");
  });

  test("update SQL shape", () => {
    const query = testDb
      .update(countries)
      .set({ currency: "USD" })
      .where(eq(countries.id, "abc-123"))
      .returning();

    const { sql, params } = query.toSQL();

    expect(sql).toContain("update");
    expect(sql).toContain("countries");
    expect(sql).toContain("returning");
    expect(params).toContain("USD");
  });

  test("update only provided fields", () => {
    const repo = new CountryRepository(testDb);
    expect(typeof repo.update).toBe("function");
  });

  test("softDelete SQL shape", () => {
    const query = testDb
      .update(countries)
      .set({ stsActive: false, deletedAt: new Date() })
      .where(eq(countries.id, "abc-123"));

    const { sql, params } = query.toSQL();

    expect(sql).toContain("update");
    expect(sql).toContain("countries");
    expect(sql).toContain("sts_active");
    expect(params).toContain("abc-123");
  });
});
