import { Container } from "inversify";
import { TYPES } from "../types";
import { ReligionRepository } from "@repositories/religion/religion.repository";
import { ReligionService } from "@services/religion/religion.service";
import { GradeRepository } from "@repositories/grade/grade.repository";
import { GradeService } from "@services/grade/grade.service";
import { CostCenterRepository } from "@repositories/costCenter/costCenter.repository";
import { CostCenterService } from "@services/costCenter/costCenter.service";
import { ProjectRepository } from "@repositories/project/project.repository";
import { ProjectService } from "@services/project/project.service";

export function registerReferenceBindings(container: Container) {
  container.bind(TYPES.ReligionRepositoryInterface).to(ReligionRepository);
  container.bind(TYPES.ReligionServiceInterface).to(ReligionService);
  container.bind(TYPES.GradeRepositoryInterface).to(GradeRepository);
  container.bind(TYPES.GradeServiceInterface).to(GradeService);
  container.bind(TYPES.CostCenterRepositoryInterface).to(CostCenterRepository);
  container.bind(TYPES.CostCenterServiceInterface).to(CostCenterService);
  container.bind(TYPES.ProjectRepositoryInterface).to(ProjectRepository);
  container.bind(TYPES.ProjectServiceInterface).to(ProjectService);
}
