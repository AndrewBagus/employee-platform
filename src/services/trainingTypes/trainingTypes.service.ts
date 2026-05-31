import { injectable, inject } from "inversify";
import { TYPES } from "@cores/types";
import { BaseService } from "@services/base.service";
import {
  CreateTRainingTypeSchema,
  UpdateTRainingTypeSchema,
  type TRainingTypeResponseDto,
  type CreateTRainingTypeDto,
  type UpdateTRainingTypeDto,
} from "@dtos/trainingType.dto";
import type { TrainingTypeRepositoryInterface } from "@repositories/trainingTypes/trainingTypes.repository.interface";
import type { TrainingTypeServiceInterface } from "./trainingTypes.service.interface";

@injectable()
export class TrainingTypeService
  extends BaseService<TRainingTypeResponseDto, CreateTRainingTypeDto, UpdateTRainingTypeDto, TrainingTypeRepositoryInterface>
  implements TrainingTypeServiceInterface
{
  constructor(
    @inject(TYPES.TrainingTypeRepositoryInterface) repository: TrainingTypeRepositoryInterface,
  ) {
    super(repository, CreateTRainingTypeSchema, UpdateTRainingTypeSchema, "TrainingType");
  }
}
