import { injectable, inject } from "inversify";
import { type NodePgDatabase } from "drizzle-orm/node-postgres";
import { TYPES } from "@cores/types";
import { BaseRepository } from "@repositories/base.repository";
import { trainings } from "@db/schema/trainings";
import type { TRainingResponseDto, CreateTRainingDto, UpdateTRainingDto } from "@dtos/training.dto";

@injectable()
export class TrainingRepository extends BaseRepository<
  typeof trainings,
  TRainingResponseDto,
  CreateTRainingDto,
  UpdateTRainingDto
> {
  constructor(
    @inject(TYPES.Database) db: NodePgDatabase,
  ) {
    super(db, trainings);
  }
}
