import { describe, test, expect, mock } from "bun:test";
import { EmployeeService } from "@services/employees/employees.service";
import type { EMployeeResponseDto, CreateEMployeeDto, UpdateEMployeeDto } from "@dtos/employee.dto";
import { NotFoundError } from "@cores/errors";

describe("EmployeeService", () => {
  const makeMockRepo = () => ({
    findAll: mock(() => Promise.resolve<EMployeeResponseDto[]>([])),
    findById: mock(() => Promise.resolve<EMployeeResponseDto | null>(null)),
    create: mock((_data: CreateEMployeeDto) =>
      Promise.resolve<EMployeeResponseDto>({
        id: "1",
        companyId: "c-1",
        departmentId: "dept-1",
        positionId: "pos-1",
        supervisorId: null,
        fingerId: "F001",
        firstName: "John",
        middleName: null,
        lastName: null,
        email: "john@example.com",
        phone: null,
        mobile: null,
        birthDate: null,
        birthPlace: null,
        gender: null,
        maritalStatus: null,
        employeeType: null,
        employeeStatus: null,
        remark: null,
      }),
    ),
    update: mock((_id: string, _data: UpdateEMployeeDto) =>
      Promise.resolve<EMployeeResponseDto>({
        id: "1",
        companyId: "c-1",
        departmentId: "dept-1",
        positionId: "pos-1",
        supervisorId: null,
        fingerId: "F001",
        firstName: "John",
        middleName: null,
        lastName: null,
        email: "john@example.com",
        phone: null,
        mobile: null,
        birthDate: null,
        birthPlace: null,
        gender: null,
        maritalStatus: null,
        employeeType: null,
        employeeStatus: null,
        remark: null,
      }),
    ),
    softDelete: mock(() => Promise.resolve()),
  });

  test("findAll delegates to repository", async () => {
    const repo = makeMockRepo();
    const svc = new EmployeeService(repo);
    await svc.findAll();
    expect(repo.findAll).toHaveBeenCalled();
  });

  test("findById returns null when not found", async () => {
    const repo = makeMockRepo();
    const svc = new EmployeeService(repo);
    const result = await svc.findById("nonexistent");
    expect(result).toBeNull();
    expect(repo.findById).toHaveBeenCalledWith("nonexistent");
  });

  test("create delegates on valid input", async () => {
    const repo = makeMockRepo();
    const svc = new EmployeeService(repo);
    const input: CreateEMployeeDto = {
      companyId: "c-1",
      departmentId: "dept-1",
      positionId: "pos-1",
      fingerId: "F001",
      firstName: "John",
      email: "john@example.com",
    };
    await svc.create(input);
    expect(repo.create).toHaveBeenCalledWith(input);
  });

  test("delete throws NotFoundError for non-existent id", async () => {
    const repo = makeMockRepo();
    const svc = new EmployeeService(repo);
    await expect(svc.delete("nonexistent")).rejects.toThrow(NotFoundError);
  });
});
