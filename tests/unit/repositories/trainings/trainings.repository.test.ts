import { describe, test, expect } from "bun:test";
import { trainings } from "@db/schema/trainings";

describe("trainings Repository Schema", () => {
  test("has id column", () => {
    expect(trainings).toHaveProperty("id");
  });

  test("has stsActive column", () => {
    expect(trainings).toHaveProperty("stsActive");
  });

  test("has deletedAt column", () => {
    expect(trainings).toHaveProperty("deletedAt");
  });

  test("table name is trainings", () => {
    expect((trainings as any)[Symbol.for("drizzle:Name")]).toBe("trainings");
  });
});
