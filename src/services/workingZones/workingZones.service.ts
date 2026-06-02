import { injectable, inject } from "inversify";
import { TYPES } from "@cores/types";
import { BaseService } from "@services/base.service";
import {
  CreateWorkingZoneSchema,
  UpdateWorkingZoneSchema,
  type WorkingZoneResponseDto,
  type CreateWorkingZoneDto,
  type UpdateWorkingZoneDto,
} from "@dtos/workingZone.dto";
import type { WorkingZoneRepositoryInterface } from "@repositories/workingZones/workingZones.repository.interface";
import type { WorkingZoneServiceInterface } from "./workingZones.service.interface";

@injectable()
export class WorkingZoneService
  extends BaseService<WorkingZoneResponseDto, CreateWorkingZoneDto, UpdateWorkingZoneDto, WorkingZoneRepositoryInterface>
  implements WorkingZoneServiceInterface
{
  constructor(
    @inject(TYPES.WorkingZoneRepositoryInterface) repository: WorkingZoneRepositoryInterface,
  ) {
    super(repository, CreateWorkingZoneSchema, UpdateWorkingZoneSchema, "WorkingZone");
  }
}
