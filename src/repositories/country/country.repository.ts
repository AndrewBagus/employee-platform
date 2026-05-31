import { injectable, inject } from "inversify";
import { type NodePgDatabase } from "drizzle-orm/node-postgres";
import { TYPES } from "@cores/types";
import { BaseRepository } from "@repositories/base.repository";
import { countries } from "@db/schema/countries";
import type { CountryResponseDto, CreateCountryDto, UpdateCountryDto } from "@dtos/country.dto";

@injectable()
export class CountryRepository extends BaseRepository<
  typeof countries,
  CountryResponseDto,
  CreateCountryDto,
  UpdateCountryDto
> {
  constructor(
    @inject(TYPES.Database) db: NodePgDatabase,
  ) {
    super(db, countries);
  }
}
