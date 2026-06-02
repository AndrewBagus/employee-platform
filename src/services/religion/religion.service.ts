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
import type { ReligionRepositoryInterface } from "@repositories/religion/religion.repository.interface";
import type { ReligionServiceInterface } from "./religion.service.interface";

@injectable()
export class ReligionService
  extends BaseService<ReligionResponseDto, CreateReligionDto, UpdateReligionDto, ReligionRepositoryInterface>
  implements ReligionServiceInterface
{
  constructor(
    @inject(TYPES.ReligionRepositoryInterface) repository: ReligionRepositoryInterface,
  ) {
    super(repository, CreateReligionSchema, UpdateReligionSchema, "Religion");
  }
}
