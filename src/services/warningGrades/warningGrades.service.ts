import { injectable, inject } from "inversify";
import { TYPES } from "@cores/types";
import { BaseService } from "@services/base.service";
import {
  CreateWArningGradeSchema,
  UpdateWArningGradeSchema,
  type WArningGradeResponseDto,
  type CreateWArningGradeDto,
  type UpdateWArningGradeDto,
} from "@dtos/warningGrade.dto";
import type { WarningGradeRepository } from "@repositories/warningGrades/warningGrades.repository";

@injectable()
export class WarningGradeService extends BaseService<
  WArningGradeResponseDto,
  CreateWArningGradeDto,
  UpdateWArningGradeDto,
  WarningGradeRepository
> {
  constructor(
    @inject(TYPES.WarningGradeRepositoryInterface) repository: WarningGradeRepository,
  ) {
    super(repository, CreateWArningGradeSchema, UpdateWArningGradeSchema, "WarningGrade");
  }
}
