import { injectable, inject } from "inversify";
import { type NodePgDatabase } from "drizzle-orm/node-postgres";
import { TYPES } from "@cores/types";
import { BaseRepository } from "@repositories/base.repository";
import { employeeProjects } from "@db/schema/employeeProjects";
import type { EMployeeProjectResponseDto, CreateEMployeeProjectDto, UpdateEMployeeProjectDto } from "@dtos/employeeProject.dto";

@injectable()
export class EmployeeProjectRepository extends BaseRepository<
  typeof employeeProjects,
  EMployeeProjectResponseDto,
  CreateEMployeeProjectDto,
  UpdateEMployeeProjectDto
> {
  constructor(
    @inject(TYPES.Database) db: NodePgDatabase,
  ) {
    super(db, employeeProjects);
  }

  async findById(_id: string): Promise<EMployeeProjectResponseDto | null> {
    throw new Error("findById not supported — employeeProjects uses composite PK (employeeId, projectId)");
  }

  async update(_id: string, _data: UpdateEMployeeProjectDto): Promise<EMployeeProjectResponseDto | null> {
    throw new Error("update not supported — employeeProjects uses composite PK (employeeId, projectId)");
  }
}
