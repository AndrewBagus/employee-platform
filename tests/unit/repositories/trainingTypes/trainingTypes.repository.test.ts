import { describe, test, expect } from "bun:test";
import { trainingTypes } from "@db/schema/trainingTypes";

describe("trainingTypes Repository Schema", () => {
  test("has id column", () => {
    expect(trainingTypes).toHaveProperty("id");
  });

  test("has stsActive column", () => {
    expect(trainingTypes).toHaveProperty("stsActive");
  });

  test("has deletedAt column", () => {
    expect(trainingTypes).toHaveProperty("deletedAt");
  });

  test("table name is training_types", () => {
    expect((trainingTypes as any)[Symbol.for("drizzle:Name")]).toBe("training_types");
  });
});
