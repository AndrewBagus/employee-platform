import { injectable, inject } from "inversify";
import { type NodePgDatabase } from "drizzle-orm/node-postgres";
import { TYPES } from "@cores/types";
import { BaseRepository } from "@repositories/base.repository";
import { religion } from "@db/schema/religion";
import type { ReligionResponseDto, CreateReligionDto, UpdateReligionDto } from "@dtos/religion.dto";

@injectable()
export class ReligionRepository extends BaseRepository<
  typeof religion,
  ReligionResponseDto,
  CreateReligionDto,
  UpdateReligionDto
> {
  constructor(
    @inject(TYPES.Database) db: NodePgDatabase,
  ) {
    super(db, religion);
  }
}
