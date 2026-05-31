export const TYPES = {
  // Database
  Database: Symbol.for("Database"),

  // Repository layer
  ICompanyRepository: Symbol.for("ICompanyRepository"),

  // Service layer
  ICompanyService: Symbol.for("ICompanyService"),
} as const;
