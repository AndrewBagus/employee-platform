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
import type { TrainingTypeRepository } from "@repositories/trainingTypes/trainingTypes.repository";

@injectable()
export class TrainingTypeService extends BaseService<
  TRainingTypeResponseDto,
  CreateTRainingTypeDto,
  UpdateTRainingTypeDto,
  TrainingTypeRepository
> {
  constructor(
    @inject(TYPES.TrainingTypeRepositoryInterface) repository: TrainingTypeRepository,
  ) {
    super(repository, CreateTRainingTypeSchema, UpdateTRainingTypeSchema, "TrainingType");
  }
}
