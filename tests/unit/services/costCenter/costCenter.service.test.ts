import { describe, test, expect, mock } from "bun:test";
import { CostCenterService } from "@services/costCenter/costCenter.service";
import type { CostCenterResponseDto, CreateCostCenterDto, UpdateCostCenterDto } from "@dtos/costCenter.dto";
import { NotFoundError } from "@cores/errors";

describe("CostCenterService", () => {
  const makeMockRepo = () => ({
    findAll: mock(() => Promise.resolve<CostCenterResponseDto[]>([])),
    findById: mock(() => Promise.resolve<CostCenterResponseDto | null>(null)),
    create: mock((_data: CreateCostCenterDto) =>
      Promise.resolve<CostCenterResponseDto>({
        id: "1",
        sapCode: "CC-001",
        name: "Cost Center A",
        remark: null,
        stsActive: null,
        createdAt: new Date(),
        createdBy: null,
        updatedAt: null,
        updatedBy: null,
        deletedAt: null,
      }),
    ),
    update: mock((_id: string, _data: UpdateCostCenterDto) =>
      Promise.resolve<CostCenterResponseDto>({
        id: "1",
        sapCode: "CC-001",
        name: "Cost Center A",
        remark: null,
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
    const svc = new CostCenterService(repo);
    await svc.findAll();
    expect(repo.findAll).toHaveBeenCalled();
  });

  test("findById returns null when not found", async () => {
    const repo = makeMockRepo();
    const svc = new CostCenterService(repo);
    const result = await svc.findById("nonexistent");
    expect(result).toBeNull();
    expect(repo.findById).toHaveBeenCalledWith("nonexistent");
  });

  test("create delegates on valid input", async () => {
    const repo = makeMockRepo();
    const svc = new CostCenterService(repo);
    const input: CreateCostCenterDto = { sapCode: "CC-001", name: "Cost Center A" };
    await svc.create(input);
    expect(repo.create).toHaveBeenCalledWith(input);
  });

  test("delete throws NotFoundError for non-existent id", async () => {
    const repo = makeMockRepo();
    const svc = new CostCenterService(repo);
    await expect(svc.delete("nonexistent")).rejects.toThrow(NotFoundError);
  });
});
