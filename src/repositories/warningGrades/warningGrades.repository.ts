import { injectable, inject } from "inversify";
import { type NodePgDatabase } from "drizzle-orm/node-postgres";
import { TYPES } from "@cores/types";
import { BaseRepository } from "@repositories/base.repository";
import { warningGrades } from "@db/schema/warningGrades";
import type { WArningGradeResponseDto, CreateWArningGradeDto, UpdateWArningGradeDto } from "@dtos/warningGrade.dto";

@injectable()
export class WarningGradeRepository extends BaseRepository<
  typeof warningGrades,
  WArningGradeResponseDto,
  CreateWArningGradeDto,
  UpdateWArningGradeDto
> {
  constructor(
    @inject(TYPES.Database) db: NodePgDatabase,
  ) {
    super(db, warningGrades);
  }
}
