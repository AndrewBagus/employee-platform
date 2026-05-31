import { injectable, inject } from "inversify";
import { type NodePgDatabase } from "drizzle-orm/node-postgres";
import { TYPES } from "@cores/types";
import { BaseRepository } from "@repositories/base.repository";
import { employeeAddresses } from "@db/schema/employeeAddresses";
import type { EmployeeAddressResponseDto, CreateEmployeeAddressDto, UpdateEmployeeAddressDto } from "@dtos/employeeAddress.dto";
import type { EmployeeAddressRepositoryInterface } from "./employeeAddresses.repository.interface";

@injectable()
export class EmployeeAddressRepository
  extends BaseRepository<
    typeof employeeAddresses,
    EmployeeAddressResponseDto,
    CreateEmployeeAddressDto,
    UpdateEmployeeAddressDto
  >
  implements EmployeeAddressRepositoryInterface
{
  constructor(
    @inject(TYPES.Database) db: NodePgDatabase,
  ) {
    super(db, employeeAddresses);
  }
}
