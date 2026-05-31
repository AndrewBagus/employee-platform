import { injectable, inject } from "inversify";
import { type NodePgDatabase } from "drizzle-orm/node-postgres";
import { TYPES } from "@cores/types";
import { BaseRepository } from "@repositories/base.repository";
import { positions } from "@db/schema/positions";
import type { PositionResponseDto, CreatePositionDto, UpdatePositionDto } from "@dtos/position.dto";
import type { PositionRepositoryInterface } from "./positions.repository.interface";

@injectable()
export class PositionRepository
  extends BaseRepository<
    typeof positions,
    PositionResponseDto,
    CreatePositionDto,
    UpdatePositionDto
  >
  implements PositionRepositoryInterface
{
  constructor(
    @inject(TYPES.Database) db: NodePgDatabase,
  ) {
    super(db, positions);
  }
}
