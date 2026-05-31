import { describe, test, expect, mock } from "bun:test";
import { Hono } from "hono";
import { container } from "@cores/container";
import { TYPES } from "@cores/types";

describe("ProjectController", () => {
  test("GET /:id returns 404 when not found", async () => {
    const mockService = {
      findAll: mock(() => Promise.resolve([])),
      findById: mock((_id: string) => Promise.resolve(null)),
      create: mock((_data: unknown) => Promise.resolve({})),
      update: mock((_id: string, _data: unknown) => Promise.resolve({})),
      delete: mock((_id: string) => Promise.resolve()),
    };

    container.rebind(TYPES.ProjectServiceInterface).toConstantValue(mockService);
    const { default: ctrl } = await import(
      "../../../src/controllers/project.controller.ts?t=" + Date.now()
    );
    const app = new Hono().route("/", ctrl);

    const res = await app.request("/nonexistent");

    expect(res.status).toBe(404);
    const body = await res.json();
    expect(body).toMatchObject({
      success: false,
      data: null,
      message: expect.stringContaining("not found"),
    });
    expect(mockService.findById).toHaveBeenCalledWith("nonexistent");
  });
});
