import { injectable, inject } from "inversify";
import { TYPES } from "@cores/types";
import { BaseService } from "@services/base.service";
import {
  CreateCostCenterSchema,
  UpdateCostCenterSchema,
  type CostCenterResponseDto,
  type CreateCostCenterDto,
  type UpdateCostCenterDto,
} from "@dtos/costCenter.dto";
import type { CostCenterRepository } from "@repositories/costCenter/costCenter.repository";

@injectable()
export class CostCenterService extends BaseService<
  CostCenterResponseDto,
  CreateCostCenterDto,
  UpdateCostCenterDto,
  CostCenterRepository
> {
  constructor(
    @inject(TYPES.CostCenterRepositoryInterface) repository: CostCenterRepository,
  ) {
    super(repository, CreateCostCenterSchema, UpdateCostCenterSchema, "CostCenter");
  }
}
