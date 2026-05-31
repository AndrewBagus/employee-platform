import { injectable, inject } from "inversify";
import { type NodePgDatabase } from "drizzle-orm/node-postgres";
import { TYPES } from "@cores/types";
import { BaseRepository } from "@repositories/base.repository";
import { warningGrades } from "@db/schema/warningGrades";
import type { WarningGradeResponseDto, CreateWarningGradeDto, UpdateWarningGradeDto } from "@dtos/warningGrade.dto";
import type { WarningGradeRepositoryInterface } from "./warningGrades.repository.interface";

@injectable()
export class WarningGradeRepository
  extends BaseRepository<
    typeof warningGrades,
    WarningGradeResponseDto,
    CreateWarningGradeDto,
    UpdateWarningGradeDto
  >
  implements WarningGradeRepositoryInterface
{
  constructor(
    @inject(TYPES.Database) db: NodePgDatabase,
  ) {
    super(db, warningGrades);
  }
}
