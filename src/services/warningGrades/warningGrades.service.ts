import { injectable, inject } from "inversify";
import { TYPES } from "@cores/types";
import { BaseService } from "@services/base.service";
import {
  CreateWarningGradeSchema,
  UpdateWarningGradeSchema,
  type WarningGradeResponseDto,
  type CreateWarningGradeDto,
  type UpdateWarningGradeDto,
} from "@dtos/warningGrade.dto";
import type { WarningGradeRepositoryInterface } from "@repositories/warningGrades/warningGrades.repository.interface";
import type { WarningGradeServiceInterface } from "./warningGrades.service.interface";

@injectable()
export class WarningGradeService
  extends BaseService<WarningGradeResponseDto, CreateWarningGradeDto, UpdateWarningGradeDto, WarningGradeRepositoryInterface>
  implements WarningGradeServiceInterface
{
  constructor(
    @inject(TYPES.WarningGradeRepositoryInterface) repository: WarningGradeRepositoryInterface,
  ) {
    super(repository, CreateWarningGradeSchema, UpdateWarningGradeSchema, "WarningGrade");
  }
}
