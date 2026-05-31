import { describe, test, expect, mock } from "bun:test";
import { EmployeeContractAdvisorService } from "@services/employeeContractAdvisors/employeeContractAdvisors.service";
import type { EMployeeContractAdvisorResponseDto, CreateEMployeeContractAdvisorDto, UpdateEMployeeContractAdvisorDto } from "@dtos/employeeContractAdvisor.dto";
import { NotFoundError } from "@cores/errors";

describe("EmployeeContractAdvisorService", () => {
  const makeMockRepo = () => ({
    findAll: mock(() => Promise.resolve<EMployeeContractAdvisorResponseDto[]>([])),
    findById: mock(() => Promise.resolve<EMployeeContractAdvisorResponseDto | null>(null)),
    create: mock((_data: CreateEMployeeContractAdvisorDto) =>
      Promise.resolve<EMployeeContractAdvisorResponseDto>({
        id: null,
        employeeId: "00000000-0000-4000-8000-000000000002",
        order: 1,
        remark: null,
      }),
    ),
    update: mock((_id: string, _data: UpdateEMployeeContractAdvisorDto) =>
      Promise.resolve<EMployeeContractAdvisorResponseDto>({
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
    const svc = new EmployeeContractAdvisorService(repo);
    await svc.findAll();
    expect(repo.findAll).toHaveBeenCalled();
  });

  test("findById returns null when not found", async () => {
    const repo = makeMockRepo();
    const svc = new EmployeeContractAdvisorService(repo);
    const result = await svc.findById("nonexistent");
    expect(result).toBeNull();
    expect(repo.findById).toHaveBeenCalledWith("nonexistent");
  });

  test("create delegates on valid input", async () => {
    const repo = makeMockRepo();
    const svc = new EmployeeContractAdvisorService(repo);
    const input: CreateEMployeeContractAdvisorDto = { employeeId: "00000000-0000-4000-8000-000000000002", order: 1 };
    await svc.create(input);
    expect(repo.create).toHaveBeenCalledWith(input);
  });

  test("delete throws NotFoundError for non-existent id", async () => {
    const repo = makeMockRepo();
    const svc = new EmployeeContractAdvisorService(repo);
    await expect(svc.delete("nonexistent")).rejects.toThrow(NotFoundError);
  });
});
