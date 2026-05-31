import { injectable, inject } from "inversify";
import { TYPES } from "@cores/types";
import { BaseService } from "@services/base.service";
import {
  CreateALlowanceSchema,
  UpdateALlowanceSchema,
  type ALlowanceResponseDto,
  type CreateALlowanceDto,
  type UpdateALlowanceDto,
} from "@dtos/allowance.dto";
import type { AllowanceRepositoryInterface } from "@repositories/allowances/allowances.repository.interface";
import type { AllowanceServiceInterface } from "./allowances.service.interface";

@injectable()
export class AllowanceService
  extends BaseService<ALlowanceResponseDto, CreateALlowanceDto, UpdateALlowanceDto, AllowanceRepositoryInterface>
  implements AllowanceServiceInterface
{
  constructor(
    @inject(TYPES.AllowanceRepositoryInterface) repository: AllowanceRepositoryInterface,
  ) {
    super(repository, CreateALlowanceSchema, UpdateALlowanceSchema, "Allowance");
  }
}
