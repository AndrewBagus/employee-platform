import { describe, test, expect, mock } from "bun:test";
import { AllowanceService } from "@services/allowances/allowances.service";
import type { ALlowanceResponseDto, CreateALlowanceDto, UpdateALlowanceDto } from "@dtos/allowance.dto";
import { NotFoundError } from "@cores/errors";

describe("AllowanceService", () => {
  const makeMockRepo = () => ({
    findAll: mock(() => Promise.resolve<ALlowanceResponseDto[]>([])),
    findById: mock(() => Promise.resolve<ALlowanceResponseDto | null>(null)),
    create: mock((_data: CreateALlowanceDto) =>
      Promise.resolve<ALlowanceResponseDto>({
        id: "1",
        companyId: "00000000-0000-4000-8000-000000000001",
        currencyId: "00000000-0000-4000-8000-000000000006",
        name: "Transport",
        nominal: 100000,
        remark: null,
      }),
    ),
    update: mock((_id: string, _data: UpdateALlowanceDto) =>
      Promise.resolve<ALlowanceResponseDto>({
        id: "1",
        companyId: "00000000-0000-4000-8000-000000000001",
        currencyId: "00000000-0000-4000-8000-000000000006",
        name: "Transport",
        nominal: 100000,
        remark: null,
      }),
    ),
    softDelete: mock(() => Promise.resolve()),
  });

  test("findAll delegates to repository", async () => {
    const repo = makeMockRepo();
    const svc = new AllowanceService(repo as any);
    await svc.findAll();
    expect(repo.findAll).toHaveBeenCalled();
  });

  test("findById returns null when not found", async () => {
    const repo = makeMockRepo();
    const svc = new AllowanceService(repo as any);
    const result = await svc.findById("nonexistent");
    expect(result).toBeNull();
    expect(repo.findById).toHaveBeenCalledWith("nonexistent");
  });

  test("create delegates on valid input", async () => {
    const repo = makeMockRepo();
    const svc = new AllowanceService(repo as any);
    const input: CreateALlowanceDto = { companyId: "00000000-0000-4000-8000-000000000001", currencyId: "00000000-0000-4000-8000-000000000006", name: "Transport", nominal: 100000 };
    await svc.create(input);
    expect(repo.create).toHaveBeenCalledWith(input);
  });

  test("delete throws NotFoundError for non-existent id", async () => {
    const repo = makeMockRepo();
    const svc = new AllowanceService(repo as any);
    await expect(svc.delete("nonexistent")).rejects.toThrow(NotFoundError);
  });
});
