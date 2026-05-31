import { injectable, inject } from "inversify";
import { TYPES } from "@cores/types";
import { BaseService } from "@services/base.service";
import {
  CreateWArningSchema,
  UpdateWArningSchema,
  type WArningResponseDto,
  type CreateWArningDto,
  type UpdateWArningDto,
} from "@dtos/warning.dto";
import type { WarningRepositoryInterface } from "@repositories/warnings/warnings.repository.interface";
import type { WarningServiceInterface } from "./warnings.service.interface";

@injectable()
export class WarningService
  extends BaseService<WArningResponseDto, CreateWArningDto, UpdateWArningDto, WarningRepositoryInterface>
  implements WarningServiceInterface
{
  constructor(
    @inject(TYPES.WarningRepositoryInterface) repository: WarningRepositoryInterface,
  ) {
    super(repository, CreateWArningSchema, UpdateWArningSchema, "Warning");
  }
}
