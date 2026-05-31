export const TYPES = {
  // Database
  Database: Symbol.for("Database"),
  CountryRepositoryInterface: Symbol.for("CountryRepositoryInterface"),
  CountryServiceInterface: Symbol.for("CountryServiceInterface"),

  ReligionRepositoryInterface: Symbol.for("ReligionRepositoryInterface"),
  ReligionServiceInterface: Symbol.for("ReligionServiceInterface"),

  GradeRepositoryInterface: Symbol.for("GradeRepositoryInterface"),
  GradeServiceInterface: Symbol.for("GradeServiceInterface"),

  CostCenterRepositoryInterface: Symbol.for("CostCenterRepositoryInterface"),
  CostCenterServiceInterface: Symbol.for("CostCenterServiceInterface"),

  ProjectRepositoryInterface: Symbol.for("ProjectRepositoryInterface"),
  ProjectServiceInterface: Symbol.for("ProjectServiceInterface"),
  // Repository layer
  CompanyRepositoryInterface: Symbol.for("CompanyRepositoryInterface"),

  // Service layer
  CompanyServiceInterface: Symbol.for("CompanyServiceInterface"),
} as const;

