import { describe, test, expect, mock } from "bun:test";
import { EmployeeAddressService } from "@services/employeeAddresses/employeeAddresses.service";
import type { EmployeeAddressResponseDto, CreateEmployeeAddressDto, UpdateEmployeeAddressDto } from "@dtos/employeeAddress.dto";
import { NotFoundError } from "@cores/errors";

describe("EmployeeAddressService", () => {
  const makeMockRepo = () => ({
    findAll: mock(() => Promise.resolve<EmployeeAddressResponseDto[]>([])),
    findById: mock(() => Promise.resolve<EmployeeAddressResponseDto | null>(null)),
    create: mock((_data: CreateEmployeeAddressDto) =>
      Promise.resolve<EmployeeAddressResponseDto>({
        id: "1",
        employeeId: "00000000-0000-4000-8000-000000000002",
        address: "Jl. Merdeka",
        remark: null,
      }),
    ),
    update: mock((_id: string, _data: UpdateEmployeeAddressDto) =>
      Promise.resolve<EmployeeAddressResponseDto>({
        id: "1",
        employeeId: "00000000-0000-4000-8000-000000000002",
        address: "Jl. Merdeka",
        remark: null,
      }),
    ),
    softDelete: mock(() => Promise.resolve()),
  });

  test("findAll delegates to repository", async () => {
    const repo = makeMockRepo();
    const svc = new EmployeeAddressService(repo as any);
    await svc.findAll();
    expect(repo.findAll).toHaveBeenCalled();
  });

  test("findById returns null when not found", async () => {
    const repo = makeMockRepo();
    const svc = new EmployeeAddressService(repo as any);
    const result = await svc.findById("nonexistent");
    expect(result).toBeNull();
    expect(repo.findById).toHaveBeenCalledWith("nonexistent");
  });

  test("create delegates on valid input", async () => {
    const repo = makeMockRepo();
    const svc = new EmployeeAddressService(repo as any);
    const input: CreateEmployeeAddressDto = { employeeId: "00000000-0000-4000-8000-000000000002", address: "Jl. Merdeka" };
    await svc.create(input);
    expect(repo.create).toHaveBeenCalledWith(input);
  });

  test("delete throws NotFoundError for non-existent id", async () => {
    const repo = makeMockRepo();
    const svc = new EmployeeAddressService(repo as any);
    await expect(svc.delete("nonexistent")).rejects.toThrow(NotFoundError);
  });
});
