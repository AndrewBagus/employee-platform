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
import type { GradeRepositoryInterface } from "@repositories/grade/grade.repository.interface";
import type { GradeServiceInterface } from "./grade.service.interface";

@injectable()
export class GradeService
  extends BaseService<GradeResponseDto, CreateGradeDto, UpdateGradeDto, GradeRepositoryInterface>
  implements GradeServiceInterface
{
  constructor(
    @inject(TYPES.GradeRepositoryInterface) repository: GradeRepositoryInterface,
  ) {
    super(repository, CreateGradeSchema, UpdateGradeSchema, "Grade");
  }
}
