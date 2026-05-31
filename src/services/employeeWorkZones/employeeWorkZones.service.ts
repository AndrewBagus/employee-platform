import { injectable, inject } from "inversify";
import { TYPES } from "@cores/types";
import { BaseService } from "@services/base.service";
import {
  EMployeeWorkZoneResponseDto,
  CreateEMployeeWorkZoneSchema,
  CreateEMployeeWorkZoneDto,
  UpdateEMployeeWorkZoneSchema,
  UpdateEMployeeWorkZoneDto,
} from "@dtos/employeeWorkZone.dto";
import type { EmployeeWorkZoneRepositoryInterface } from "@repositories/employeeWorkZones/employeeWorkZones.repository.interface";
import type { EmployeeWorkZoneServiceInterface } from "./employeeWorkZones.service.interface";

@injectable()
export class EmployeeWorkZoneService
  extends BaseService<EMployeeWorkZoneResponseDto, CreateEMployeeWorkZoneDto, UpdateEMployeeWorkZoneDto, EmployeeWorkZoneRepositoryInterface>
  implements EmployeeWorkZoneServiceInterface
{
  constructor(
    @inject(TYPES.EmployeeWorkZoneRepositoryInterface) repository: EmployeeWorkZoneRepositoryInterface,
  ) {
    super(repository, CreateEMployeeWorkZoneSchema, UpdateEMployeeWorkZoneSchema, "EmployeeWorkZone");
  }
}
