import { injectable, inject } from "inversify";
import { type NodePgDatabase } from "drizzle-orm/node-postgres";
import { TYPES } from "@cores/types";
import { BaseRepository } from "@repositories/base.repository";
import { employeeContracts } from "@db/schema/employeeContracts";
import type { EmployeeContractResponseDto, CreateEmployeeContractDto, UpdateEmployeeContractDto } from "@dtos/employeeContract.dto";
import type { EmployeeContractRepositoryInterface } from "./employeeContracts.repository.interface";

@injectable()
export class EmployeeContractRepository
  extends BaseRepository<
    typeof employeeContracts,
    EmployeeContractResponseDto,
    CreateEmployeeContractDto,
    UpdateEmployeeContractDto
  >
  implements EmployeeContractRepositoryInterface
{
  constructor(
    @inject(TYPES.Database) db: NodePgDatabase,
  ) {
    super(db, employeeContracts);
  }
}
