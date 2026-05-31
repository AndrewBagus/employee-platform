import { injectable, inject } from "inversify";
import { TYPES } from "@cores/types";
import { BaseService } from "@services/base.service";
import {
  CreateReligionSchema,
  UpdateReligionSchema,
  type ReligionResponseDto,
  type CreateReligionDto,
  type UpdateReligionDto,
} from "@dtos/religion.dto";
import type { ReligionRepository } from "@repositories/religion/religion.repository";

@injectable()
export class ReligionService extends BaseService<
  ReligionResponseDto,
  CreateReligionDto,
  UpdateReligionDto,
  ReligionRepository
> {
  constructor(
    @inject(TYPES.ReligionRepositoryInterface) repository: ReligionRepository,
  ) {
    super(repository, CreateReligionSchema, UpdateReligionSchema, "Religion");
  }
}
