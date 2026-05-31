import { describe, test, expect } from "bun:test";
import { employeeProjects } from "@db/schema/employeeProjects";

describe("employeeProjects Repository Schema", () => {
  test("has employeeId column", () => {
    expect(employeeProjects).toHaveProperty("employeeId");
  });

  test("has projectId column", () => {
    expect(employeeProjects).toHaveProperty("projectId");
  });

  test("has stsActive column", () => {
    expect(employeeProjects).toHaveProperty("stsActive");
  });

  test("has deletedAt column", () => {
    expect(employeeProjects).toHaveProperty("deletedAt");
  });

  test("table name is employee_projects", () => {
    expect(employeeProjects[Symbol.for("drizzle:Name")]).toBe("employee_projects");
  });
});
