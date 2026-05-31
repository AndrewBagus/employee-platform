import { injectable, inject } from "inversify";
import { type NodePgDatabase } from "drizzle-orm/node-postgres";
import { TYPES } from "@cores/types";
import { BaseRepository } from "@repositories/base.repository";
import { employeeWarnings } from "@db/schema/employeeWarnings";
import type { EmployeeWarningResponseDto, CreateEmployeeWarningDto, UpdateEmployeeWarningDto } from "@dtos/employeeWarning.dto";
import type { EmployeeWarningRepositoryInterface } from "./employeeWarnings.repository.interface";

@injectable()
export class EmployeeWarningRepository
  extends BaseRepository<
    typeof employeeWarnings,
    EmployeeWarningResponseDto,
    CreateEmployeeWarningDto,
    UpdateEmployeeWarningDto
  >
  implements EmployeeWarningRepositoryInterface
{
  constructor(
    @inject(TYPES.Database) db: NodePgDatabase,
  ) {
    super(db, employeeWarnings);
  }
}
