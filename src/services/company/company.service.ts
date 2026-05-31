import { injectable, inject } from "inversify";
import { TYPES } from "@cores/types";
import type { CompanyServiceInterface } from "./company.service.interface";
import type { CompanyRepositoryInterface } from "@repositories/company/company.repository.interface";
import type { CompanyResponseDto } from "@dtos/company.dto";
import { CreateCompanySchema, UpdateCompanySchema, type CreateCompanyDto, type UpdateCompanyDto } from "@dtos/company.dto";
import { ValidationError, NotFoundError } from "@cores/errors";
import { z } from "zod";


@injectable()
export class CompanyService implements CompanyServiceInterface {
  constructor(
    @inject(TYPES.CompanyRepositoryInterface) private readonly repository: CompanyRepositoryInterface,
  ) {}

  async findAll(): Promise<CompanyResponseDto[]> {
    return this.repository.findAll();
  }

  async findById(id: string): Promise<CompanyResponseDto | null> {
    return this.repository.findById(id);
  }

  async create(data: CreateCompanyDto): Promise<CompanyResponseDto> {
    try {
      const validated = CreateCompanySchema.parse(data);
      return this.repository.create(validated);
    } catch (err) {
      if (err instanceof z.ZodError) {
        throw new ValidationError(err.issues.map(i => i.message).join("; "));
      }
      throw err;
    }
  }

  async update(id: string, data: UpdateCompanyDto): Promise<CompanyResponseDto> {
    if (!id || typeof id !== "string") {
      throw new ValidationError("id is required");
    }

    const existing = await this.repository.findById(id);
    if (!existing) {
      throw new NotFoundError(`Company with id ${id} not found`);
    }

    try {
      const validated = UpdateCompanySchema.parse(data);
      const updated = await this.repository.update(id, validated);
      if (!updated) {
        throw new NotFoundError(`Company with id ${id} not found`);
      }
      return updated;
    } catch (err) {
      if (err instanceof z.ZodError) {
        throw new ValidationError(err.issues.map(i => i.message).join("; "));
      }
      throw err;
    }
  }

  async delete(id: string): Promise<void> {
    if (!id || typeof id !== "string") {
      throw new ValidationError("id is required");
    }

    const existing = await this.repository.findById(id);
    if (!existing) {
      throw new NotFoundError(`Company with id ${id} not found`);
    }

    await this.repository.softDelete(id);
  }
}
