import { describe, test, expect } from "bun:test";
import { employeeLeaveAdvisors } from "@db/schema/employeeLeaveAdvisors";

describe("employeeLeaveAdvisors Repository Schema", () => {
  test("has id column", () => {
    expect(employeeLeaveAdvisors).toHaveProperty("id");
  });

  test("has stsActive column", () => {
    expect(employeeLeaveAdvisors).toHaveProperty("stsActive");
  });

  test("has deletedAt column", () => {
    expect(employeeLeaveAdvisors).toHaveProperty("deletedAt");
  });

  test("table name is employee_leave_advisors", () => {
    expect(employeeLeaveAdvisors[Symbol.for("drizzle:Name")]).toBe("employee_leave_advisors");
  });
});
