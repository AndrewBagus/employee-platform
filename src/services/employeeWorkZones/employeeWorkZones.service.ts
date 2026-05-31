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
import type { EmployeeWorkZoneRepository } from "@repositories/employeeWorkZones/employeeWorkZones.repository";

@injectable()
export class EmployeeWorkZoneService extends BaseService<
  EMployeeWorkZoneResponseDto,
  CreateEMployeeWorkZoneDto,
  UpdateEMployeeWorkZoneDto,
  EmployeeWorkZoneRepository
> {
  constructor(
    @inject(TYPES.EmployeeWorkZoneRepositoryInterface) repository: EmployeeWorkZoneRepository,
  ) {
    super(repository, CreateEMployeeWorkZoneSchema, UpdateEMployeeWorkZoneSchema, "EmployeeWorkZone");
  }
}
