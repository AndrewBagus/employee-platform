import { injectable, inject } from "inversify";
import { type NodePgDatabase } from "drizzle-orm/node-postgres";
import { TYPES } from "@cores/types";
import { BaseRepository } from "@repositories/base.repository";
import { workingZones } from "@db/schema/workingZones";
import type { WOrkingZoneResponseDto, CreateWOrkingZoneDto, UpdateWOrkingZoneDto } from "@dtos/workingZone.dto";
import type { WorkingZoneRepositoryInterface } from "./workingZones.repository.interface";

@injectable()
export class WorkingZoneRepository
  extends BaseRepository<
    typeof workingZones,
    WOrkingZoneResponseDto,
    CreateWOrkingZoneDto,
    UpdateWOrkingZoneDto
  >
  implements WorkingZoneRepositoryInterface
{
  constructor(
    @inject(TYPES.Database) db: NodePgDatabase,
  ) {
    super(db, workingZones);
  }
}
