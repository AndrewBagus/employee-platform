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
import type { TrainingScheduleRepositoryInterface } from "@repositories/trainingSchedules/trainingSchedules.repository.interface";
import type { TrainingScheduleServiceInterface } from "./trainingSchedules.service.interface";

@injectable()
export class TrainingScheduleService
  extends BaseService<TRainingScheduleResponseDto, CreateTRainingScheduleDto, UpdateTRainingScheduleDto, TrainingScheduleRepositoryInterface>
  implements TrainingScheduleServiceInterface
{
  constructor(
    @inject(TYPES.TrainingScheduleRepositoryInterface) repository: TrainingScheduleRepositoryInterface,
  ) {
    super(repository, CreateTRainingScheduleSchema, UpdateTRainingScheduleSchema, "TrainingSchedule");
  }
}
