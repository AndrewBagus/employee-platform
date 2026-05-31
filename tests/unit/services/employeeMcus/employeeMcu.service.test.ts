import { describe, test, expect, mock } from "bun:test";
import { EmployeeMcuService } from "@services/employeeMcus/employeeMcus.service";
import type { EMployeeMcuResponseDto, CreateEMployeeMcuDto, UpdateEMployeeMcuDto } from "@dtos/employeeMcu.dto";
import { NotFoundError } from "@cores/errors";

describe("EmployeeMcuService", () => {
  const makeMockRepo = () => ({
    findAll: mock(() => Promise.resolve<EMployeeMcuResponseDto[]>([])),
    findById: mock(() => Promise.resolve<EMployeeMcuResponseDto | null>(null)),
    create: mock((_data: CreateEMployeeMcuDto) =>
      Promise.resolve<EMployeeMcuResponseDto>({
        id: null,
        employeeId: "00000000-0000-4000-8000-000000000002",
        mcuDate: new Date(),
        mcuEndDate: null,
        mcuStatus: null,
        remark: null,
      }),
    ),
    update: mock((_id: string, _data: UpdateEMployeeMcuDto) =>
      Promise.resolve<EMployeeMcuResponseDto>({
        id: null,
        employeeId: "00000000-0000-4000-8000-000000000002",
        mcuDate: new Date(),
        mcuEndDate: null,
        mcuStatus: null,
        remark: null,
      }),
    ),
    softDelete: mock(() => Promise.resolve()),
  });

  test("findAll delegates to repository", async () => {
    const repo = makeMockRepo();
    const svc = new EmployeeMcuService(repo);
    await svc.findAll();
    expect(repo.findAll).toHaveBeenCalled();
  });

  test("findById returns null when not found", async () => {
    const repo = makeMockRepo();
    const svc = new EmployeeMcuService(repo);
    const result = await svc.findById("nonexistent");
    expect(result).toBeNull();
    expect(repo.findById).toHaveBeenCalledWith("nonexistent");
  });

  test("create delegates on valid input", async () => {
    const repo = makeMockRepo();
    const svc = new EmployeeMcuService(repo);
    const input: CreateEMployeeMcuDto = { employeeId: "00000000-0000-4000-8000-000000000002", mcuDate: new Date() };
    await svc.create(input);
    expect(repo.create).toHaveBeenCalledWith(input);
  });

  test("delete throws NotFoundError for non-existent id", async () => {
    const repo = makeMockRepo();
    const svc = new EmployeeMcuService(repo);
    await expect(svc.delete("nonexistent")).rejects.toThrow(NotFoundError);
  });
});
