import { describe, test, expect, mock } from "bun:test";
import { EmployeeWarningService } from "@services/employeeWarnings/employeeWarnings.service";
import type { EMployeeWarningResponseDto, CreateEMployeeWarningDto, UpdateEMployeeWarningDto } from "@dtos/employeeWarning.dto";
import { NotFoundError } from "@cores/errors";

describe("EmployeeWarningService", () => {
  const makeMockRepo = () => ({
    findAll: mock(() => Promise.resolve<EMployeeWarningResponseDto[]>([])),
    findById: mock(() => Promise.resolve<EMployeeWarningResponseDto | null>(null)),
    create: mock((_data: CreateEMployeeWarningDto) =>
      Promise.resolve<EMployeeWarningResponseDto>({
        id: null,
        employeeId: "emp-1",
        warningStartDate: new Date(),
        warningEndDate: null,
        warningStatus: null,
        remark: null,
      }),
    ),
    update: mock((_id: string, _data: UpdateEMployeeWarningDto) =>
      Promise.resolve<EMployeeWarningResponseDto>({
        id: null,
        employeeId: "emp-1",
        warningStartDate: new Date(),
        warningEndDate: null,
        warningStatus: null,
        remark: null,
      }),
    ),
    softDelete: mock(() => Promise.resolve()),
  });

  test("findAll delegates to repository", async () => {
    const repo = makeMockRepo();
    const svc = new EmployeeWarningService(repo);
    await svc.findAll();
    expect(repo.findAll).toHaveBeenCalled();
  });

  test("findById returns null when not found", async () => {
    const repo = makeMockRepo();
    const svc = new EmployeeWarningService(repo);
    const result = await svc.findById("nonexistent");
    expect(result).toBeNull();
    expect(repo.findById).toHaveBeenCalledWith("nonexistent");
  });

  test("create delegates on valid input", async () => {
    const repo = makeMockRepo();
    const svc = new EmployeeWarningService(repo);
    const input: CreateEMployeeWarningDto = { employeeId: "emp-1", warningStartDate: new Date() };
    await svc.create(input);
    expect(repo.create).toHaveBeenCalledWith(input);
  });

  test("delete throws NotFoundError for non-existent id", async () => {
    const repo = makeMockRepo();
    const svc = new EmployeeWarningService(repo);
    await expect(svc.delete("nonexistent")).rejects.toThrow(NotFoundError);
  });
});
