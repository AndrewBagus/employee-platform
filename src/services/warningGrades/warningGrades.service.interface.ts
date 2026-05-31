import type { WarningGradeResponseDto, CreateWarningGradeDto, UpdateWarningGradeDto } from "@dtos/warningGrade.dto";

export interface WarningGradeServiceInterface {
  findAll(): Promise<WarningGradeResponseDto[]>;
  findById(id: string): Promise<WarningGradeResponseDto | null>;
  create(data: unknown): Promise<WarningGradeResponseDto>;
  update(id: string, data: unknown): Promise<WarningGradeResponseDto>;
  delete(id: string): Promise<void>;
}
