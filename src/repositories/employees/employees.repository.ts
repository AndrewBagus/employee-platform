import { injectable, inject } from "inversify";
import { type NodePgDatabase } from "drizzle-orm/node-postgres";
import { eq, sql } from "drizzle-orm";
import { TYPES } from "@cores/types";
import { BaseRepository } from "@repositories/base.repository";
import { employees } from "@db/schema/employees";
import { employeeAddresses } from "@db/schema/employeeAddresses";
import { employeeContracts } from "@db/schema/employeeContracts";
import { employeeContractAdvisors } from "@db/schema/employeeContractAdvisors";
import { employeeLeaveAdvisors } from "@db/schema/employeeLeaveAdvisors";
import { employeeMcus } from "@db/schema/employeeMcus";
import { employeeProjects } from "@db/schema/employeeProjects";
import { employeeTrainings } from "@db/schema/employeeTrainings";
import { employeeWarnings } from "@db/schema/employeeWarnings";
import { employeeWorkZones } from "@db/schema/employeeWorkZones";
import type { EmployeeResponseDto, CreateEmployeeDto, UpdateEmployeeDto } from "@dtos/employee.dto";
import type { EmployeeRepositoryInterface } from "./employees.repository.interface";

@injectable()
export class EmployeeRepository
  extends BaseRepository<typeof employees, EmployeeResponseDto, CreateEmployeeDto, UpdateEmployeeDto>
  implements EmployeeRepositoryInterface
{
  constructor(
    @inject(TYPES.Database) db: NodePgDatabase,
  ) {
    super(db, employees);
  }

  override async softDelete(id: string): Promise<void> {
    await this.db.transaction(async (tx) => {
      const now = sql`now()`;

      // Cascade soft-delete to all employee sub-tables
      await tx.update(employeeAddresses).set({ stsActive: false, deletedAt: now }).where(eq(employeeAddresses.employeeId, id));
      await tx.update(employeeContracts).set({ stsActive: false, deletedAt: now }).where(eq(employeeContracts.employeeId, id));
      await tx.update(employeeContractAdvisors).set({ stsActive: false, deletedAt: now }).where(eq(employeeContractAdvisors.employeeId, id));
      await tx.update(employeeLeaveAdvisors).set({ stsActive: false, deletedAt: now }).where(eq(employeeLeaveAdvisors.employeeId, id));
      await tx.update(employeeMcus).set({ stsActive: false, deletedAt: now }).where(eq(employeeMcus.employeeId, id));
      await tx.update(employeeProjects).set({ stsActive: false, deletedAt: now }).where(eq(employeeProjects.employeeId, id));
      await tx.update(employeeTrainings).set({ stsActive: false, deletedAt: now }).where(eq(employeeTrainings.employeeId, id));
      await tx.update(employeeWarnings).set({ stsActive: false, deletedAt: now }).where(eq(employeeWarnings.employeeId, id));
      await tx.update(employeeWorkZones).set({ stsActive: false, deletedAt: now }).where(eq(employeeWorkZones.employeeId, id));

      // Soft-delete the employee itself
      await tx
        .update(employees)
        .set({ stsActive: false, deletedAt: now })
        .where(eq(employees.id, id));
    });
  }
}
