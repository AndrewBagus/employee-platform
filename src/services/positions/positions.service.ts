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
import type { PositionRepositoryInterface } from "@repositories/positions/positions.repository.interface";
import type { PositionServiceInterface } from "./positions.service.interface";

@injectable()
export class PositionService
  extends BaseService<POsitionResponseDto, CreatePOsitionDto, UpdatePOsitionDto, PositionRepositoryInterface>
  implements PositionServiceInterface
{
  constructor(
    @inject(TYPES.PositionRepositoryInterface) repository: PositionRepositoryInterface,
  ) {
    super(repository, CreatePOsitionSchema, UpdatePOsitionSchema, "Position");
  }
}
