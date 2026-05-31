import { describe, test, expect } from "bun:test";
import { positions } from "@db/schema/positions";

describe("positions Repository Schema", () => {
  test("has id column", () => {
    expect(positions).toHaveProperty("id");
  });

  test("has stsActive column", () => {
    expect(positions).toHaveProperty("stsActive");
  });

  test("has deletedAt column", () => {
    expect(positions).toHaveProperty("deletedAt");
  });

  test("table name is positions", () => {
    expect((positions as any)[Symbol.for("drizzle:Name")]).toBe("positions");
  });
});
