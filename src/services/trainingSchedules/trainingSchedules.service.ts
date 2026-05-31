import { injectable, inject } from "inversify";
import { TYPES } from "@cores/types";
import { BaseService } from "@services/base.service";
import {
  CreateTrainingScheduleSchema,
  UpdateTrainingScheduleSchema,
  type TrainingScheduleResponseDto,
  type CreateTrainingScheduleDto,
  type UpdateTrainingScheduleDto,
} from "@dtos/trainingSchedule.dto";
import type { TrainingScheduleRepositoryInterface } from "@repositories/trainingSchedules/trainingSchedules.repository.interface";
import type { TrainingScheduleServiceInterface } from "./trainingSchedules.service.interface";

@injectable()
export class TrainingScheduleService
  extends BaseService<TrainingScheduleResponseDto, CreateTrainingScheduleDto, UpdateTrainingScheduleDto, TrainingScheduleRepositoryInterface>
  implements TrainingScheduleServiceInterface
{
  constructor(
    @inject(TYPES.TrainingScheduleRepositoryInterface) repository: TrainingScheduleRepositoryInterface,
  ) {
    super(repository, CreateTrainingScheduleSchema, UpdateTrainingScheduleSchema, "TrainingSchedule");
  }
}
