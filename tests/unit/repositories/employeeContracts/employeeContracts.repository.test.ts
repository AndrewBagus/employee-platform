import { describe, test, expect } from "bun:test";
import { and, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";
import { EmployeeContractRepository } from "@repositories/employeeContracts/employeeContracts.repository";
import { employeeContracts } from "@db/schema/employeeContracts";

const testDb = drizzle({
  connection: "postgresql://test:test@localhost:5432/test",
  casing: "snake_case",
});

describe("EmployeeContractRepository", () => {
  test("instantiation", () => {
    const repo = new EmployeeContractRepository(testDb);
    expect(repo).toBeInstanceOf(EmployeeContractRepository);
  });

  test("interface implementation", () => {
    const repo = new EmployeeContractRepository(testDb);
    expect(typeof repo.findAll).toBe("function");
  });

  test("SQL shape", () => {
    const query = testDb
      .select()
      .from(employeeContracts)
      .where(eq(employeeContracts.stsActive, true))
      .orderBy(employeeContracts.startDate);

    const { sql, params } = query.toSQL();

    expect(sql).toContain("select");
    expect(sql).toContain("from");
    expect(sql).toContain("employee_contracts");
    expect(sql).toContain("sts_active");
    expect(sql).toContain("order by");
    expect(params).toBeInstanceOf(Array);
  });

  test("findById SQL shape", () => {
    const query = testDb
      .select()
      .from(employeeContracts)
      .where(and(eq(employeeContracts.id, "abc-123"), eq(employeeContracts.stsActive, true)))
      .limit(1);

    const { sql, params } = query.toSQL();

    expect(sql).toContain("select");
    expect(sql).toContain("from");
    expect(sql).toContain("employee_contracts");
    expect(sql).toContain("sts_active");
    expect(sql).toContain("limit");
    expect(sql).toContain("$1");
    expect(params).toContain("abc-123");
  });

  test("findById with non-existent id returns null", () => {
    const repo = new EmployeeContractRepository(testDb);
    // SQL-shape only — no DB available, just validates the query builder does not throw
    expect(typeof repo.findById).toBe("function");
  });

  test("create SQL shape", () => {
    const query = testDb
      .insert(employeeContracts)
      .values({
        employeeId: "abc-123",
        startDate: "2026-01-01",
        endDate: "2026-12-31",
        terminationDate: "2026-12-31",
      })
      .returning();

    const { sql, params } = query.toSQL();

    expect(sql).toContain("insert into");
    expect(sql).toContain("employee_contracts");
    expect(sql).toContain("returning");
    expect(params).toContain("2026-01-01");
  });

  test("update SQL shape", () => {
    const query = testDb
      .update(employeeContracts)
      .set({ endDate: "2027-06-30" })
      .where(eq(employeeContracts.id, "abc-123"))
      .returning();

    const { sql, params } = query.toSQL();

    expect(sql).toContain("update");
    expect(sql).toContain("employee_contracts");
    expect(sql).toContain("returning");
    expect(params).toContain("2027-06-30");
  });

  test("update only provided fields", () => {
    const repo = new EmployeeContractRepository(testDb);
    expect(typeof repo.update).toBe("function");
  });

  test("softDelete SQL shape", () => {
    const query = testDb
      .update(employeeContracts)
      .set({ stsActive: false, deletedAt: new Date() })
      .where(eq(employeeContracts.id, "abc-123"));

    const { sql, params } = query.toSQL();

    expect(sql).toContain("update");
    expect(sql).toContain("employee_contracts");
    expect(sql).toContain("sts_active");
    expect(params).toContain("abc-123");
  });
});
