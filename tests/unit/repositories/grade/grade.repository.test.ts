import { describe, test, expect } from "bun:test";
import { grades } from "@db/schema/grades";

describe("grade Repository Schema", () => {
  test("has id column", () => {
    expect(grades).toHaveProperty("id");
  });

  test("has stsActive column", () => {
    expect(grades).toHaveProperty("stsActive");
  });

  test("has deletedAt column", () => {
    expect(grades).toHaveProperty("deletedAt");
  });

  test("table name is grades", () => {
    expect(grades[Symbol.for("drizzle:Name")]).toBe("grades");
  });
});
