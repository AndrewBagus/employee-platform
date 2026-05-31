import { describe, test, expect } from "bun:test";
import { trainingSchedules } from "@db/schema/trainingSchedules";

describe("trainingSchedules Repository Schema", () => {
  test("has id column", () => {
    expect(trainingSchedules).toHaveProperty("id");
  });

  test("has stsActive column", () => {
    expect(trainingSchedules).toHaveProperty("stsActive");
  });

  test("has deletedAt column", () => {
    expect(trainingSchedules).toHaveProperty("deletedAt");
  });

  test("table name is training_schedules", () => {
    expect((trainingSchedules as any)[Symbol.for("drizzle:Name")]).toBe("training_schedules");
  });
});
