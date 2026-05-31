import { describe, test, expect, mock } from "bun:test";
import { TrainingService } from "@services/trainings/trainings.service";
import type { TRainingResponseDto, CreateTRainingDto, UpdateTRainingDto } from "@dtos/training.dto";
import { NotFoundError } from "@cores/errors";

describe("TrainingService", () => {
  const makeMockRepo = () => ({
    findAll: mock(() => Promise.resolve<TRainingResponseDto[]>([])),
    findById: mock(() => Promise.resolve<TRainingResponseDto | null>(null)),
    create: mock((_data: CreateTRainingDto) =>
      Promise.resolve<TRainingResponseDto>({
        id: "1",
        companyId: "c-1",
        name: "Safety Training",
        remark: null,
      }),
    ),
    update: mock((_id: string, _data: UpdateTRainingDto) =>
      Promise.resolve<TRainingResponseDto>({
        id: "1",
        companyId: "c-1",
        name: "Safety Training",
        remark: null,
      }),
    ),
    softDelete: mock(() => Promise.resolve()),
  });

  test("findAll delegates to repository", async () => {
    const repo = makeMockRepo();
    const svc = new TrainingService(repo);
    await svc.findAll();
    expect(repo.findAll).toHaveBeenCalled();
  });

  test("findById returns null when not found", async () => {
    const repo = makeMockRepo();
    const svc = new TrainingService(repo);
    const result = await svc.findById("nonexistent");
    expect(result).toBeNull();
    expect(repo.findById).toHaveBeenCalledWith("nonexistent");
  });

  test("create delegates on valid input", async () => {
    const repo = makeMockRepo();
    const svc = new TrainingService(repo);
    const input: CreateTRainingDto = { companyId: "c-1", name: "Safety Training" };
    await svc.create(input);
    expect(repo.create).toHaveBeenCalledWith(input);
  });

  test("delete throws NotFoundError for non-existent id", async () => {
    const repo = makeMockRepo();
    const svc = new TrainingService(repo);
    await expect(svc.delete("nonexistent")).rejects.toThrow(NotFoundError);
  });
});
