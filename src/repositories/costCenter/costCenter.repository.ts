import { injectable, inject } from "inversify";
import { type NodePgDatabase } from "drizzle-orm/node-postgres";
import { TYPES } from "@cores/types";
import { BaseRepository } from "@repositories/base.repository";
import { costCenters } from "@db/schema/costCenters";
import type { CostCenterResponseDto, CreateCostCenterDto, UpdateCostCenterDto } from "@dtos/costCenter.dto";
import type { CostCenterRepositoryInterface } from "./costCenter.repository.interface";

@injectable()
export class CostCenterRepository
  extends BaseRepository<
    typeof costCenters,
    CostCenterResponseDto,
    CreateCostCenterDto,
    UpdateCostCenterDto
  >
  implements CostCenterRepositoryInterface
{
  constructor(
    @inject(TYPES.Database) db: NodePgDatabase,
  ) {
    super(db, costCenters);
  }
}
