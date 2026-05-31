import { describe, test, expect } from "bun:test";
import { employeeWorkZones } from "@db/schema/employeeWorkZones";

describe("employeeWorkZones Repository Schema", () => {
  test("has id column", () => {
    expect(employeeWorkZones).toHaveProperty("id");
  });

  test("has stsActive column", () => {
    expect(employeeWorkZones).toHaveProperty("stsActive");
  });

  test("has deletedAt column", () => {
    expect(employeeWorkZones).toHaveProperty("deletedAt");
  });

  test("table name is employee_work_zones", () => {
    expect((employeeWorkZones as any)[Symbol.for("drizzle:Name")]).toBe("employee_work_zones");
  });
});
