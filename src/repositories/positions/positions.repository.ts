import { injectable, inject } from "inversify";
import { type NodePgDatabase } from "drizzle-orm/node-postgres";
import { TYPES } from "@cores/types";
import { BaseRepository } from "@repositories/base.repository";
import { positions } from "@db/schema/positions";
import type { POsitionResponseDto, CreatePOsitionDto, UpdatePOsitionDto } from "@dtos/position.dto";

@injectable()
export class PositionRepository extends BaseRepository<
  typeof positions,
  POsitionResponseDto,
  CreatePOsitionDto,
  UpdatePOsitionDto
> {
  constructor(
    @inject(TYPES.Database) db: NodePgDatabase,
  ) {
    super(db, positions);
  }
}
