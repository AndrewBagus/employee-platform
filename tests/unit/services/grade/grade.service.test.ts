import { describe, test, expect, mock } from "bun:test";
import { GradeService } from "@services/grade/grade.service";
import type { GradeResponseDto, CreateGradeDto, UpdateGradeDto } from "@dtos/grade.dto";
import { NotFoundError } from "@cores/errors";

describe("GradeService", () => {
  const makeMockRepo = () => ({
    findAll: mock(() => Promise.resolve<GradeResponseDto[]>([])),
    findById: mock(() => Promise.resolve<GradeResponseDto | null>(null)),
    create: mock((_data: CreateGradeDto) =>
      Promise.resolve<GradeResponseDto>({
        id: "1",
        name: "Grade A",
        remark: null,
        stsActive: null,
        createdAt: new Date(),
        createdBy: null,
        updatedAt: null,
        updatedBy: null,
        deletedAt: null,
      }),
    ),
    update: mock((_id: string, _data: UpdateGradeDto) =>
      Promise.resolve<GradeResponseDto>({
        id: "1",
        name: "Grade A",
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
    const svc = new GradeService(repo);
    await svc.findAll();
    expect(repo.findAll).toHaveBeenCalled();
  });

  test("findById returns null when not found", async () => {
    const repo = makeMockRepo();
    const svc = new GradeService(repo);
    const result = await svc.findById("nonexistent");
    expect(result).toBeNull();
    expect(repo.findById).toHaveBeenCalledWith("nonexistent");
  });

  test("create delegates on valid input", async () => {
    const repo = makeMockRepo();
    const svc = new GradeService(repo);
    const input: CreateGradeDto = { name: "Grade A" };
    await svc.create(input);
    expect(repo.create).toHaveBeenCalledWith(input);
  });

  test("delete throws NotFoundError for non-existent id", async () => {
    const repo = makeMockRepo();
    const svc = new GradeService(repo);
    await expect(svc.delete("nonexistent")).rejects.toThrow(NotFoundError);
  });
});
