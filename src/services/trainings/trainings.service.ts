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
import type { TrainingRepository } from "@repositories/trainings/trainings.repository";

@injectable()
export class TrainingService extends BaseService<
  TRainingResponseDto,
  CreateTRainingDto,
  UpdateTRainingDto,
  TrainingRepository
> {
  constructor(
    @inject(TYPES.TrainingRepositoryInterface) repository: TrainingRepository,
  ) {
    super(repository, CreateTRainingSchema, UpdateTRainingSchema, "Training");
  }
}
