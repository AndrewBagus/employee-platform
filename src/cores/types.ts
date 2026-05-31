export const TYPES = {
  // Database
  Database: Symbol.for("Database"),

  // Repository layer
  CompanyRepositoryInterface: Symbol.for("CompanyRepositoryInterface"),

  // Service layer
  CompanyServiceInterface: Symbol.for("CompanyServiceInterface"),
} as const;
