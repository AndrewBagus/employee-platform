import { CountryTypes } from "./types/country.types";
import { CompanyTypes } from "./types/company.types";
import { ReferenceTypes } from "./types/reference.types";
import { AllowanceTypes } from "./types/allowance.types";
import { TrainingTypes } from "./types/training.types";
import { ZoneTypes } from "./types/zone.types";
import { EmployeeTypes } from "./types/employee.types";

export const TYPES = {
  Database: Symbol.for("Database"),
  ...CountryTypes,
  ...CompanyTypes,
  ...ReferenceTypes,
  ...AllowanceTypes,
  ...TrainingTypes,
  ...ZoneTypes,
  ...EmployeeTypes,
} as const;
