import { injectable, inject } from "inversify";
import { type NodePgDatabase } from "drizzle-orm/node-postgres";
import { TYPES } from "@cores/types";
import { BaseRepository } from "@repositories/base.repository";
import { trainingTypes } from "@db/schema/trainingTypes";
import type { TRainingTypeResponseDto, CreateTRainingTypeDto, UpdateTRainingTypeDto } from "@dtos/trainingType.dto";

@injectable()
export class TrainingTypeRepository extends BaseRepository<
  typeof trainingTypes,
  TRainingTypeResponseDto,
  CreateTRainingTypeDto,
  UpdateTRainingTypeDto
> {
  constructor(
    @inject(TYPES.Database) db: NodePgDatabase,
  ) {
    super(db, trainingTypes);
  }
}
