import { injectable, inject } from "inversify";
import { TYPES } from "@cores/types";
import { BaseService } from "@services/base.service";
import {
  CreateTRainingScheduleSchema,
  UpdateTRainingScheduleSchema,
  type TRainingScheduleResponseDto,
  type CreateTRainingScheduleDto,
  type UpdateTRainingScheduleDto,
} from "@dtos/trainingSchedule.dto";
import type { TrainingScheduleRepository } from "@repositories/trainingSchedules/trainingSchedules.repository";

@injectable()
export class TrainingScheduleService extends BaseService<
  TRainingScheduleResponseDto,
  CreateTRainingScheduleDto,
  UpdateTRainingScheduleDto,
  TrainingScheduleRepository
> {
  constructor(
    @inject(TYPES.TrainingScheduleRepositoryInterface) repository: TrainingScheduleRepository,
  ) {
    super(repository, CreateTRainingScheduleSchema, UpdateTRainingScheduleSchema, "TrainingSchedule");
  }
}
