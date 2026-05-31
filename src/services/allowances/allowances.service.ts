import { injectable, inject } from "inversify";
import { TYPES } from "@cores/types";
import { BaseService } from "@services/base.service";
import {
  CreateAllowanceSchema,
  UpdateAllowanceSchema,
  type AllowanceResponseDto,
  type CreateAllowanceDto,
  type UpdateAllowanceDto,
} from "@dtos/allowance.dto";
import type { AllowanceRepositoryInterface } from "@repositories/allowances/allowances.repository.interface";
import type { AllowanceServiceInterface } from "./allowances.service.interface";

@injectable()
export class AllowanceService
  extends BaseService<AllowanceResponseDto, CreateAllowanceDto, UpdateAllowanceDto, AllowanceRepositoryInterface>
  implements AllowanceServiceInterface
{
  constructor(
    @inject(TYPES.AllowanceRepositoryInterface) repository: AllowanceRepositoryInterface,
  ) {
    super(repository, CreateAllowanceSchema, UpdateAllowanceSchema, "Allowance");
  }
}
