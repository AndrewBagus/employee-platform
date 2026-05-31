import { describe, test, expect, mock } from "bun:test";
import { EmployeeTrainingService } from "@services/employeeTrainings/employeeTrainings.service";
import type { EMployeeTrainingResponseDto, CreateEMployeeTrainingDto, UpdateEMployeeTrainingDto } from "@dtos/employeeTraining.dto";
import { NotFoundError } from "@cores/errors";

describe("EmployeeTrainingService", () => {
  const makeMockRepo = () => ({
    findAll: mock(() => Promise.resolve<EMployeeTrainingResponseDto[]>([])),
    findById: mock(() => Promise.resolve<EMployeeTrainingResponseDto | null>(null)),
    create: mock((_data: CreateEMployeeTrainingDto) =>
      Promise.resolve<EMployeeTrainingResponseDto>({
        id: "1",
        employeeId: "emp-1",
        trainingDate: new Date(),
        trainingStatus: "PASS",
        remark: null,
      }),
    ),
    update: mock((_id: string, _data: UpdateEMployeeTrainingDto) =>
      Promise.resolve<EMployeeTrainingResponseDto>({
        id: "1",
        employeeId: "emp-1",
        trainingDate: new Date(),
        trainingStatus: "PASS",
        remark: null,
      }),
    ),
    softDelete: mock(() => Promise.resolve()),
  });

  test("findAll delegates to repository", async () => {
    const repo = makeMockRepo();
    const svc = new EmployeeTrainingService(repo);
    await svc.findAll();
    expect(repo.findAll).toHaveBeenCalled();
  });

  test("findById returns null when not found", async () => {
    const repo = makeMockRepo();
    const svc = new EmployeeTrainingService(repo);
    const result = await svc.findById("nonexistent");
    expect(result).toBeNull();
    expect(repo.findById).toHaveBeenCalledWith("nonexistent");
  });

  test("create delegates on valid input", async () => {
    const repo = makeMockRepo();
    const svc = new EmployeeTrainingService(repo);
    const input: CreateEMployeeTrainingDto = { employeeId: "emp-1", trainingDate: new Date() };
    await svc.create(input);
    expect(repo.create).toHaveBeenCalledWith(input);
  });

  test("delete throws NotFoundError for non-existent id", async () => {
    const repo = makeMockRepo();
    const svc = new EmployeeTrainingService(repo);
    await expect(svc.delete("nonexistent")).rejects.toThrow(NotFoundError);
  });
});
