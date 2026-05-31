import { injectable, inject } from "inversify";
import { TYPES } from "@cores/types";
import { BaseService } from "@services/base.service";
import {
  CreateTrainingTypeSchema,
  UpdateTrainingTypeSchema,
  type TrainingTypeResponseDto,
  type CreateTrainingTypeDto,
  type UpdateTrainingTypeDto,
} from "@dtos/trainingType.dto";
import type { TrainingTypeRepositoryInterface } from "@repositories/trainingTypes/trainingTypes.repository.interface";
import type { TrainingTypeServiceInterface } from "./trainingTypes.service.interface";

@injectable()
export class TrainingTypeService
  extends BaseService<TrainingTypeResponseDto, CreateTrainingTypeDto, UpdateTrainingTypeDto, TrainingTypeRepositoryInterface>
  implements TrainingTypeServiceInterface
{
  constructor(
    @inject(TYPES.TrainingTypeRepositoryInterface) repository: TrainingTypeRepositoryInterface,
  ) {
    super(repository, CreateTrainingTypeSchema, UpdateTrainingTypeSchema, "TrainingType");
  }
}
