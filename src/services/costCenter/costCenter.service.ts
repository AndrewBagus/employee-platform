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
import type { CostCenterRepositoryInterface } from "@repositories/costCenter/costCenter.repository.interface";
import type { CostCenterServiceInterface } from "./costCenter.service.interface";

@injectable()
export class CostCenterService
  extends BaseService<CostCenterResponseDto, CreateCostCenterDto, UpdateCostCenterDto, CostCenterRepositoryInterface>
  implements CostCenterServiceInterface
{
  constructor(
    @inject(TYPES.CostCenterRepositoryInterface) repository: CostCenterRepositoryInterface,
  ) {
    super(repository, CreateCostCenterSchema, UpdateCostCenterSchema, "CostCenter");
  }
}
