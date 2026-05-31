import { injectable, inject } from "inversify";
import { type NodePgDatabase } from "drizzle-orm/node-postgres";
import { TYPES } from "@cores/types";
import { BaseRepository } from "@repositories/base.repository";
import { projects } from "@db/schema/projects";
import type { ProjectResponseDto, CreateProjectDto, UpdateProjectDto } from "@dtos/project.dto";

@injectable()
export class ProjectRepository extends BaseRepository<
  typeof projects,
  ProjectResponseDto,
  CreateProjectDto,
  UpdateProjectDto
> {
  constructor(
    @inject(TYPES.Database) db: NodePgDatabase,
  ) {
    super(db, projects);
  }
}
