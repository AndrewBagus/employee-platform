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
import type { WorkingZoneRepository } from "@repositories/workingZones/workingZones.repository";

@injectable()
export class WorkingZoneService extends BaseService<
  WOrkingZoneResponseDto,
  CreateWOrkingZoneDto,
  UpdateWOrkingZoneDto,
  WorkingZoneRepository
> {
  constructor(
    @inject(TYPES.WorkingZoneRepositoryInterface) repository: WorkingZoneRepository,
  ) {
    super(repository, CreateWOrkingZoneSchema, UpdateWOrkingZoneSchema, "WorkingZone");
  }
}
