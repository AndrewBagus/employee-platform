import { injectable, inject } from "inversify";
import { type NodePgDatabase } from "drizzle-orm/node-postgres";
import { TYPES } from "@cores/types";
import { BaseRepository } from "@repositories/base.repository";
import { employeeTrainings } from "@db/schema/employeeTrainings";
import type { EMployeeTrainingResponseDto, CreateEMployeeTrainingDto, UpdateEMployeeTrainingDto } from "@dtos/employeeTraining.dto";

@injectable()
export class EmployeeTrainingRepository extends BaseRepository<
  typeof employeeTrainings,
  EMployeeTrainingResponseDto,
  CreateEMployeeTrainingDto,
  UpdateEMployeeTrainingDto
> {
  constructor(
    @inject(TYPES.Database) db: NodePgDatabase,
  ) {
    super(db, employeeTrainings);
  }
}
