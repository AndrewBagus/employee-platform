import { describe, test, expect, mock } from "bun:test";
import { EmployeeWorkZoneService } from "@services/employeeWorkZones/employeeWorkZones.service";
import type { EMployeeWorkZoneResponseDto, CreateEMployeeWorkZoneDto, UpdateEMployeeWorkZoneDto } from "@dtos/employeeWorkZone.dto";
import { NotFoundError } from "@cores/errors";

describe("EmployeeWorkZoneService", () => {
  const makeMockRepo = () => ({
    findAll: mock(() => Promise.resolve<EMployeeWorkZoneResponseDto[]>([])),
    findById: mock(() => Promise.resolve<EMployeeWorkZoneResponseDto | null>(null)),
    create: mock((_data: CreateEMployeeWorkZoneDto) =>
      Promise.resolve<EMployeeWorkZoneResponseDto>({
        id: "1",
        employeeId: "emp-1",
        workingZoneId: "wz-1",
        createdAt: new Date(),
        createdBy: null,
        updatedAt: null,
        updatedBy: null,
        deletedAt: null,
      }),
    ),
    update: mock((_id: string, _data: UpdateEMployeeWorkZoneDto) =>
      Promise.resolve<EMployeeWorkZoneResponseDto>({
        id: "1",
        employeeId: "emp-1",
        workingZoneId: "wz-1",
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
    const svc = new EmployeeWorkZoneService(repo);
    await svc.findAll();
    expect(repo.findAll).toHaveBeenCalled();
  });

  test("findById returns null when not found", async () => {
    const repo = makeMockRepo();
    const svc = new EmployeeWorkZoneService(repo);
    const result = await svc.findById("nonexistent");
    expect(result).toBeNull();
    expect(repo.findById).toHaveBeenCalledWith("nonexistent");
  });

  test("create delegates on valid input", async () => {
    const repo = makeMockRepo();
    const svc = new EmployeeWorkZoneService(repo);
    const input: CreateEMployeeWorkZoneDto = { employeeId: "emp-1", workingZoneId: "wz-1" };
    await svc.create(input);
    expect(repo.create).toHaveBeenCalledWith(input);
  });

  test("delete throws NotFoundError for non-existent id", async () => {
    const repo = makeMockRepo();
    const svc = new EmployeeWorkZoneService(repo);
    await expect(svc.delete("nonexistent")).rejects.toThrow(NotFoundError);
  });
});
