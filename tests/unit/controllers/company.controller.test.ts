import { describe, test, expect, mock } from "bun:test";
import { Hono } from "hono";
import { container } from "@cores/container";
import { TYPES } from "@cores/types";
import type { CompanyServiceInterface } from "@services/company/company.service.interface";
import type { CompanyResponseDto, CreateCompanyDto, UpdateCompanyDto } from "@dtos/company.dto";
import { AppError, ValidationError, NotFoundError } from "@cores/errors";

describe("CompanyController", () => {
  const makeMockService = (overrides?: Partial<CompanyServiceInterface>): CompanyServiceInterface => ({
    findAll: mock(() => Promise.resolve<CompanyResponseDto[]>([])),
    findById: mock((_id: string) => Promise.resolve<CompanyResponseDto | null>(null)),
    create: mock((_data: CreateCompanyDto) =>
      Promise.resolve<CompanyResponseDto>({
        id: "new-id",
        countryId: "c-1",
        name: "New Corp",
        nameShort: null,
        type: "CLIENT",
        haveWorkerEmployee: false,
        isLdap: false,
        stsActive: true,
        createdAt: new Date(),
        createdBy: null,
        updatedAt: null,
        updatedBy: null,
        deletedAt: null,
      }),
    ),
    update: mock((_id: string, _data: UpdateCompanyDto) =>
      Promise.resolve<CompanyResponseDto>({
        id: "existing-id",
        countryId: "c-1",
        name: "Updated Corp",
        nameShort: null,
        type: "CLIENT",
        haveWorkerEmployee: false,
        isLdap: false,
        stsActive: true,
        createdAt: new Date(),
        createdBy: null,
        updatedAt: null,
        updatedBy: null,
        deletedAt: null,
      }),
    ),
    delete: mock((_id: string) => Promise.resolve()),
    ...overrides,
  });

  // Helper to rebind mock service, re-evaluate controller module, and return [app, mockService]
  const setup = async (mockService: CompanyServiceInterface) => {
    container.rebind<CompanyServiceInterface>(TYPES.CompanyServiceInterface).toConstantValue(mockService);
    const { default: companyController } = await import("../../../src/controllers/company.controller");
    const app = new Hono().route("/", companyController);
    return { app };
  };

  test("GET / returns companies successfully", async () => {
    const mockService = makeMockService();
    const { app } = await setup(mockService);

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

  test("GET /:id returns 200 with company", async () => {
    const existing: CompanyResponseDto = {
      id: "abc-123",
      countryId: "c-1",
      name: "Found Corp",
      nameShort: null,
      type: "GROUP",
      haveWorkerEmployee: false,
      isLdap: false,
      stsActive: true,
      createdAt: new Date(),
      createdBy: null,
      updatedAt: null,
      updatedBy: null,
      deletedAt: null,
    };
    const mockService = makeMockService({
      findById: mock((_id: string) => Promise.resolve(existing)),
    });
    const { app } = await setup(mockService);

    const res = await app.request("/00000000-0000-4000-8000-000000000001");

    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body).toMatchObject({
      success: true,
      data: { id: "abc-123", name: "Found Corp" },
      message: "Company retrieved successfully",
    });
    expect(mockService.findById).toHaveBeenCalledWith("00000000-0000-4000-8000-000000000001");
  });

  test("GET /:id returns 404 when not found", async () => {
    const mockService = makeMockService({
      findById: mock((_id: string) => Promise.resolve(null)),
    });
    const { app } = await setup(mockService);

    const res = await app.request("/00000000-0000-0000-0000-000000000000");

    expect(res.status).toBe(404);
    const body = await res.json();
    expect(body).toMatchObject({
      success: false,
      data: null,
      message: "Company not found",
    });
  });

  test("POST / returns 201 on success", async () => {
    const mockService = makeMockService();
    const { app } = await setup(mockService);

    const res = await app.request("/", {
      method: "POST",
      body: JSON.stringify({ name: "New", type: "CLIENT", countryId: "c-1" }),
      headers: { "content-type": "application/json" },
    });

    expect(res.status).toBe(201);
    const body = await res.json();
    expect(body).toMatchObject({
      success: true,
      data: { name: "New Corp" },
      message: "Company created successfully",
    });
  });

  test("POST / returns 400 on validation error", async () => {
    const mockService = makeMockService({
      create: mock(() => Promise.reject(new ValidationError("name is required"))),
    });
    const { app } = await setup(mockService);

    const res = await app.request("/", {
      method: "POST",
      body: JSON.stringify({}),
      headers: { "content-type": "application/json" },
    });

    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body).toMatchObject({
      success: false,
      data: null,
      message: "name is required",
    });
  });

  test("PUT /:id returns 200 on success", async () => {
    const mockService = makeMockService();
    const { app } = await setup(mockService);

    const res = await app.request("/00000000-0000-4000-8000-000000000003", {
      method: "PUT",
      body: JSON.stringify({ name: "Updated" }),
      headers: { "content-type": "application/json" },
    });

    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body).toMatchObject({
      success: true,
      data: { name: "Updated Corp" },
      message: "Company updated successfully",
    });
  });

  test("PUT /:id returns 404 on not found", async () => {
    const mockService = makeMockService({
      update: mock(() => Promise.reject(new NotFoundError("Company not found"))),
    });
    const { app } = await setup(mockService);

    const res = await app.request("/00000000-0000-4000-8000-000000000002", {
      method: "PUT",
      body: JSON.stringify({ name: "X" }),
      headers: { "content-type": "application/json" },
    });

    expect(res.status).toBe(404);
    const body = await res.json();
    expect(body).toMatchObject({
      success: false,
      data: null,
      message: "Company not found",
    });
  });

  test("DELETE /:id returns 200 on success", async () => {
    const mockService = makeMockService();
    const { app } = await setup(mockService);

    const res = await app.request("/00000000-0000-4000-8000-000000000001", { method: "DELETE" });

    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body).toMatchObject({
      success: true,
      data: null,
      message: "Company deleted successfully",
    });
  });

  test("DELETE /:id returns 404 on not found", async () => {
    const mockService = makeMockService({
      delete: mock(() => Promise.reject(new NotFoundError("Company not found"))),
    });
    const { app } = await setup(mockService);

    const res = await app.request("/00000000-0000-4000-8000-000000000002", { method: "DELETE" });

    expect(res.status).toBe(404);
    const body = await res.json();
    expect(body).toMatchObject({
      success: false,
      data: null,
      message: "Company not found",
    });
  });
});
