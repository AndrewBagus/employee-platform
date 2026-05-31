import { injectable, inject } from "inversify";
import { type NodePgDatabase } from "drizzle-orm/node-postgres";
import { TYPES } from "@cores/types";
import { BaseRepository } from "@repositories/base.repository";
import { grades } from "@db/schema/grades";
import type { GradeResponseDto, CreateGradeDto, UpdateGradeDto } from "@dtos/grade.dto";
import type { GradeRepositoryInterface } from "./grade.repository.interface";

@injectable()
export class GradeRepository
  extends BaseRepository<
    typeof grades,
    GradeResponseDto,
    CreateGradeDto,
    UpdateGradeDto
  >
  implements GradeRepositoryInterface
{
  constructor(
    @inject(TYPES.Database) db: NodePgDatabase,
  ) {
    super(db, grades);
  }
}
