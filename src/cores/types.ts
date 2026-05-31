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

  // Group B — Repository layer
  DepartmentRepositoryInterface: Symbol.for("DepartmentRepositoryInterface"),
  PositionRepositoryInterface: Symbol.for("PositionRepositoryInterface"),
  AllowanceRepositoryInterface: Symbol.for("AllowanceRepositoryInterface"),
  WarningGradeRepositoryInterface: Symbol.for("WarningGradeRepositoryInterface"),
  WarningRepositoryInterface: Symbol.for("WarningRepositoryInterface"),
  TrainingTypeRepositoryInterface: Symbol.for("TrainingTypeRepositoryInterface"),
  TrainingRepositoryInterface: Symbol.for("TrainingRepositoryInterface"),
  TrainingScheduleRepositoryInterface: Symbol.for("TrainingScheduleRepositoryInterface"),
  WorkingZoneRepositoryInterface: Symbol.for("WorkingZoneRepositoryInterface"),

  // Group B
  DepartmentServiceInterface: Symbol.for("DepartmentServiceInterface"),
  PositionServiceInterface: Symbol.for("PositionServiceInterface"),
  AllowanceServiceInterface: Symbol.for("AllowanceServiceInterface"),
  WarningGradeServiceInterface: Symbol.for("WarningGradeServiceInterface"),
  WarningServiceInterface: Symbol.for("WarningServiceInterface"),
  TrainingTypeServiceInterface: Symbol.for("TrainingTypeServiceInterface"),
  TrainingServiceInterface: Symbol.for("TrainingServiceInterface"),
  TrainingScheduleServiceInterface: Symbol.for("TrainingScheduleServiceInterface"),
  WorkingZoneServiceInterface: Symbol.for("WorkingZoneServiceInterface"),

  // Group C — Employees
  EmployeeRepositoryInterface: Symbol.for("EmployeeRepositoryInterface"),
  EmployeeServiceInterface: Symbol.for("EmployeeServiceInterface"),

  // Group D — Employee sub-tables
  EmployeeAddressRepositoryInterface: Symbol.for("EmployeeAddressRepositoryInterface"),
  EmployeeAddressServiceInterface: Symbol.for("EmployeeAddressServiceInterface"),
  EmployeeContractRepositoryInterface: Symbol.for("EmployeeContractRepositoryInterface"),
  EmployeeContractServiceInterface: Symbol.for("EmployeeContractServiceInterface"),
  EmployeeContractAdvisorRepositoryInterface: Symbol.for("EmployeeContractAdvisorRepositoryInterface"),
  EmployeeContractAdvisorServiceInterface: Symbol.for("EmployeeContractAdvisorServiceInterface"),
  EmployeeLeaveAdvisorRepositoryInterface: Symbol.for("EmployeeLeaveAdvisorRepositoryInterface"),
  EmployeeLeaveAdvisorServiceInterface: Symbol.for("EmployeeLeaveAdvisorServiceInterface"),
  EmployeeMcuRepositoryInterface: Symbol.for("EmployeeMcuRepositoryInterface"),
  EmployeeMcuServiceInterface: Symbol.for("EmployeeMcuServiceInterface"),
  EmployeeProjectRepositoryInterface: Symbol.for("EmployeeProjectRepositoryInterface"),
  EmployeeProjectServiceInterface: Symbol.for("EmployeeProjectServiceInterface"),
  EmployeeTrainingRepositoryInterface: Symbol.for("EmployeeTrainingRepositoryInterface"),
  EmployeeTrainingServiceInterface: Symbol.for("EmployeeTrainingServiceInterface"),
  EmployeeWarningRepositoryInterface: Symbol.for("EmployeeWarningRepositoryInterface"),
  EmployeeWarningServiceInterface: Symbol.for("EmployeeWarningServiceInterface"),
  EmployeeWorkZoneRepositoryInterface: Symbol.for("EmployeeWorkZoneRepositoryInterface"),
  EmployeeWorkZoneServiceInterface: Symbol.for("EmployeeWorkZoneServiceInterface"),
} as const;

