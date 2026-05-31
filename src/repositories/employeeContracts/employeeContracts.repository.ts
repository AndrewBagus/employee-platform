import { injectable, inject } from "inversify";
import { type NodePgDatabase } from "drizzle-orm/node-postgres";
import { TYPES } from "@cores/types";
import { BaseRepository } from "@repositories/base.repository";
import { employeeContracts } from "@db/schema/employeeContracts";
import type { EMployeeContractResponseDto, CreateEMployeeContractDto, UpdateEMployeeContractDto } from "@dtos/employeeContract.dto";

@injectable()
export class EmployeeContractRepository extends BaseRepository<
  typeof employeeContracts,
  EMployeeContractResponseDto,
  CreateEMployeeContractDto,
  UpdateEMployeeContractDto
> {
  constructor(
    @inject(TYPES.Database) db: NodePgDatabase,
  ) {
    super(db, employeeContracts);
  }
}
