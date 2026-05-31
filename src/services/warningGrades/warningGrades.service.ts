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
import type { WarningGradeRepositoryInterface } from "@repositories/warningGrades/warningGrades.repository.interface";
import type { WarningGradeServiceInterface } from "./warningGrades.service.interface";

@injectable()
export class WarningGradeService
  extends BaseService<WArningGradeResponseDto, CreateWArningGradeDto, UpdateWArningGradeDto, WarningGradeRepositoryInterface>
  implements WarningGradeServiceInterface
{
  constructor(
    @inject(TYPES.WarningGradeRepositoryInterface) repository: WarningGradeRepositoryInterface,
  ) {
    super(repository, CreateWArningGradeSchema, UpdateWArningGradeSchema, "WarningGrade");
  }
}
