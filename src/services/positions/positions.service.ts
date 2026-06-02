import { injectable, inject } from "inversify";
import { TYPES } from "@cores/types";
import { BaseService } from "@services/base.service";
import {
  CreatePositionSchema,
  UpdatePositionSchema,
  type PositionResponseDto,
  type CreatePositionDto,
  type UpdatePositionDto,
} from "@dtos/position.dto";
import type { PositionRepositoryInterface } from "@repositories/positions/positions.repository.interface";
import type { PositionServiceInterface } from "./positions.service.interface";

@injectable()
export class PositionService
  extends BaseService<PositionResponseDto, CreatePositionDto, UpdatePositionDto, PositionRepositoryInterface>
  implements PositionServiceInterface
{
  constructor(
    @inject(TYPES.PositionRepositoryInterface) repository: PositionRepositoryInterface,
  ) {
    super(repository, CreatePositionSchema, UpdatePositionSchema, "Position");
  }
}
