import { injectable, inject } from "inversify";
import { type NodePgDatabase } from "drizzle-orm/node-postgres";
import { TYPES } from "@cores/types";
import { BaseRepository } from "@repositories/base.repository";
import { employeeProjects } from "@db/schema/employeeProjects";
import type { EmployeeProjectResponseDto, CreateEmployeeProjectDto, UpdateEmployeeProjectDto } from "@dtos/employeeProject.dto";
import type { EmployeeProjectRepositoryInterface } from "./employeeProjects.repository.interface";

@injectable()
export class EmployeeProjectRepository
  extends BaseRepository<
    typeof employeeProjects,
    EmployeeProjectResponseDto,
    CreateEmployeeProjectDto,
    UpdateEmployeeProjectDto
  >
  implements EmployeeProjectRepositoryInterface
{
  constructor(
    @inject(TYPES.Database) db: NodePgDatabase,
  ) {
    super(db, employeeProjects);
  }

  async findById(_id: string): Promise<EmployeeProjectResponseDto | null> {
    throw new Error("findById not supported — employeeProjects uses composite PK (employeeId, projectId)");
  }

  async update(_id: string, _data: UpdateEmployeeProjectDto): Promise<EmployeeProjectResponseDto | null> {
    throw new Error("update not supported — employeeProjects uses composite PK (employeeId, projectId)");
  }
}
