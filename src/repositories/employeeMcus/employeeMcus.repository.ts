import { injectable, inject } from "inversify";
import { type NodePgDatabase } from "drizzle-orm/node-postgres";
import { TYPES } from "@cores/types";
import { BaseRepository } from "@repositories/base.repository";
import { employeeMcus } from "@db/schema/employeeMcus";
import type { EMployeeMcuResponseDto, CreateEMployeeMcuDto, UpdateEMployeeMcuDto } from "@dtos/employeeMcu.dto";

@injectable()
export class EmployeeMcuRepository extends BaseRepository<
  typeof employeeMcus,
  EMployeeMcuResponseDto,
  CreateEMployeeMcuDto,
  UpdateEMployeeMcuDto
> {
  constructor(
    @inject(TYPES.Database) db: NodePgDatabase,
  ) {
    super(db, employeeMcus);
  }
}
