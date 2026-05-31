import { injectable, inject } from "inversify";
import { type NodePgDatabase } from "drizzle-orm/node-postgres";
import { TYPES } from "@cores/types";
import { BaseRepository } from "@repositories/base.repository";
import { allowances } from "@db/schema/allowances";
import type { ALlowanceResponseDto, CreateALlowanceDto, UpdateALlowanceDto } from "@dtos/allowance.dto";
import type { AllowanceRepositoryInterface } from "./allowances.repository.interface";

@injectable()
export class AllowanceRepository
  extends BaseRepository<
    typeof allowances,
    ALlowanceResponseDto,
    CreateALlowanceDto,
    UpdateALlowanceDto
  >
  implements AllowanceRepositoryInterface
{
  constructor(
    @inject(TYPES.Database) db: NodePgDatabase,
  ) {
    super(db, allowances);
  }
}
