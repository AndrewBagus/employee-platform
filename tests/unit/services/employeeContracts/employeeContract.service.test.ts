import { describe, test, expect, mock } from "bun:test";
import { EmployeeContractService } from "@services/employeeContracts/employeeContracts.service";
import type { EMployeeContractResponseDto, CreateEMployeeContractDto, UpdateEMployeeContractDto } from "@dtos/employeeContract.dto";
import { NotFoundError } from "@cores/errors";

describe("EmployeeContractService", () => {
  const makeMockRepo = () => ({
    findAll: mock(() => Promise.resolve<EMployeeContractResponseDto[]>([])),
    findById: mock(() => Promise.resolve<EMployeeContractResponseDto | null>(null)),
    create: mock((_data: CreateEMployeeContractDto) =>
      Promise.resolve<EMployeeContractResponseDto>({
        id: null,
        employeeId: "emp-1",
        startDate: new Date(),
        endDate: new Date(),
        terminationDate: new Date(),
        remark: null,
      }),
    ),
    update: mock((_id: string, _data: UpdateEMployeeContractDto) =>
      Promise.resolve<EMployeeContractResponseDto>({
        id: null,
        employeeId: "emp-1",
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
    const svc = new EmployeeContractService(repo);
    await svc.findAll();
    expect(repo.findAll).toHaveBeenCalled();
  });

  test("findById returns null when not found", async () => {
    const repo = makeMockRepo();
    const svc = new EmployeeContractService(repo);
    const result = await svc.findById("nonexistent");
    expect(result).toBeNull();
    expect(repo.findById).toHaveBeenCalledWith("nonexistent");
  });

  test("create delegates on valid input", async () => {
    const repo = makeMockRepo();
    const svc = new EmployeeContractService(repo);
    const input: CreateEMployeeContractDto = { employeeId: "emp-1", startDate: new Date(), endDate: new Date(), terminationDate: new Date() };
    await svc.create(input);
    expect(repo.create).toHaveBeenCalledWith(input);
  });

  test("delete throws NotFoundError for non-existent id", async () => {
    const repo = makeMockRepo();
    const svc = new EmployeeContractService(repo);
    await expect(svc.delete("nonexistent")).rejects.toThrow(NotFoundError);
  });
});
