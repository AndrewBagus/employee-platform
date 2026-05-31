import { injectable, inject } from "inversify";
import { type NodePgDatabase } from "drizzle-orm/node-postgres";
import { TYPES } from "@cores/types";
import { BaseRepository } from "@repositories/base.repository";
import { employeeContractAdvisors } from "@db/schema/employeeContractAdvisors";
import type { EmployeeContractAdvisorResponseDto, CreateEmployeeContractAdvisorDto, UpdateEmployeeContractAdvisorDto } from "@dtos/employeeContractAdvisor.dto";
import type { EmployeeContractAdvisorRepositoryInterface } from "./employeeContractAdvisors.repository.interface";

@injectable()
export class EmployeeContractAdvisorRepository
  extends BaseRepository<
    typeof employeeContractAdvisors,
    EmployeeContractAdvisorResponseDto,
    CreateEmployeeContractAdvisorDto,
    UpdateEmployeeContractAdvisorDto
  >
  implements EmployeeContractAdvisorRepositoryInterface
{
  constructor(
    @inject(TYPES.Database) db: NodePgDatabase,
  ) {
    super(db, employeeContractAdvisors);
  }
}
