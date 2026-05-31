import { MasterTypes } from "./types/master.types";
import { EmployeeTypes } from "./types/employee.types";

export const TYPES = {
  Database: Symbol.for("Database"),
  ...MasterTypes,
  ...EmployeeTypes,
} as const;
