import { injectable, inject } from "inversify";
import { TYPES } from "@cores/types";
import { BaseService } from "@services/base.service";
import {
  CreateProjectSchema,
  UpdateProjectSchema,
  type ProjectResponseDto,
  type CreateProjectDto,
  type UpdateProjectDto,
} from "@dtos/project.dto";
import type { ProjectRepositoryInterface } from "@repositories/project/project.repository.interface";
import type { ProjectServiceInterface } from "./project.service.interface";

@injectable()
export class ProjectService
  extends BaseService<ProjectResponseDto, CreateProjectDto, UpdateProjectDto, ProjectRepositoryInterface>
  implements ProjectServiceInterface
{
  constructor(
    @inject(TYPES.ProjectRepositoryInterface) repository: ProjectRepositoryInterface,
  ) {
    super(repository, CreateProjectSchema, UpdateProjectSchema, "Project");
  }
}
