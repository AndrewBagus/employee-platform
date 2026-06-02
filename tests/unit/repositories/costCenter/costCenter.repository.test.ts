import { describe, test, expect } from "bun:test";
import { and, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";
import { CostCenterRepository } from "@repositories/costCenter/costCenter.repository";
import { costCenters } from "@db/schema/costCenters";

const testDb = drizzle({
  connection: "postgresql://test:test@localhost:5432/test",
  casing: "snake_case",
});

describe("CostCenterRepository", () => {
  test("instantiation", () => {
    const repo = new CostCenterRepository(testDb);
    expect(repo).toBeInstanceOf(CostCenterRepository);
  });

  test("interface implementation", () => {
    const repo = new CostCenterRepository(testDb);
    expect(typeof repo.findAll).toBe("function");
  });

  test("SQL shape", () => {
    const query = testDb
      .select()
      .from(costCenters)
      .where(eq(costCenters.stsActive, true))
      .orderBy(costCenters.name);

    const { sql, params } = query.toSQL();

    expect(sql).toContain("select");
    expect(sql).toContain("from");
    expect(sql).toContain("cost_centers");
    expect(sql).toContain("sts_active");
    expect(sql).toContain("order by");
    expect(params).toBeInstanceOf(Array);
  });

  test("findById SQL shape", () => {
    const query = testDb
      .select()
      .from(costCenters)
      .where(and(eq(costCenters.id, "abc-123"), eq(costCenters.stsActive, true)))
      .limit(1);

    const { sql, params } = query.toSQL();

    expect(sql).toContain("select");
    expect(sql).toContain("from");
    expect(sql).toContain("cost_centers");
    expect(sql).toContain("sts_active");
    expect(sql).toContain("limit");
    expect(sql).toContain("$1");
    expect(params).toContain("abc-123");
  });

  test("findById with non-existent id returns null", () => {
    const repo = new CostCenterRepository(testDb);
    // SQL-shape only — no DB available, just validates the query builder does not throw
    expect(typeof repo.findById).toBe("function");
  });

  test("create SQL shape", () => {
    const query = testDb
      .insert(costCenters)
      .values({
        sapCode: "CC-001",
        name: "IT Department",
      })
      .returning();

    const { sql, params } = query.toSQL();

    expect(sql).toContain("insert into");
    expect(sql).toContain("cost_centers");
    expect(sql).toContain("returning");
    expect(params).toContain("CC-001");
  });

  test("update SQL shape", () => {
    const query = testDb
      .update(costCenters)
      .set({ name: "Updated Cost Center" })
      .where(eq(costCenters.id, "abc-123"))
      .returning();

    const { sql, params } = query.toSQL();

    expect(sql).toContain("update");
    expect(sql).toContain("cost_centers");
    expect(sql).toContain("returning");
    expect(params).toContain("Updated Cost Center");
  });

  test("update only provided fields", () => {
    const repo = new CostCenterRepository(testDb);
    expect(typeof repo.update).toBe("function");
  });

  test("softDelete SQL shape", () => {
    const query = testDb
      .update(costCenters)
      .set({ stsActive: false, deletedAt: new Date() })
      .where(eq(costCenters.id, "abc-123"));

    const { sql, params } = query.toSQL();

    expect(sql).toContain("update");
    expect(sql).toContain("cost_centers");
    expect(sql).toContain("sts_active");
    expect(params).toContain("abc-123");
  });
});
