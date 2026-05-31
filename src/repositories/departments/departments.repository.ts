import { injectable, inject } from "inversify";
import { type NodePgDatabase } from "drizzle-orm/node-postgres";
import { TYPES } from "@cores/types";
import { BaseRepository } from "@repositories/base.repository";
import { departments } from "@db/schema/departments";
import type { DEpartmentResponseDto, CreateDEpartmentDto, UpdateDEpartmentDto } from "@dtos/department.dto";

@injectable()
export class DepartmentRepository extends BaseRepository<
  typeof departments,
  DEpartmentResponseDto,
  CreateDEpartmentDto,
  UpdateDEpartmentDto
> {
  constructor(
    @inject(TYPES.Database) db: NodePgDatabase,
  ) {
    super(db, departments);
  }
}
