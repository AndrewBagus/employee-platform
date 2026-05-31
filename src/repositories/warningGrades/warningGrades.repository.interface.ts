import type { WArningGradeResponseDto, CreateWArningGradeDto, UpdateWArningGradeDto } from "@dtos/warningGrade.dto";

export interface WarningGradeRepositoryInterface {
  findAll(): Promise<WArningGradeResponseDto[]>;
  findById(id: string): Promise<WArningGradeResponseDto | null>;
  create(data: CreateWArningGradeDto): Promise<WArningGradeResponseDto>;
  update(id: string, data: UpdateWArningGradeDto): Promise<WArningGradeResponseDto | null>;
  softDelete(id: string): Promise<void>;
}
