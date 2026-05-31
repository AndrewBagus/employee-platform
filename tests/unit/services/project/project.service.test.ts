import { describe, test, expect, mock } from "bun:test";
import { ProjectService } from "@services/project/project.service";
import type { ProjectResponseDto, CreateProjectDto, UpdateProjectDto } from "@dtos/project.dto";
import { NotFoundError } from "@cores/errors";

describe("ProjectService", () => {
  const makeMockRepo = () => ({
    findAll: mock(() => Promise.resolve<ProjectResponseDto[]>([])),
    findById: mock(() => Promise.resolve<ProjectResponseDto | null>(null)),
    create: mock((_data: CreateProjectDto) =>
      Promise.resolve<ProjectResponseDto>({
        id: "1",
        sapCode: "P-001",
        name: "Project X",
        remark: null,
        stsActive: null,
        createdAt: new Date(),
        createdBy: null,
        updatedAt: null,
        updatedBy: null,
        deletedAt: null,
      }),
    ),
    update: mock((_id: string, _data: UpdateProjectDto) =>
      Promise.resolve<ProjectResponseDto>({
        id: "1",
        sapCode: "P-001",
        name: "Project X",
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
    const svc = new ProjectService(repo as any);
    await svc.findAll();
    expect(repo.findAll).toHaveBeenCalled();
  });

  test("findById returns null when not found", async () => {
    const repo = makeMockRepo();
    const svc = new ProjectService(repo as any);
    const result = await svc.findById("nonexistent");
    expect(result).toBeNull();
    expect(repo.findById).toHaveBeenCalledWith("nonexistent");
  });

  test("create delegates on valid input", async () => {
    const repo = makeMockRepo();
    const svc = new ProjectService(repo as any);
    const input: CreateProjectDto = { sapCode: "P-001", name: "Project X" };
    await svc.create(input);
    expect(repo.create).toHaveBeenCalledWith(input);
  });

  test("delete throws NotFoundError for non-existent id", async () => {
    const repo = makeMockRepo();
    const svc = new ProjectService(repo as any);
    await expect(svc.delete("nonexistent")).rejects.toThrow(NotFoundError);
  });
});
