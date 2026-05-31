import { describe, test, expect, mock } from "bun:test";
import { Hono } from "hono";
import { container } from "@cores/container";
import { TYPES } from "@cores/types";
import type { CompanyServiceInterface } from "@services/company/company.service.interface";
import type { CompanyResponseDto } from "@dtos/company.dto";

describe("CompanyController", () => {
  test("GET / returns companies successfully", async () => {
    const mockService: CompanyServiceInterface = {
      findAll: mock(() => Promise.resolve<CompanyResponseDto[]>([])),
    };

    container.rebind<CompanyServiceInterface>(TYPES.CompanyServiceInterface).toConstantValue(mockService);

    // Dynamic import required: controller resolves service from container at module load time,
    // so we must rebind before the module evaluates.
    const { default: companyController } = await import("../../../src/controllers/company.controller");

    const app = new Hono().route("/", companyController);

    const res = await app.request("/");

    expect(res.status).toBe(200);

    const body = await res.json();
    expect(body).toMatchObject({
      success: true,
      data: [],
      message: "Companies retrieved successfully",
    });

    expect(mockService.findAll).toHaveBeenCalledTimes(1);
  });
});
