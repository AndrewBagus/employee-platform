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
import type { AllowanceRepository } from "@repositories/allowances/allowances.repository";

@injectable()
export class AllowanceService extends BaseService<
  ALlowanceResponseDto,
  CreateALlowanceDto,
  UpdateALlowanceDto,
  AllowanceRepository
> {
  constructor(
    @inject(TYPES.AllowanceRepositoryInterface) repository: AllowanceRepository,
  ) {
    super(repository, CreateALlowanceSchema, UpdateALlowanceSchema, "Allowance");
  }
}
