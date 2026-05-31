import { injectable, inject } from "inversify";
import { type NodePgDatabase } from "drizzle-orm/node-postgres";
import { TYPES } from "@cores/types";
import { BaseRepository } from "@repositories/base.repository";
import { trainingTypes } from "@db/schema/trainingTypes";
import type { TRainingTypeResponseDto, CreateTRainingTypeDto, UpdateTRainingTypeDto } from "@dtos/trainingType.dto";
import type { TrainingTypeRepositoryInterface } from "./trainingTypes.repository.interface";

@injectable()
export class TrainingTypeRepository
  extends BaseRepository<
    typeof trainingTypes,
    TRainingTypeResponseDto,
    CreateTRainingTypeDto,
    UpdateTRainingTypeDto
  >
  implements TrainingTypeRepositoryInterface
{
  constructor(
    @inject(TYPES.Database) db: NodePgDatabase,
  ) {
    super(db, trainingTypes);
  }
}
