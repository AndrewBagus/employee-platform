import type { WarningGradeResponseDto, CreateWarningGradeDto, UpdateWarningGradeDto } from "@dtos/warningGrade.dto";

export interface WarningGradeRepositoryInterface {
  findAll(): Promise<WarningGradeResponseDto[]>;
  findById(id: string): Promise<WarningGradeResponseDto | null>;
  create(data: CreateWarningGradeDto): Promise<WarningGradeResponseDto>;
  update(id: string, data: UpdateWarningGradeDto): Promise<WarningGradeResponseDto | null>;
  softDelete(id: string): Promise<void>;
}
