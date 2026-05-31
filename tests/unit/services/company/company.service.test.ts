import { describe, test, expect, mock } from "bun:test";
import { CompanyService } from "@services/company/company.service";
import type { CompanyServiceInterface } from "@services/company/company.service.interface";
import type { CompanyRepositoryInterface } from "@repositories/company/company.repository.interface";
import type { CompanyResponseDto, CreateCompanyDto, UpdateCompanyDto } from "@dtos/company.dto";
import { ValidationError, NotFoundError } from "@cores/errors";

describe("CompanyService", () => {
  const makeMockRepo = (): CompanyRepositoryInterface => ({
    findAll: mock(() => Promise.resolve<CompanyResponseDto[]>([])),
    findById: mock(() => Promise.resolve<CompanyResponseDto | null>(null)),
    create: mock((_data: CreateCompanyDto) =>
      Promise.resolve<CompanyResponseDto>({
        id: "mock-id",
        countryId: "country-1",
        name: "Mock Corp",
        nameShort: "MC",
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
        id: "mock-id",
        countryId: "country-1",
        name: "Mock Corp",
        nameShort: "MC",
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
    softDelete: mock(() => Promise.resolve()),
  });

  test("findAll delegates to repository and returns result", async () => {
    const mockRepository = makeMockRepo();
    const service = new CompanyService(mockRepository);
    const result = await service.findAll();

    expect(result).toEqual([]);
    expect(mockRepository.findAll).toHaveBeenCalledTimes(1);
  });

  test("findById delegates to repository", async () => {
    const mockRepository = makeMockRepo();
    const service = new CompanyService(mockRepository);
    const result = await service.findById("org-1");

    expect(result).toBeNull();
    expect(mockRepository.findById).toHaveBeenCalledWith("org-1");
  });

  test("create validates required fields", async () => {
    const mockRepository = makeMockRepo();
    const service = new CompanyService(mockRepository);

    await expect(service.create({} as CreateCompanyDto)).rejects.toThrow(ValidationError);
  });

  test("create validates type enum", async () => {
    const mockRepository = makeMockRepo();
    const service = new CompanyService(mockRepository);

    await expect(
      service.create({ name: "X", type: "INVALID", countryId: "c" } as CreateCompanyDto),
    ).rejects.toThrow(ValidationError);
  });

  test("create delegates on valid input", async () => {
    const mockRepository = makeMockRepo();
    const service = new CompanyService(mockRepository);

    const input: CreateCompanyDto = { name: "Valid Corp", type: "CLIENT", countryId: "country-1" };
    await service.create(input);

    expect(mockRepository.create).toHaveBeenCalledWith(input);
  });

  test("update validates id", async () => {
    const mockRepository = makeMockRepo();
    const service = new CompanyService(mockRepository);

    await expect(service.update("", {})).rejects.toThrow(ValidationError);
  });

  test("update checks existence", async () => {
    const mockRepository = makeMockRepo();
    (mockRepository.findById as ReturnType<typeof mock>).mockResolvedValue(null);
    const service = new CompanyService(mockRepository);

    await expect(service.update("nonexistent", { name: "X" })).rejects.toThrow(NotFoundError);
  });

  test("update delegates on valid input", async () => {
    const mockRepository = makeMockRepo();
    const existing: CompanyResponseDto = {
      id: "existing-id",
      countryId: "c-1",
      name: "Old Name",
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
    };
    (mockRepository.findById as ReturnType<typeof mock>).mockResolvedValue(existing);
    const service = new CompanyService(mockRepository);

    const data: UpdateCompanyDto = { name: "New Name" };
    await service.update("existing-id", data);

    expect(mockRepository.findById).toHaveBeenCalledWith("existing-id");
    expect(mockRepository.update).toHaveBeenCalledWith("existing-id", data);
  });

  test("delete checks existence", async () => {
    const mockRepository = makeMockRepo();
    (mockRepository.findById as ReturnType<typeof mock>).mockResolvedValue(null);
    const service = new CompanyService(mockRepository);

    await expect(service.delete("nonexistent")).rejects.toThrow(NotFoundError);
  });

  test("delete delegates", async () => {
    const mockRepository = makeMockRepo();
    const existing: CompanyResponseDto = {
      id: "existing-id",
      countryId: "c-1",
      name: "To Delete",
      nameShort: null,
      type: "SUBCON",
      haveWorkerEmployee: false,
      isLdap: false,
      stsActive: true,
      createdAt: new Date(),
      createdBy: null,
      updatedAt: null,
      updatedBy: null,
      deletedAt: null,
    };
    (mockRepository.findById as ReturnType<typeof mock>).mockResolvedValue(existing);
    const service = new CompanyService(mockRepository);

    await service.delete("existing-id");

    expect(mockRepository.findById).toHaveBeenCalledWith("existing-id");
    expect(mockRepository.softDelete).toHaveBeenCalledWith("existing-id");
  });
});
