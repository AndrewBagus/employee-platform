import { describe, test, expect } from "bun:test";
import { employeeTrainings } from "@db/schema/employeeTrainings";

describe("employeeTrainings Repository Schema", () => {
  test("has id column", () => {
    expect(employeeTrainings).toHaveProperty("id");
  });

  test("has stsActive column", () => {
    expect(employeeTrainings).toHaveProperty("stsActive");
  });

  test("has deletedAt column", () => {
    expect(employeeTrainings).toHaveProperty("deletedAt");
  });

  test("table name is employee_trainings", () => {
    expect(employeeTrainings[Symbol.for("drizzle:Name")]).toBe("employee_trainings");
  });
});
