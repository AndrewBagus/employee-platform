import { describe, test, expect } from "bun:test";
import { employeeWarnings } from "@db/schema/employeeWarnings";

describe("employeeWarnings Repository Schema", () => {
  test("has id column", () => {
    expect(employeeWarnings).toHaveProperty("id");
  });

  test("has stsActive column", () => {
    expect(employeeWarnings).toHaveProperty("stsActive");
  });

  test("has deletedAt column", () => {
    expect(employeeWarnings).toHaveProperty("deletedAt");
  });

  test("table name is employee_warnings", () => {
    expect(employeeWarnings[Symbol.for("drizzle:Name")]).toBe("employee_warnings");
  });
});
