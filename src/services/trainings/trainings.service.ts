import { injectable, inject } from "inversify";
import { TYPES } from "@cores/types";
import { BaseService } from "@services/base.service";
import {
  CreateTRainingSchema,
  UpdateTRainingSchema,
  type TRainingResponseDto,
  type CreateTRainingDto,
  type UpdateTRainingDto,
} from "@dtos/training.dto";
import type { TrainingRepositoryInterface } from "@repositories/trainings/trainings.repository.interface";
import type { TrainingServiceInterface } from "./trainings.service.interface";

@injectable()
export class TrainingService
  extends BaseService<TRainingResponseDto, CreateTRainingDto, UpdateTRainingDto, TrainingRepositoryInterface>
  implements TrainingServiceInterface
{
  constructor(
    @inject(TYPES.TrainingRepositoryInterface) repository: TrainingRepositoryInterface,
  ) {
    super(repository, CreateTRainingSchema, UpdateTRainingSchema, "Training");
  }
}
