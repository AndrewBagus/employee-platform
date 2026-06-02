import { describe, test, expect } from "bun:test";
import { projects } from "@db/schema/projects";

describe("project Repository Schema", () => {
  test("has id column", () => {
    expect(projects).toHaveProperty("id");
  });

  test("has stsActive column", () => {
    expect(projects).toHaveProperty("stsActive");
  });

  test("has deletedAt column", () => {
    expect(projects).toHaveProperty("deletedAt");
  });

  test("table name is projects", () => {
    expect((projects as any)[Symbol.for("drizzle:Name")]).toBe("projects");
  });
});
