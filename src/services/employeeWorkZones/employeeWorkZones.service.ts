import { injectable, inject } from "inversify";
import { TYPES } from "@cores/types";
import { BaseService } from "@services/base.service";
import {
  EmployeeWorkZoneResponseDto,
  CreateEmployeeWorkZoneSchema,
  CreateEmployeeWorkZoneDto,
  UpdateEmployeeWorkZoneSchema,
  UpdateEmployeeWorkZoneDto,
} from "@dtos/employeeWorkZone.dto";
import type { EmployeeWorkZoneRepositoryInterface } from "@repositories/employeeWorkZones/employeeWorkZones.repository.interface";
import type { EmployeeWorkZoneServiceInterface } from "./employeeWorkZones.service.interface";

@injectable()
export class EmployeeWorkZoneService
  extends BaseService<EmployeeWorkZoneResponseDto, CreateEmployeeWorkZoneDto, UpdateEmployeeWorkZoneDto, EmployeeWorkZoneRepositoryInterface>
  implements EmployeeWorkZoneServiceInterface
{
  constructor(
    @inject(TYPES.EmployeeWorkZoneRepositoryInterface) repository: EmployeeWorkZoneRepositoryInterface,
  ) {
    super(repository, CreateEmployeeWorkZoneSchema, UpdateEmployeeWorkZoneSchema, "EmployeeWorkZone");
  }
}
