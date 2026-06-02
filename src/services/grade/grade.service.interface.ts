import type { GradeResponseDto, CreateGradeDto, UpdateGradeDto } from "@dtos/grade.dto";

export interface GradeServiceInterface {
  findAll(): Promise<GradeResponseDto[]>;
  findById(id: string): Promise<GradeResponseDto | null>;
  create(data: unknown): Promise<GradeResponseDto>;
  update(id: string, data: unknown): Promise<GradeResponseDto>;
  delete(id: string): Promise<void>;
}
