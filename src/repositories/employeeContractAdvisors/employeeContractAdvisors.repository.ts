import { injectable, inject } from "inversify";
import { type NodePgDatabase } from "drizzle-orm/node-postgres";
import { TYPES } from "@cores/types";
import { BaseRepository } from "@repositories/base.repository";
import { employeeContractAdvisors } from "@db/schema/employeeContractAdvisors";
import type { EMployeeContractAdvisorResponseDto, CreateEMployeeContractAdvisorDto, UpdateEMployeeContractAdvisorDto } from "@dtos/employeeContractAdvisor.dto";
import type { EmployeeContractAdvisorRepositoryInterface } from "./employeeContractAdvisors.repository.interface";

@injectable()
export class EmployeeContractAdvisorRepository
  extends BaseRepository<
    typeof employeeContractAdvisors,
    EMployeeContractAdvisorResponseDto,
    CreateEMployeeContractAdvisorDto,
    UpdateEMployeeContractAdvisorDto
  >
  implements EmployeeContractAdvisorRepositoryInterface
{
  constructor(
    @inject(TYPES.Database) db: NodePgDatabase,
  ) {
    super(db, employeeContractAdvisors);
  }
}
