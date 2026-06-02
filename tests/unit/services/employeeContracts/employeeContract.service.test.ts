import { describe, test, expect, mock } from "bun:test";
import { EmployeeContractService } from "@services/employeeContracts/employeeContracts.service";
import type { EmployeeContractResponseDto, CreateEmployeeContractDto, UpdateEmployeeContractDto } from "@dtos/employeeContract.dto";
import { NotFoundError } from "@cores/errors";

describe("EmployeeContractService", () => {
  const makeMockRepo = () => ({
    findAll: mock(() => Promise.resolve<EmployeeContractResponseDto[]>([])),
    findById: mock(() => Promise.resolve<EmployeeContractResponseDto | null>(null)),
    create: mock((_data: CreateEmployeeContractDto) =>
      Promise.resolve<EmployeeContractResponseDto>({
        id: null,
        employeeId: "00000000-0000-4000-8000-000000000002",
        startDate: new Date(),
        endDate: new Date(),
        terminationDate: new Date(),
        remark: null,
      }),
    ),
    update: mock((_id: string, _data: UpdateEmployeeContractDto) =>
      Promise.resolve<EmployeeContractResponseDto>({
        id: null,
        employeeId: "00000000-0000-4000-8000-000000000002",
        startDate: new Date(),
        endDate: new Date(),
        terminationDate: new Date(),
        remark: null,
      }),
    ),
    softDelete: mock(() => Promise.resolve()),
  });

  test("findAll delegates to repository", async () => {
    const repo = makeMockRepo();
    const svc = new EmployeeContractService(repo as any);
    await svc.findAll();
    expect(repo.findAll).toHaveBeenCalled();
  });

  test("findById returns null when not found", async () => {
    const repo = makeMockRepo();
    const svc = new EmployeeContractService(repo as any);
    const result = await svc.findById("nonexistent");
    expect(result).toBeNull();
    expect(repo.findById).toHaveBeenCalledWith("nonexistent");
  });

  test("create delegates on valid input", async () => {
    const repo = makeMockRepo();
    const svc = new EmployeeContractService(repo as any);
    const input: CreateEmployeeContractDto = { employeeId: "00000000-0000-4000-8000-000000000002", startDate: new Date(), endDate: new Date(), terminationDate: new Date() };
    await svc.create(input);
    expect(repo.create).toHaveBeenCalledWith(input);
  });

  test("delete throws NotFoundError for non-existent id", async () => {
    const repo = makeMockRepo();
    const svc = new EmployeeContractService(repo as any);
    await expect(svc.delete("nonexistent")).rejects.toThrow(NotFoundError);
  });
});
