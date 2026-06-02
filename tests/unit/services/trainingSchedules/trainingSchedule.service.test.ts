import { describe, test, expect, mock } from "bun:test";
import { TrainingScheduleService } from "@services/trainingSchedules/trainingSchedules.service";
import type { TrainingScheduleResponseDto, CreateTrainingScheduleDto, UpdateTrainingScheduleDto } from "@dtos/trainingSchedule.dto";
import { NotFoundError } from "@cores/errors";

describe("TrainingScheduleService", () => {
  const makeMockRepo = () => ({
    findAll: mock(() => Promise.resolve<TrainingScheduleResponseDto[]>([])),
    findById: mock(() => Promise.resolve<TrainingScheduleResponseDto | null>(null)),
    create: mock((_data: CreateTrainingScheduleDto) =>
      Promise.resolve<TrainingScheduleResponseDto>({
        id: null,
        companyId: "00000000-0000-4000-8000-000000000001",
        trainingDate: null,
        trainingTime: null,
        remark: null,
      }),
    ),
    update: mock((_id: string, _data: UpdateTrainingScheduleDto) =>
      Promise.resolve<TrainingScheduleResponseDto>({
        id: null,
        companyId: "00000000-0000-4000-8000-000000000001",
        trainingDate: null,
        trainingTime: null,
        remark: null,
      }),
    ),
    softDelete: mock(() => Promise.resolve()),
  });

  test("findAll delegates to repository", async () => {
    const repo = makeMockRepo();
    const svc = new TrainingScheduleService(repo as any);
    await svc.findAll();
    expect(repo.findAll).toHaveBeenCalled();
  });

  test("findById returns null when not found", async () => {
    const repo = makeMockRepo();
    const svc = new TrainingScheduleService(repo as any);
    const result = await svc.findById("nonexistent");
    expect(result).toBeNull();
    expect(repo.findById).toHaveBeenCalledWith("nonexistent");
  });

  test("create delegates on valid input", async () => {
    const repo = makeMockRepo();
    const svc = new TrainingScheduleService(repo as any);
    const input: CreateTrainingScheduleDto = { companyId: "00000000-0000-4000-8000-000000000001" };
    await svc.create(input);
    expect(repo.create).toHaveBeenCalledWith(input);
  });

  test("delete throws NotFoundError for non-existent id", async () => {
    const repo = makeMockRepo();
    const svc = new TrainingScheduleService(repo as any);
    await expect(svc.delete("nonexistent")).rejects.toThrow(NotFoundError);
  });
});
