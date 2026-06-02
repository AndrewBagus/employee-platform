import { describe, test, expect, mock } from "bun:test";
import { EmployeeProjectService } from "@services/employeeProjects/employeeProjects.service";
import type { EmployeeProjectResponseDto, CreateEmployeeProjectDto, UpdateEmployeeProjectDto } from "@dtos/employeeProject.dto";
import { NotFoundError } from "@cores/errors";

describe("EmployeeProjectService", () => {
  const makeMockRepo = () => ({
    findAll: mock(() => Promise.resolve<EmployeeProjectResponseDto[]>([])),
    findById: mock(() => Promise.resolve<EmployeeProjectResponseDto | null>(null)),
    create: mock((_data: CreateEmployeeProjectDto) =>
      Promise.resolve<EmployeeProjectResponseDto>({ employeeId: "00000000-0000-4000-8000-000000000002", projectId: "00000000-0000-4000-8000-000000000007", remark: null }),
    ),
    update: mock((_id: string, _data: UpdateEmployeeProjectDto) =>
      Promise.resolve<EmployeeProjectResponseDto>({ employeeId: "00000000-0000-4000-8000-000000000002", projectId: "00000000-0000-4000-8000-000000000007", remark: null }),
    ),
    softDelete: mock(() => Promise.resolve()),
  });

  test("findAll delegates to repository", async () => {
    const repo = makeMockRepo();
    const svc = new EmployeeProjectService(repo as any);
    await svc.findAll();
    expect(repo.findAll).toHaveBeenCalled();
  });

  test("findById returns null when not found", async () => {
    const repo = makeMockRepo();
    const svc = new EmployeeProjectService(repo as any);
    const result = await svc.findById("nonexistent");
    expect(result).toBeNull();
    expect(repo.findById).toHaveBeenCalledWith("nonexistent");
  });

  test("create delegates on valid input", async () => {
    const repo = makeMockRepo();
    const svc = new EmployeeProjectService(repo as any);
    const input: CreateEmployeeProjectDto = { employeeId: "00000000-0000-4000-8000-000000000002", projectId: "00000000-0000-4000-8000-000000000007" };
    await svc.create(input);
    expect(repo.create).toHaveBeenCalledWith(input);
  });

  test("delete throws NotFoundError for non-existent id", async () => {
    const repo = makeMockRepo();
    const svc = new EmployeeProjectService(repo as any);
    await expect(svc.delete("nonexistent")).rejects.toThrow(NotFoundError);
  });
});
