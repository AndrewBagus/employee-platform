import { describe, test, expect, mock } from "bun:test";
import { WarningService } from "@services/warnings/warnings.service";
import type { WArningResponseDto, CreateWArningDto, UpdateWArningDto } from "@dtos/warning.dto";
import { NotFoundError } from "@cores/errors";

describe("WarningService", () => {
  const makeMockRepo = () => ({
    findAll: mock(() => Promise.resolve<WArningResponseDto[]>([])),
    findById: mock(() => Promise.resolve<WArningResponseDto | null>(null)),
    create: mock((_data: CreateWArningDto) =>
      Promise.resolve<WArningResponseDto>({
        id: "1",
        companyId: "00000000-0000-4000-8000-000000000001",
        warningGradeId: "00000000-0000-4000-8000-000000000008",
        name: "Warning Type A",
        remark: null,
      }),
    ),
    update: mock((_id: string, _data: UpdateWArningDto) =>
      Promise.resolve<WArningResponseDto>({
        id: "1",
        companyId: "00000000-0000-4000-8000-000000000001",
        warningGradeId: "00000000-0000-4000-8000-000000000008",
        name: "Warning Type A",
        remark: null,
      }),
    ),
    softDelete: mock(() => Promise.resolve()),
  });

  test("findAll delegates to repository", async () => {
    const repo = makeMockRepo();
    const svc = new WarningService(repo as any);
    await svc.findAll();
    expect(repo.findAll).toHaveBeenCalled();
  });

  test("findById returns null when not found", async () => {
    const repo = makeMockRepo();
    const svc = new WarningService(repo as any);
    const result = await svc.findById("nonexistent");
    expect(result).toBeNull();
    expect(repo.findById).toHaveBeenCalledWith("nonexistent");
  });

  test("create delegates on valid input", async () => {
    const repo = makeMockRepo();
    const svc = new WarningService(repo as any);
    const input: CreateWArningDto = { companyId: "00000000-0000-4000-8000-000000000001", warningGradeId: "00000000-0000-4000-8000-000000000008", name: "Warning Type A" };
    await svc.create(input);
    expect(repo.create).toHaveBeenCalledWith(input);
  });

  test("delete throws NotFoundError for non-existent id", async () => {
    const repo = makeMockRepo();
    const svc = new WarningService(repo as any);
    await expect(svc.delete("nonexistent")).rejects.toThrow(NotFoundError);
  });
});
