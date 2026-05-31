import { describe, test, expect } from "bun:test";
import { religion } from "@db/schema/religion";

describe("religion Repository Schema", () => {
  test("has id column", () => {
    expect(religion).toHaveProperty("id");
  });

  test("has stsActive column", () => {
    expect(religion).toHaveProperty("stsActive");
  });

  test("has deletedAt column", () => {
    expect(religion).toHaveProperty("deletedAt");
  });

  test("table name is religion", () => {
    expect((religion as any)[Symbol.for("drizzle:Name")]).toBe("religion");
  });
});
