import { injectable, inject } from "inversify";
import { type NodePgDatabase } from "drizzle-orm/node-postgres";
import { TYPES } from "@cores/types";
import { BaseRepository } from "@repositories/base.repository";
import { employeeTrainings } from "@db/schema/employeeTrainings";
import type { EmployeeTrainingResponseDto, CreateEmployeeTrainingDto, UpdateEmployeeTrainingDto } from "@dtos/employeeTraining.dto";
import type { EmployeeTrainingRepositoryInterface } from "./employeeTrainings.repository.interface";

@injectable()
export class EmployeeTrainingRepository
  extends BaseRepository<
    typeof employeeTrainings,
    EmployeeTrainingResponseDto,
    CreateEmployeeTrainingDto,
    UpdateEmployeeTrainingDto
  >
  implements EmployeeTrainingRepositoryInterface
{
  constructor(
    @inject(TYPES.Database) db: NodePgDatabase,
  ) {
    super(db, employeeTrainings);
  }
}
