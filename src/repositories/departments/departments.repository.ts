import { injectable, inject } from "inversify";
import { type NodePgDatabase } from "drizzle-orm/node-postgres";
import { TYPES } from "@cores/types";
import { BaseRepository } from "@repositories/base.repository";
import { departments } from "@db/schema/departments";
import type { DEpartmentResponseDto, CreateDEpartmentDto, UpdateDEpartmentDto } from "@dtos/department.dto";
import type { DepartmentRepositoryInterface } from "./departments.repository.interface";

@injectable()
export class DepartmentRepository
  extends BaseRepository<
    typeof departments,
    DEpartmentResponseDto,
    CreateDEpartmentDto,
    UpdateDEpartmentDto
  >
  implements DepartmentRepositoryInterface
{
  constructor(
    @inject(TYPES.Database) db: NodePgDatabase,
  ) {
    super(db, departments);
  }
}
