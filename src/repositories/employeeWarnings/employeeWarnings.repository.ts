import { injectable, inject } from "inversify";
import { type NodePgDatabase } from "drizzle-orm/node-postgres";
import { TYPES } from "@cores/types";
import { BaseRepository } from "@repositories/base.repository";
import { employeeWarnings } from "@db/schema/employeeWarnings";
import type { EMployeeWarningResponseDto, CreateEMployeeWarningDto, UpdateEMployeeWarningDto } from "@dtos/employeeWarning.dto";

@injectable()
export class EmployeeWarningRepository extends BaseRepository<
  typeof employeeWarnings,
  EMployeeWarningResponseDto,
  CreateEMployeeWarningDto,
  UpdateEMployeeWarningDto
> {
  constructor(
    @inject(TYPES.Database) db: NodePgDatabase,
  ) {
    super(db, employeeWarnings);
  }
}
