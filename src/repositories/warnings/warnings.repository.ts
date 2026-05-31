import { injectable, inject } from "inversify";
import { type NodePgDatabase } from "drizzle-orm/node-postgres";
import { TYPES } from "@cores/types";
import { BaseRepository } from "@repositories/base.repository";
import { warnings } from "@db/schema/warnings";
import type { WArningResponseDto, CreateWArningDto, UpdateWArningDto } from "@dtos/warning.dto";
import type { WarningRepositoryInterface } from "./warnings.repository.interface";

@injectable()
export class WarningRepository
  extends BaseRepository<
    typeof warnings,
    WArningResponseDto,
    CreateWArningDto,
    UpdateWArningDto
  >
  implements WarningRepositoryInterface
{
  constructor(
    @inject(TYPES.Database) db: NodePgDatabase,
  ) {
    super(db, warnings);
  }
}
