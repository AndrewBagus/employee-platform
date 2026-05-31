import { describe, test, expect, mock } from "bun:test";
import { WorkingZoneService } from "@services/workingZones/workingZones.service";
import type { WOrkingZoneResponseDto, CreateWOrkingZoneDto, UpdateWOrkingZoneDto } from "@dtos/workingZone.dto";
import { NotFoundError } from "@cores/errors";

describe("WorkingZoneService", () => {
  const makeMockRepo = () => ({
    findAll: mock(() => Promise.resolve<WOrkingZoneResponseDto[]>([])),
    findById: mock(() => Promise.resolve<WOrkingZoneResponseDto | null>(null)),
    create: mock((_data: CreateWOrkingZoneDto) =>
      Promise.resolve<WOrkingZoneResponseDto>({
        id: "1",
        companyId: "00000000-0000-4000-8000-000000000001",
        name: "Zone A",
        remark: null,
      }),
    ),
    update: mock((_id: string, _data: UpdateWOrkingZoneDto) =>
      Promise.resolve<WOrkingZoneResponseDto>({
        id: "1",
        companyId: "00000000-0000-4000-8000-000000000001",
        name: "Zone A",
        remark: null,
      }),
    ),
    softDelete: mock(() => Promise.resolve()),
  });

  test("findAll delegates to repository", async () => {
    const repo = makeMockRepo();
    const svc = new WorkingZoneService(repo as any);
    await svc.findAll();
    expect(repo.findAll).toHaveBeenCalled();
  });

  test("findById returns null when not found", async () => {
    const repo = makeMockRepo();
    const svc = new WorkingZoneService(repo as any);
    const result = await svc.findById("nonexistent");
    expect(result).toBeNull();
    expect(repo.findById).toHaveBeenCalledWith("nonexistent");
  });

  test("create delegates on valid input", async () => {
    const repo = makeMockRepo();
    const svc = new WorkingZoneService(repo as any);
    const input: CreateWOrkingZoneDto = { companyId: "00000000-0000-4000-8000-000000000001", name: "Zone A" };
    await svc.create(input);
    expect(repo.create).toHaveBeenCalledWith(input);
  });

  test("delete throws NotFoundError for non-existent id", async () => {
    const repo = makeMockRepo();
    const svc = new WorkingZoneService(repo as any);
    await expect(svc.delete("nonexistent")).rejects.toThrow(NotFoundError);
  });
});
