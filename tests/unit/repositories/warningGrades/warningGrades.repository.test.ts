import { describe, test, expect } from "bun:test";
import { warningGrades } from "@db/schema/warningGrades";

describe("warningGrades Repository Schema", () => {
  test("has id column", () => {
    expect(warningGrades).toHaveProperty("id");
  });

  test("has stsActive column", () => {
    expect(warningGrades).toHaveProperty("stsActive");
  });

  test("has deletedAt column", () => {
    expect(warningGrades).toHaveProperty("deletedAt");
  });

  test("table name is warning_grades", () => {
    expect(warningGrades[Symbol.for("drizzle:Name")]).toBe("warning_grades");
  });
});
