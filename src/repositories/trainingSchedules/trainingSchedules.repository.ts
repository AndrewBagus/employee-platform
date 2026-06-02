import { injectable, inject } from "inversify";
import { type NodePgDatabase } from "drizzle-orm/node-postgres";
import { TYPES } from "@cores/types";
import { BaseRepository } from "@repositories/base.repository";
import { trainingSchedules } from "@db/schema/trainingSchedules";
import type { TrainingScheduleResponseDto, CreateTrainingScheduleDto, UpdateTrainingScheduleDto } from "@dtos/trainingSchedule.dto";
import type { TrainingScheduleRepositoryInterface } from "./trainingSchedules.repository.interface";

@injectable()
export class TrainingScheduleRepository
  extends BaseRepository<
    typeof trainingSchedules,
    TrainingScheduleResponseDto,
    CreateTrainingScheduleDto,
    UpdateTrainingScheduleDto
  >
  implements TrainingScheduleRepositoryInterface
{
  constructor(
    @inject(TYPES.Database) db: NodePgDatabase,
  ) {
    super(db, trainingSchedules);
  }
}
