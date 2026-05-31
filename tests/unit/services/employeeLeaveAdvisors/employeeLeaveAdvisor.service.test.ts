import { describe, test, expect, mock } from "bun:test";
import { EmployeeLeaveAdvisorService } from "@services/employeeLeaveAdvisors/employeeLeaveAdvisors.service";
import type { EMployeeLeaveAdvisorResponseDto, CreateEMployeeLeaveAdvisorDto, UpdateEMployeeLeaveAdvisorDto } from "@dtos/employeeLeaveAdvisor.dto";
import { NotFoundError } from "@cores/errors";

describe("EmployeeLeaveAdvisorService", () => {
  const makeMockRepo = () => ({
    findAll: mock(() => Promise.resolve<EMployeeLeaveAdvisorResponseDto[]>([])),
    findById: mock(() => Promise.resolve<EMployeeLeaveAdvisorResponseDto | null>(null)),
    create: mock((_data: CreateEMployeeLeaveAdvisorDto) =>
      Promise.resolve<EMployeeLeaveAdvisorResponseDto>({
        id: null,
        employeeId: "emp-1",
        order: 1,
        remark: null,
      }),
    ),
    update: mock((_id: string, _data: UpdateEMployeeLeaveAdvisorDto) =>
      Promise.resolve<EMployeeLeaveAdvisorResponseDto>({
        id: null,
        employeeId: "emp-1",
        order: 1,
        remark: null,
      }),
    ),
    softDelete: mock(() => Promise.resolve()),
  });

  test("findAll delegates to repository", async () => {
    const repo = makeMockRepo();
    const svc = new EmployeeLeaveAdvisorService(repo);
    await svc.findAll();
    expect(repo.findAll).toHaveBeenCalled();
  });

  test("findById returns null when not found", async () => {
    const repo = makeMockRepo();
    const svc = new EmployeeLeaveAdvisorService(repo);
    const result = await svc.findById("nonexistent");
    expect(result).toBeNull();
    expect(repo.findById).toHaveBeenCalledWith("nonexistent");
  });

  test("create delegates on valid input", async () => {
    const repo = makeMockRepo();
    const svc = new EmployeeLeaveAdvisorService(repo);
    const input: CreateEMployeeLeaveAdvisorDto = { employeeId: "emp-1", order: 1 };
    await svc.create(input);
    expect(repo.create).toHaveBeenCalledWith(input);
  });

  test("delete throws NotFoundError for non-existent id", async () => {
    const repo = makeMockRepo();
    const svc = new EmployeeLeaveAdvisorService(repo);
    await expect(svc.delete("nonexistent")).rejects.toThrow(NotFoundError);
  });
});
