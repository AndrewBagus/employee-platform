import { describe, test, expect, mock } from "bun:test";
import { WarningGradeService } from "@services/warningGrades/warningGrades.service";
import type { WArningGradeResponseDto, CreateWArningGradeDto, UpdateWArningGradeDto } from "@dtos/warningGrade.dto";
import { NotFoundError } from "@cores/errors";

describe("WarningGradeService", () => {
  const makeMockRepo = () => ({
    findAll: mock(() => Promise.resolve<WArningGradeResponseDto[]>([])),
    findById: mock(() => Promise.resolve<WArningGradeResponseDto | null>(null)),
    create: mock((_data: CreateWArningGradeDto) =>
      Promise.resolve<WArningGradeResponseDto>({
        id: null,
        companyId: "00000000-0000-4000-8000-000000000001",
        name: "Grade A",
        remark: null,
      }),
    ),
    update: mock((_id: string, _data: UpdateWArningGradeDto) =>
      Promise.resolve<WArningGradeResponseDto>({
        id: null,
        companyId: "00000000-0000-4000-8000-000000000001",
        name: "Grade A",
        remark: null,
      }),
    ),
    softDelete: mock(() => Promise.resolve()),
  });

  test("findAll delegates to repository", async () => {
    const repo = makeMockRepo();
    const svc = new WarningGradeService(repo as any);
    await svc.findAll();
    expect(repo.findAll).toHaveBeenCalled();
  });

  test("findById returns null when not found", async () => {
    const repo = makeMockRepo();
    const svc = new WarningGradeService(repo as any);
    const result = await svc.findById("nonexistent");
    expect(result).toBeNull();
    expect(repo.findById).toHaveBeenCalledWith("nonexistent");
  });

  test("create delegates on valid input", async () => {
    const repo = makeMockRepo();
    const svc = new WarningGradeService(repo as any);
    const input: CreateWArningGradeDto = { companyId: "00000000-0000-4000-8000-000000000001", name: "Grade A" };
    await svc.create(input);
    expect(repo.create).toHaveBeenCalledWith(input);
  });

  test("delete throws NotFoundError for non-existent id", async () => {
    const repo = makeMockRepo();
    const svc = new WarningGradeService(repo as any);
    await expect(svc.delete("nonexistent")).rejects.toThrow(NotFoundError);
  });
});
