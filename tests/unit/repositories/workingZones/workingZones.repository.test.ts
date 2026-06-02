import { describe, test, expect } from "bun:test";
import { workingZones } from "@db/schema/workingZones";

describe("workingZones Repository Schema", () => {
  test("has id column", () => {
    expect(workingZones).toHaveProperty("id");
  });

  test("has stsActive column", () => {
    expect(workingZones).toHaveProperty("stsActive");
  });

  test("has deletedAt column", () => {
    expect(workingZones).toHaveProperty("deletedAt");
  });

  test("table name is working_zones", () => {
    expect((workingZones as any)[Symbol.for("drizzle:Name")]).toBe("working_zones");
  });
});
