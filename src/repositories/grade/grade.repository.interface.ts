import type { GradeResponseDto, CreateGradeDto, UpdateGradeDto } from "@dtos/grade.dto";

export interface GradeRepositoryInterface {
  findAll(): Promise<GradeResponseDto[]>;
  findById(id: string): Promise<GradeResponseDto | null>;
  create(data: CreateGradeDto): Promise<GradeResponseDto>;
  update(id: string, data: UpdateGradeDto): Promise<GradeResponseDto | null>;
  softDelete(id: string): Promise<void>;
}
