import { describe, test, expect, mock } from "bun:test";
import { DepartmentService } from "@services/departments/departments.service";
import type { DEpartmentResponseDto, CreateDEpartmentDto, UpdateDEpartmentDto } from "@dtos/department.dto";
import { NotFoundError } from "@cores/errors";

describe("DepartmentService", () => {
  const makeMockRepo = () => ({
    findAll: mock(() => Promise.resolve<DEpartmentResponseDto[]>([])),
    findById: mock(() => Promise.resolve<DEpartmentResponseDto | null>(null)),
    create: mock((_data: CreateDEpartmentDto) =>
      Promise.resolve<DEpartmentResponseDto>({
        id: "1",
        companyId: "c-1",
        name: "Engineering",
      }),
    ),
    update: mock((_id: string, _data: UpdateDEpartmentDto) =>
      Promise.resolve<DEpartmentResponseDto>({
        id: "1",
        companyId: "c-1",
        name: "Engineering",
      }),
    ),
    softDelete: mock(() => Promise.resolve()),
  });

  test("findAll delegates to repository", async () => {
    const repo = makeMockRepo();
    const svc = new DepartmentService(repo);
    await svc.findAll();
    expect(repo.findAll).toHaveBeenCalled();
  });

  test("findById returns null when not found", async () => {
    const repo = makeMockRepo();
    const svc = new DepartmentService(repo);
    const result = await svc.findById("nonexistent");
    expect(result).toBeNull();
    expect(repo.findById).toHaveBeenCalledWith("nonexistent");
  });

  test("create delegates on valid input", async () => {
    const repo = makeMockRepo();
    const svc = new DepartmentService(repo);
    const input: CreateDEpartmentDto = { companyId: "c-1", name: "Engineering" };
    await svc.create(input);
    expect(repo.create).toHaveBeenCalledWith(input);
  });

  test("delete throws NotFoundError for non-existent id", async () => {
    const repo = makeMockRepo();
    const svc = new DepartmentService(repo);
    await expect(svc.delete("nonexistent")).rejects.toThrow(NotFoundError);
  });
});
