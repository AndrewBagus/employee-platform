import { describe, test, expect, mock } from "bun:test";
import { TrainingService } from "@services/trainings/trainings.service";
import type { TrainingResponseDto, CreateTrainingDto, UpdateTrainingDto } from "@dtos/training.dto";
import { NotFoundError } from "@cores/errors";

describe("TrainingService", () => {
  const makeMockRepo = () => ({
    findAll: mock(() => Promise.resolve<TrainingResponseDto[]>([])),
    findById: mock(() => Promise.resolve<TrainingResponseDto | null>(null)),
    create: mock((_data: CreateTrainingDto) =>
      Promise.resolve<TrainingResponseDto>({
        id: "1",
        companyId: "00000000-0000-4000-8000-000000000001",
        name: "Safety Training",
        remark: null,
      }),
    ),
    update: mock((_id: string, _data: UpdateTrainingDto) =>
      Promise.resolve<TrainingResponseDto>({
        id: "1",
        companyId: "00000000-0000-4000-8000-000000000001",
        name: "Safety Training",
        remark: null,
      }),
    ),
    softDelete: mock(() => Promise.resolve()),
  });

  test("findAll delegates to repository", async () => {
    const repo = makeMockRepo();
    const svc = new TrainingService(repo as any);
    await svc.findAll();
    expect(repo.findAll).toHaveBeenCalled();
  });

  test("findById returns null when not found", async () => {
    const repo = makeMockRepo();
    const svc = new TrainingService(repo as any);
    const result = await svc.findById("nonexistent");
    expect(result).toBeNull();
    expect(repo.findById).toHaveBeenCalledWith("nonexistent");
  });

  test("create delegates on valid input", async () => {
    const repo = makeMockRepo();
    const svc = new TrainingService(repo as any);
    const input: CreateTrainingDto = { companyId: "00000000-0000-4000-8000-000000000001", name: "Safety Training" };
    await svc.create(input);
    expect(repo.create).toHaveBeenCalledWith(input);
  });

  test("delete throws NotFoundError for non-existent id", async () => {
    const repo = makeMockRepo();
    const svc = new TrainingService(repo as any);
    await expect(svc.delete("nonexistent")).rejects.toThrow(NotFoundError);
  });
});
