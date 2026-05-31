import { Container } from "inversify";
import { TYPES } from "../types";
import { AllowanceRepository } from "@repositories/allowances/allowances.repository";
import { AllowanceService } from "@services/allowances/allowances.service";
import { WarningGradeRepository } from "@repositories/warningGrades/warningGrades.repository";
import { WarningGradeService } from "@services/warningGrades/warningGrades.service";
import { WarningRepository } from "@repositories/warnings/warnings.repository";
import { WarningService } from "@services/warnings/warnings.service";

export function registerAllowanceBindings(container: Container) {
  container.bind(TYPES.AllowanceRepositoryInterface).to(AllowanceRepository);
  container.bind(TYPES.AllowanceServiceInterface).to(AllowanceService);
  container.bind(TYPES.WarningGradeRepositoryInterface).to(WarningGradeRepository);
  container.bind(TYPES.WarningGradeServiceInterface).to(WarningGradeService);
  container.bind(TYPES.WarningRepositoryInterface).to(WarningRepository);
  container.bind(TYPES.WarningServiceInterface).to(WarningService);
}
