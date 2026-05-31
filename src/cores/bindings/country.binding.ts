import { Container } from "inversify";
import { TYPES } from "../types";
import { CountryRepository } from "@repositories/country/country.repository";
import { CountryService } from "@services/country/country.service";

export function registerCountryBindings(container: Container) {
  container.bind(TYPES.CountryRepositoryInterface).to(CountryRepository);
  container.bind(TYPES.CountryServiceInterface).to(CountryService);
}
