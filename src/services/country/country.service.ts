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
import type { CountryRepositoryInterface } from "@repositories/country/country.repository.interface";
import type { CountryServiceInterface } from "./country.service.interface";

@injectable()
export class CountryService
  extends BaseService<CountryResponseDto, CreateCountryDto, UpdateCountryDto, CountryRepositoryInterface>
  implements CountryServiceInterface
{
  constructor(
    @inject(TYPES.CountryRepositoryInterface) repository: CountryRepositoryInterface,
  ) {
    super(repository, CreateCountrySchema, UpdateCountrySchema, "Country");
  }
}
