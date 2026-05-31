import { injectable, inject } from "inversify";
import { TYPES } from "@cores/types";
import { BaseService } from "@services/base.service";
import {
  CreateCountrySchema,
  UpdateCountrySchema,
  type CountryResponseDto,
  type CreateCountryDto,
  type UpdateCountryDto,
} from "@dtos/country.dto";
import type { CountryRepository } from "@repositories/country/country.repository";

@injectable()
export class CountryService extends BaseService<
  CountryResponseDto,
  CreateCountryDto,
  UpdateCountryDto,
  CountryRepository
> {
  constructor(
    @inject(TYPES.CountryRepositoryInterface) repository: CountryRepository,
  ) {
    super(repository, CreateCountrySchema, UpdateCountrySchema, "Country");
  }
}
