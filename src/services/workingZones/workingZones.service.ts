import { injectable, inject } from "inversify";
import { TYPES } from "@cores/types";
import { BaseService } from "@services/base.service";
import {
  CreateWOrkingZoneSchema,
  UpdateWOrkingZoneSchema,
  type WOrkingZoneResponseDto,
  type CreateWOrkingZoneDto,
  type UpdateWOrkingZoneDto,
} from "@dtos/workingZone.dto";
import type { WorkingZoneRepositoryInterface } from "@repositories/workingZones/workingZones.repository.interface";
import type { WorkingZoneServiceInterface } from "./workingZones.service.interface";

@injectable()
export class WorkingZoneService
  extends BaseService<WOrkingZoneResponseDto, CreateWOrkingZoneDto, UpdateWOrkingZoneDto, WorkingZoneRepositoryInterface>
  implements WorkingZoneServiceInterface
{
  constructor(
    @inject(TYPES.WorkingZoneRepositoryInterface) repository: WorkingZoneRepositoryInterface,
  ) {
    super(repository, CreateWOrkingZoneSchema, UpdateWOrkingZoneSchema, "WorkingZone");
  }
}
