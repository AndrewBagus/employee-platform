import { describe, test, expect, mock } from "bun:test";
import { CountryService } from "@services/country/country.service";
import type { CountryResponseDto, CreateCountryDto, UpdateCountryDto } from "@dtos/country.dto";
import { NotFoundError } from "@cores/errors";

describe("CountryService", () => {
  const makeMockRepo = () => ({
    findAll: mock(() => Promise.resolve<CountryResponseDto[]>([])),
    findById: mock(() => Promise.resolve<CountryResponseDto | null>(null)),
    create: mock((_data: CreateCountryDto) =>
      Promise.resolve<CountryResponseDto>({
        id: "1",
        code: null,
        currency: null,
        flag: null,
        stsActive: null,
        createdAt: new Date(),
        createdBy: null,
        updatedAt: null,
        updatedBy: null,
        deletedAt: null,
      }),
    ),
    update: mock((_id: string, _data: UpdateCountryDto) =>
      Promise.resolve<CountryResponseDto>({
        id: "1",
        code: null,
        currency: null,
        flag: null,
        stsActive: null,
        createdAt: new Date(),
        createdBy: null,
        updatedAt: null,
        updatedBy: null,
        deletedAt: null,
      }),
    ),
    softDelete: mock(() => Promise.resolve()),
  });

  test("findAll delegates to repository", async () => {
    const repo = makeMockRepo();
    const svc = new CountryService(repo);
    await svc.findAll();
    expect(repo.findAll).toHaveBeenCalled();
  });

  test("findById returns null when not found", async () => {
    const repo = makeMockRepo();
    const svc = new CountryService(repo);
    const result = await svc.findById("nonexistent");
    expect(result).toBeNull();
    expect(repo.findById).toHaveBeenCalledWith("nonexistent");
  });

  test("create delegates on valid input", async () => {
    const repo = makeMockRepo();
    const svc = new CountryService(repo);
    const input: CreateCountryDto = { code: "US", currency: "USD", flag: "🇺🇸" };
    await svc.create(input);
    expect(repo.create).toHaveBeenCalledWith(input);
  });

  test("delete throws NotFoundError for non-existent id", async () => {
    const repo = makeMockRepo();
    const svc = new CountryService(repo);
    await expect(svc.delete("nonexistent")).rejects.toThrow(NotFoundError);
  });
});
