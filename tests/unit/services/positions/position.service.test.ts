import { describe, test, expect, mock } from "bun:test";
import { PositionService } from "@services/positions/positions.service";
import type { PositionResponseDto, CreatePositionDto, UpdatePositionDto } from "@dtos/position.dto";
import { NotFoundError } from "@cores/errors";

describe("PositionService", () => {
  const makeMockRepo = () => ({
    findAll: mock(() => Promise.resolve<PositionResponseDto[]>([])),
    findById: mock(() => Promise.resolve<PositionResponseDto | null>(null)),
    create: mock((_data: CreatePositionDto) =>
      Promise.resolve<PositionResponseDto>({
        id: null,
        departmentId: null,
        name: "Developer",
        isHod: null,
      }),
    ),
    update: mock((_id: string, _data: UpdatePositionDto) =>
      Promise.resolve<PositionResponseDto>({
        id: null,
        departmentId: null,
        name: "Developer",
        isHod: null,
      }),
    ),
    softDelete: mock(() => Promise.resolve()),
  });

  test("findAll delegates to repository", async () => {
    const repo = makeMockRepo();
    const svc = new PositionService(repo as any);
    await svc.findAll();
    expect(repo.findAll).toHaveBeenCalled();
  });

  test("findById returns null when not found", async () => {
    const repo = makeMockRepo();
    const svc = new PositionService(repo as any);
    const result = await svc.findById("nonexistent");
    expect(result).toBeNull();
    expect(repo.findById).toHaveBeenCalledWith("nonexistent");
  });

  test("create delegates on valid input", async () => {
    const repo = makeMockRepo();
    const svc = new PositionService(repo as any);
    const input: CreatePositionDto = { name: "Developer" };
    await svc.create(input);
    expect(repo.create).toHaveBeenCalledWith(input);
  });

  test("delete throws NotFoundError for non-existent id", async () => {
    const repo = makeMockRepo();
    const svc = new PositionService(repo as any);
    await expect(svc.delete("nonexistent")).rejects.toThrow(NotFoundError);
  });
});
