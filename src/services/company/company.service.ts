import { injectable, inject } from "inversify";
import { TYPES } from "@cores/types";
import type { CompanyServiceInterface } from "./company.service.interface";
import type { CompanyRepositoryInterface } from "@repositories/company/company.repository.interface";
import type { CompanyResponseDto, CreateCompanyDto, UpdateCompanyDto } from "@dtos/company.dto";
import { ValidationError, NotFoundError } from "@cores/errors";

function validateCreateInput(data: Record<string, unknown>): asserts data is CreateCompanyDto {
  const errors: string[] = [];

  if (!data.name || typeof data.name !== "string" || data.name.trim().length === 0) {
    errors.push("name is required and must be a non-empty string");
  }

  if (!data.type || !["GROUP", "CLIENT", "SUBCON"].includes(data.type as string)) {
    errors.push("type is required and must be one of: GROUP, CLIENT, SUBCON");
  }

  if (!data.countryId || typeof data.countryId !== "string") {
    errors.push("countryId is required and must be a string (UUID)");
  }

  if (errors.length > 0) {
    throw new ValidationError(errors.join("; "));
  }
}

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
    validateCreateInput(data);
    return this.repository.create(data);
  }

  async update(id: string, data: UpdateCompanyDto): Promise<CompanyResponseDto> {
    if (!id || typeof id !== "string") {
      throw new ValidationError("id is required");
    }

    const existing = await this.repository.findById(id);
    if (!existing) {
      throw new NotFoundError(`Company with id ${id} not found`);
    }

    const updated = await this.repository.update(id, data);
    if (!updated) {
      throw new NotFoundError(`Company with id ${id} not found`);
    }

    return updated;
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
