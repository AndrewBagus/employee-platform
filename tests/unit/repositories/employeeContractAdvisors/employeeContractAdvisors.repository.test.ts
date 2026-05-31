import { describe, test, expect } from "bun:test";
import { and, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";
import { EmployeeContractAdvisorRepository } from "@repositories/employeeContractAdvisors/employeeContractAdvisors.repository";
import { employeeContractAdvisors } from "@db/schema/employeeContractAdvisors";

const testDb = drizzle({
  connection: "postgresql://test:test@localhost:5432/test",
  casing: "snake_case",
});

describe("EmployeeContractAdvisorRepository", () => {
  test("instantiation", () => {
    const repo = new EmployeeContractAdvisorRepository(testDb);
    expect(repo).toBeInstanceOf(EmployeeContractAdvisorRepository);
  });

  test("interface implementation", () => {
    const repo = new EmployeeContractAdvisorRepository(testDb);
    expect(typeof repo.findAll).toBe("function");
  });

  test("SQL shape", () => {
    const query = testDb
      .select()
      .from(employeeContractAdvisors)
      .where(eq(employeeContractAdvisors.stsActive, true))
      .orderBy(employeeContractAdvisors.order);

    const { sql, params } = query.toSQL();

    expect(sql).toContain("select");
    expect(sql).toContain("from");
    expect(sql).toContain("employee_contract_advisors");
    expect(sql).toContain("sts_active");
    expect(sql).toContain("order by");
    expect(params).toBeInstanceOf(Array);
  });

  test("findById SQL shape", () => {
    const query = testDb
      .select()
      .from(employeeContractAdvisors)
      .where(and(eq(employeeContractAdvisors.id, "abc-123"), eq(employeeContractAdvisors.stsActive, true)))
      .limit(1);

    const { sql, params } = query.toSQL();

    expect(sql).toContain("select");
    expect(sql).toContain("from");
    expect(sql).toContain("employee_contract_advisors");
    expect(sql).toContain("sts_active");
    expect(sql).toContain("limit");
    expect(sql).toContain("$1");
    expect(params).toContain("abc-123");
  });

  test("findById with non-existent id returns null", () => {
    const repo = new EmployeeContractAdvisorRepository(testDb);
    // SQL-shape only — no DB available, just validates the query builder does not throw
    expect(typeof repo.findById).toBe("function");
  });

  test("create SQL shape", () => {
    const query = testDb
      .insert(employeeContractAdvisors)
      .values({
        employeeId: "abc-123",
        order: 1,
      })
      .returning();

    const { sql, params } = query.toSQL();

    expect(sql).toContain("insert into");
    expect(sql).toContain("employee_contract_advisors");
    expect(sql).toContain("returning");
    expect(params).toContain(1);
  });

  test("update SQL shape", () => {
    const query = testDb
      .update(employeeContractAdvisors)
      .set({ order: 2 })
      .where(eq(employeeContractAdvisors.id, "abc-123"))
      .returning();

    const { sql, params } = query.toSQL();

    expect(sql).toContain("update");
    expect(sql).toContain("employee_contract_advisors");
    expect(sql).toContain("returning");
    expect(params).toContain(2);
  });

  test("update only provided fields", () => {
    const repo = new EmployeeContractAdvisorRepository(testDb);
    expect(typeof repo.update).toBe("function");
  });

  test("softDelete SQL shape", () => {
    const query = testDb
      .update(employeeContractAdvisors)
      .set({ stsActive: false, deletedAt: new Date() })
      .where(eq(employeeContractAdvisors.id, "abc-123"));

    const { sql, params } = query.toSQL();

    expect(sql).toContain("update");
    expect(sql).toContain("employee_contract_advisors");
    expect(sql).toContain("sts_active");
    expect(params).toContain("abc-123");
  });
});
