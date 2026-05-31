import { injectable, inject } from "inversify";
import { TYPES } from "@cores/types";
import { BaseService } from "@services/base.service";
import {
  CreateGradeSchema,
  UpdateGradeSchema,
  type GradeResponseDto,
  type CreateGradeDto,
  type UpdateGradeDto,
} from "@dtos/grade.dto";
import type { GradeRepository } from "@repositories/grade/grade.repository";

@injectable()
export class GradeService extends BaseService<
  GradeResponseDto,
  CreateGradeDto,
  UpdateGradeDto,
  GradeRepository
> {
  constructor(
    @inject(TYPES.GradeRepositoryInterface) repository: GradeRepository,
  ) {
    super(repository, CreateGradeSchema, UpdateGradeSchema, "Grade");
  }
}
