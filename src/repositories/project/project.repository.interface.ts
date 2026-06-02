import type { ProjectResponseDto, CreateProjectDto, UpdateProjectDto } from "@dtos/project.dto";

export interface ProjectRepositoryInterface {
  findAll(): Promise<ProjectResponseDto[]>;
  findById(id: string): Promise<ProjectResponseDto | null>;
  create(data: CreateProjectDto): Promise<ProjectResponseDto>;
  update(id: string, data: UpdateProjectDto): Promise<ProjectResponseDto | null>;
  softDelete(id: string): Promise<void>;
}
