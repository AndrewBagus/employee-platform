import { describe, test, expect, mock } from "bun:test";
import { PositionService } from "@services/positions/positions.service";
import type { POsitionResponseDto, CreatePOsitionDto, UpdatePOsitionDto } from "@dtos/position.dto";
import { NotFoundError } from "@cores/errors";

describe("PositionService", () => {
  const makeMockRepo = () => ({
    findAll: mock(() => Promise.resolve<POsitionResponseDto[]>([])),
    findById: mock(() => Promise.resolve<POsitionResponseDto | null>(null)),
    create: mock((_data: CreatePOsitionDto) =>
      Promise.resolve<POsitionResponseDto>({
        id: null,
        departmentId: null,
        name: "Developer",
        isHod: null,
      }),
    ),
    update: mock((_id: string, _data: UpdatePOsitionDto) =>
      Promise.resolve<POsitionResponseDto>({
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
    const input: CreatePOsitionDto = { name: "Developer" };
    await svc.create(input);
    expect(repo.create).toHaveBeenCalledWith(input);
  });

  test("delete throws NotFoundError for non-existent id", async () => {
    const repo = makeMockRepo();
    const svc = new PositionService(repo as any);
    await expect(svc.delete("nonexistent")).rejects.toThrow(NotFoundError);
  });
});
