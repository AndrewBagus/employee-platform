import { injectable, inject } from "inversify";
import { type NodePgDatabase } from "drizzle-orm/node-postgres";
import { TYPES } from "@cores/types";
import { BaseRepository } from "@repositories/base.repository";
import { employeeLeaveAdvisors } from "@db/schema/employeeLeaveAdvisors";
import type { EMployeeLeaveAdvisorResponseDto, CreateEMployeeLeaveAdvisorDto, UpdateEMployeeLeaveAdvisorDto } from "@dtos/employeeLeaveAdvisor.dto";
import type { EmployeeLeaveAdvisorRepositoryInterface } from "./employeeLeaveAdvisors.repository.interface";

@injectable()
export class EmployeeLeaveAdvisorRepository
  extends BaseRepository<
    typeof employeeLeaveAdvisors,
    EMployeeLeaveAdvisorResponseDto,
    CreateEMployeeLeaveAdvisorDto,
    UpdateEMployeeLeaveAdvisorDto
  >
  implements EmployeeLeaveAdvisorRepositoryInterface
{
  constructor(
    @inject(TYPES.Database) db: NodePgDatabase,
  ) {
    super(db, employeeLeaveAdvisors);
  }
}
