import { injectable, inject } from "inversify";
import { TYPES } from "@cores/types";
import { BaseService } from "@services/base.service";
import {
  CreatePOsitionSchema,
  UpdatePOsitionSchema,
  type POsitionResponseDto,
  type CreatePOsitionDto,
  type UpdatePOsitionDto,
} from "@dtos/position.dto";
import type { PositionRepository } from "@repositories/positions/positions.repository";

@injectable()
export class PositionService extends BaseService<
  POsitionResponseDto,
  CreatePOsitionDto,
  UpdatePOsitionDto,
  PositionRepository
> {
  constructor(
    @inject(TYPES.PositionRepositoryInterface) repository: PositionRepository,
  ) {
    super(repository, CreatePOsitionSchema, UpdatePOsitionSchema, "Position");
  }
}
