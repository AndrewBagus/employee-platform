import { describe, test, expect, mock } from "bun:test";
import { EmployeeTrainingService } from "@services/employeeTrainings/employeeTrainings.service";
import type { EmployeeTrainingResponseDto, CreateEmployeeTrainingDto, UpdateEmployeeTrainingDto } from "@dtos/employeeTraining.dto";
import { NotFoundError } from "@cores/errors";

describe("EmployeeTrainingService", () => {
  const makeMockRepo = () => ({
    findAll: mock(() => Promise.resolve<EmployeeTrainingResponseDto[]>([])),
    findById: mock(() => Promise.resolve<EmployeeTrainingResponseDto | null>(null)),
    create: mock((_data: CreateEmployeeTrainingDto) =>
      Promise.resolve<EmployeeTrainingResponseDto>({
        id: "1",
        employeeId: "00000000-0000-4000-8000-000000000002",
        trainingDate: new Date(),
        trainingStatus: "PASS",
        remark: null,
      }),
    ),
    update: mock((_id: string, _data: UpdateEmployeeTrainingDto) =>
      Promise.resolve<EmployeeTrainingResponseDto>({
        id: "1",
        employeeId: "00000000-0000-4000-8000-000000000002",
        trainingDate: new Date(),
        trainingStatus: "PASS",
        remark: null,
      }),
    ),
    softDelete: mock(() => Promise.resolve()),
  });

  test("findAll delegates to repository", async () => {
    const repo = makeMockRepo();
    const svc = new EmployeeTrainingService(repo as any);
    await svc.findAll();
    expect(repo.findAll).toHaveBeenCalled();
  });

  test("findById returns null when not found", async () => {
    const repo = makeMockRepo();
    const svc = new EmployeeTrainingService(repo as any);
    const result = await svc.findById("nonexistent");
    expect(result).toBeNull();
    expect(repo.findById).toHaveBeenCalledWith("nonexistent");
  });

  test("create delegates on valid input", async () => {
    const repo = makeMockRepo();
    const svc = new EmployeeTrainingService(repo as any);
    const input: CreateEmployeeTrainingDto = { employeeId: "00000000-0000-4000-8000-000000000002", trainingDate: new Date() };
    await svc.create(input);
    expect(repo.create).toHaveBeenCalledWith(input);
  });

  test("delete throws NotFoundError for non-existent id", async () => {
    const repo = makeMockRepo();
    const svc = new EmployeeTrainingService(repo as any);
    await expect(svc.delete("nonexistent")).rejects.toThrow(NotFoundError);
  });
});
