import { injectable, inject } from "inversify";
import { TYPES } from "@cores/types";
import { BaseService } from "@services/base.service";
import {
  CreateTrainingSchema,
  UpdateTrainingSchema,
  type TrainingResponseDto,
  type CreateTrainingDto,
  type UpdateTrainingDto,
} from "@dtos/training.dto";
import type { TrainingRepositoryInterface } from "@repositories/trainings/trainings.repository.interface";
import type { TrainingServiceInterface } from "./trainings.service.interface";

@injectable()
export class TrainingService
  extends BaseService<TrainingResponseDto, CreateTrainingDto, UpdateTrainingDto, TrainingRepositoryInterface>
  implements TrainingServiceInterface
{
  constructor(
    @inject(TYPES.TrainingRepositoryInterface) repository: TrainingRepositoryInterface,
  ) {
    super(repository, CreateTrainingSchema, UpdateTrainingSchema, "Training");
  }
}
