import { describe, test, expect } from "bun:test";
import { warnings } from "@db/schema/warnings";

describe("warnings Repository Schema", () => {
  test("has id column", () => {
    expect(warnings).toHaveProperty("id");
  });

  test("has stsActive column", () => {
    expect(warnings).toHaveProperty("stsActive");
  });

  test("has deletedAt column", () => {
    expect(warnings).toHaveProperty("deletedAt");
  });

  test("table name is warnings", () => {
    expect(warnings[Symbol.for("drizzle:Name")]).toBe("warnings");
  });
});
