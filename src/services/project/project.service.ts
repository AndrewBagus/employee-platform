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
import type { ProjectRepository } from "@repositories/project/project.repository";

@injectable()
export class ProjectService extends BaseService<
  ProjectResponseDto,
  CreateProjectDto,
  UpdateProjectDto,
  ProjectRepository
> {
  constructor(
    @inject(TYPES.ProjectRepositoryInterface) repository: ProjectRepository,
  ) {
    super(repository, CreateProjectSchema, UpdateProjectSchema, "Project");
  }
}
