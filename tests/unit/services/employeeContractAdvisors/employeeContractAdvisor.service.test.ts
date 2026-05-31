import { describe, test, expect, mock } from "bun:test";
import { EmployeeContractAdvisorService } from "@services/employeeContractAdvisors/employeeContractAdvisors.service";
import type { EmployeeContractAdvisorResponseDto, CreateEmployeeContractAdvisorDto, UpdateEmployeeContractAdvisorDto } from "@dtos/employeeContractAdvisor.dto";
import { NotFoundError } from "@cores/errors";

describe("EmployeeContractAdvisorService", () => {
  const makeMockRepo = () => ({
    findAll: mock(() => Promise.resolve<EmployeeContractAdvisorResponseDto[]>([])),
    findById: mock(() => Promise.resolve<EmployeeContractAdvisorResponseDto | null>(null)),
    create: mock((_data: CreateEmployeeContractAdvisorDto) =>
      Promise.resolve<EmployeeContractAdvisorResponseDto>({
        id: null,
        employeeId: "00000000-0000-4000-8000-000000000002",
        order: 1,
        remark: null,
      }),
    ),
    update: mock((_id: string, _data: UpdateEmployeeContractAdvisorDto) =>
      Promise.resolve<EmployeeContractAdvisorResponseDto>({
        id: null,
        employeeId: "00000000-0000-4000-8000-000000000002",
        order: 1,
        remark: null,
      }),
    ),
    softDelete: mock(() => Promise.resolve()),
  });

  test("findAll delegates to repository", async () => {
    const repo = makeMockRepo();
    const svc = new EmployeeContractAdvisorService(repo as any);
    await svc.findAll();
    expect(repo.findAll).toHaveBeenCalled();
  });

  test("findById returns null when not found", async () => {
    const repo = makeMockRepo();
    const svc = new EmployeeContractAdvisorService(repo as any);
    const result = await svc.findById("nonexistent");
    expect(result).toBeNull();
    expect(repo.findById).toHaveBeenCalledWith("nonexistent");
  });

  test("create delegates on valid input", async () => {
    const repo = makeMockRepo();
    const svc = new EmployeeContractAdvisorService(repo as any);
    const input: CreateEmployeeContractAdvisorDto = { employeeId: "00000000-0000-4000-8000-000000000002", order: 1 };
    await svc.create(input);
    expect(repo.create).toHaveBeenCalledWith(input);
  });

  test("delete throws NotFoundError for non-existent id", async () => {
    const repo = makeMockRepo();
    const svc = new EmployeeContractAdvisorService(repo as any);
    await expect(svc.delete("nonexistent")).rejects.toThrow(NotFoundError);
  });
});
