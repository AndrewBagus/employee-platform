import type { ProjectResponseDto, CreateProjectDto, UpdateProjectDto } from "@dtos/project.dto";

export interface ProjectServiceInterface {
  findAll(): Promise<ProjectResponseDto[]>;
  findById(id: string): Promise<ProjectResponseDto | null>;
  create(data: unknown): Promise<ProjectResponseDto>;
  update(id: string, data: unknown): Promise<ProjectResponseDto>;
  delete(id: string): Promise<void>;
}
