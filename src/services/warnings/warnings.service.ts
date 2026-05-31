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
import type { WarningRepository } from "@repositories/warnings/warnings.repository";

@injectable()
export class WarningService extends BaseService<
  WArningResponseDto,
  CreateWArningDto,
  UpdateWArningDto,
  WarningRepository
> {
  constructor(
    @inject(TYPES.WarningRepositoryInterface) repository: WarningRepository,
  ) {
    super(repository, CreateWArningSchema, UpdateWArningSchema, "Warning");
  }
}
