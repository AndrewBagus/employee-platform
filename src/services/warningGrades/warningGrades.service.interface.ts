import type { WArningGradeResponseDto, CreateWArningGradeDto, UpdateWArningGradeDto } from "@dtos/warningGrade.dto";

export interface WarningGradeServiceInterface {
  findAll(): Promise<WArningGradeResponseDto[]>;
  findById(id: string): Promise<WArningGradeResponseDto | null>;
  create(data: unknown): Promise<WArningGradeResponseDto>;
  update(id: string, data: unknown): Promise<WArningGradeResponseDto>;
  delete(id: string): Promise<void>;
}
