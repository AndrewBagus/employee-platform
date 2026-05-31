import { injectable, inject } from "inversify";
import { type NodePgDatabase } from "drizzle-orm/node-postgres";
import { TYPES } from "@cores/types";
import { BaseRepository } from "@repositories/base.repository";
import { employeeWorkZones } from "@db/schema/employeeWorkZones";
import type { EMployeeWorkZoneResponseDto, CreateEMployeeWorkZoneDto, UpdateEMployeeWorkZoneDto } from "@dtos/employeeWorkZone.dto";
import type { EmployeeWorkZoneRepositoryInterface } from "./employeeWorkZones.repository.interface";

@injectable()
export class EmployeeWorkZoneRepository
  extends BaseRepository<
    typeof employeeWorkZones,
    EMployeeWorkZoneResponseDto,
    CreateEMployeeWorkZoneDto,
    UpdateEMployeeWorkZoneDto
  >
  implements EmployeeWorkZoneRepositoryInterface
{
  constructor(
    @inject(TYPES.Database) db: NodePgDatabase,
  ) {
    super(db, employeeWorkZones);
  }
}
