import { describe, test, expect } from "bun:test";
import { employeeMcus } from "@db/schema/employeeMcus";

describe("employeeMcus Repository Schema", () => {
  test("has id column", () => {
    expect(employeeMcus).toHaveProperty("id");
  });

  test("has stsActive column", () => {
    expect(employeeMcus).toHaveProperty("stsActive");
  });

  test("has deletedAt column", () => {
    expect(employeeMcus).toHaveProperty("deletedAt");
  });

  test("table name is employee_mcus", () => {
    expect((employeeMcus as any)[Symbol.for("drizzle:Name")]).toBe("employee_mcus");
  });
});
