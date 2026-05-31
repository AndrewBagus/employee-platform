import { describe, test, expect, mock } from "bun:test";
import { TrainingTypeService } from "@services/trainingTypes/trainingTypes.service";
import type { TrainingTypeResponseDto, CreateTrainingTypeDto, UpdateTrainingTypeDto } from "@dtos/trainingType.dto";
import { NotFoundError } from "@cores/errors";

describe("TrainingTypeService", () => {
  const makeMockRepo = () => ({
    findAll: mock(() => Promise.resolve<TrainingTypeResponseDto[]>([])),
    findById: mock(() => Promise.resolve<TrainingTypeResponseDto | null>(null)),
    create: mock((_data: CreateTrainingTypeDto) =>
      Promise.resolve<TrainingTypeResponseDto>({
        id: "1",
        companyId: "00000000-0000-4000-8000-000000000001",
        name: "Technical",
        remark: null,
      }),
    ),
    update: mock((_id: string, _data: UpdateTrainingTypeDto) =>
      Promise.resolve<TrainingTypeResponseDto>({
        id: "1",
        companyId: "00000000-0000-4000-8000-000000000001",
        name: "Technical",
        remark: null,
      }),
    ),
    softDelete: mock(() => Promise.resolve()),
  });

  test("findAll delegates to repository", async () => {
    const repo = makeMockRepo();
    const svc = new TrainingTypeService(repo as any);
    await svc.findAll();
    expect(repo.findAll).toHaveBeenCalled();
  });

  test("findById returns null when not found", async () => {
    const repo = makeMockRepo();
    const svc = new TrainingTypeService(repo as any);
    const result = await svc.findById("nonexistent");
    expect(result).toBeNull();
    expect(repo.findById).toHaveBeenCalledWith("nonexistent");
  });

  test("create delegates on valid input", async () => {
    const repo = makeMockRepo();
    const svc = new TrainingTypeService(repo as any);
    const input: CreateTrainingTypeDto = { companyId: "00000000-0000-4000-8000-000000000001", name: "Technical" };
    await svc.create(input);
    expect(repo.create).toHaveBeenCalledWith(input);
  });

  test("delete throws NotFoundError for non-existent id", async () => {
    const repo = makeMockRepo();
    const svc = new TrainingTypeService(repo as any);
    await expect(svc.delete("nonexistent")).rejects.toThrow(NotFoundError);
  });
});
