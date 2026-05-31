import { injectable, inject } from "inversify";
import { TYPES } from "@cores/types";
import { BaseService } from "@services/base.service";
import {
  CreateWarningSchema,
  UpdateWarningSchema,
  type WarningResponseDto,
  type CreateWarningDto,
  type UpdateWarningDto,
} from "@dtos/warning.dto";
import type { WarningRepositoryInterface } from "@repositories/warnings/warnings.repository.interface";
import type { WarningServiceInterface } from "./warnings.service.interface";

@injectable()
export class WarningService
  extends BaseService<WarningResponseDto, CreateWarningDto, UpdateWarningDto, WarningRepositoryInterface>
  implements WarningServiceInterface
{
  constructor(
    @inject(TYPES.WarningRepositoryInterface) repository: WarningRepositoryInterface,
  ) {
    super(repository, CreateWarningSchema, UpdateWarningSchema, "Warning");
  }
}
