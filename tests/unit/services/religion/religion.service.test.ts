import { describe, test, expect, mock } from "bun:test";
import { ReligionService } from "@services/religion/religion.service";
import type { ReligionResponseDto, CreateReligionDto, UpdateReligionDto } from "@dtos/religion.dto";
import { NotFoundError } from "@cores/errors";

describe("ReligionService", () => {
  const makeMockRepo = () => ({
    findAll: mock(() => Promise.resolve<ReligionResponseDto[]>([])),
    findById: mock(() => Promise.resolve<ReligionResponseDto | null>(null)),
    create: mock((_data: CreateReligionDto) =>
      Promise.resolve<ReligionResponseDto>({
        id: "1",
        name: "Islam",
        description: "Agama Islam",
        remark: null,
        stsActive: null,
        createdAt: new Date(),
        createdBy: null,
        updatedAt: null,
        updatedBy: null,
        deletedAt: null,
      }),
    ),
    update: mock((_id: string, _data: UpdateReligionDto) =>
      Promise.resolve<ReligionResponseDto>({
        id: "1",
        name: "Islam",
        description: "Agama Islam",
        remark: null,
        stsActive: null,
        createdAt: new Date(),
        createdBy: null,
        updatedAt: null,
        updatedBy: null,
        deletedAt: null,
      }),
    ),
    softDelete: mock(() => Promise.resolve()),
  });

  test("findAll delegates to repository", async () => {
    const repo = makeMockRepo();
    const svc = new ReligionService(repo as any);
    await svc.findAll();
    expect(repo.findAll).toHaveBeenCalled();
  });

  test("findById returns null when not found", async () => {
    const repo = makeMockRepo();
    const svc = new ReligionService(repo as any);
    const result = await svc.findById("nonexistent");
    expect(result).toBeNull();
    expect(repo.findById).toHaveBeenCalledWith("nonexistent");
  });

  test("create delegates on valid input", async () => {
    const repo = makeMockRepo();
    const svc = new ReligionService(repo as any);
    const input: CreateReligionDto = { name: "Islam", description: "Agama Islam" };
    await svc.create(input);
    expect(repo.create).toHaveBeenCalledWith(input);
  });

  test("delete throws NotFoundError for non-existent id", async () => {
    const repo = makeMockRepo();
    const svc = new ReligionService(repo as any);
    await expect(svc.delete("nonexistent")).rejects.toThrow(NotFoundError);
  });
});
