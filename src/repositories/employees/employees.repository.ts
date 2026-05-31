import { injectable, inject } from "inversify";
import { type NodePgDatabase } from "drizzle-orm/node-postgres";
import { TYPES } from "@cores/types";
import { BaseRepository } from "@repositories/base.repository";
import { employees } from "@db/schema/employees";
import type { EMployeeResponseDto, CreateEMployeeDto, UpdateEMployeeDto } from "@dtos/employee.dto";
import type { EmployeeRepositoryInterface } from "./employees.repository.interface";

@injectable()
export class EmployeeRepository
  extends BaseRepository<
    typeof employees,
    EMployeeResponseDto,
    CreateEMployeeDto,
    UpdateEMployeeDto
  >
  implements EmployeeRepositoryInterface
{
  constructor(
    @inject(TYPES.Database) db: NodePgDatabase,
  ) {
    super(db, employees);
  }
}
