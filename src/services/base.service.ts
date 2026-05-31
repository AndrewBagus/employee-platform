import { injectable } from "inversify";
import { z } from "zod";
import { ValidationError, NotFoundError } from "@cores/errors";

@injectable()
export abstract class BaseService<
  TResponse extends Record<string, unknown>,
  TCreate extends Record<string, unknown>,
  TUpdate extends Record<string, unknown>,
  TRepo extends {
    findAll(): Promise<TResponse[]>;
    findById(id: string): Promise<TResponse | null>;
    create(data: TCreate): Promise<TResponse>;
    update(id: string, data: TUpdate): Promise<TResponse | null>;
    softDelete(id: string): Promise<void>;
  },
> {
  constructor(
    protected readonly repository: TRepo,
    protected readonly createSchema: z.ZodSchema<TCreate>,
    protected readonly updateSchema: z.ZodSchema<TUpdate>,
    protected readonly entityName: string,
  ) {}

  async findAll(): Promise<TResponse[]> {
    return this.repository.findAll();
  }

  async findById(id: string): Promise<TResponse | null> {
    return this.repository.findById(id);
  }

  async create(data: unknown): Promise<TResponse> {
    try {
      const validated = this.createSchema.parse(data);
      return this.repository.create(validated);
    } catch (err) {
      if (err instanceof z.ZodError) {
        throw new ValidationError(err.issues.map((i) => i.message).join("; "));
      }
      throw err;
    }
  }

  async update(id: string, data: unknown): Promise<TResponse> {
    if (!id || typeof id !== "string") {
      throw new ValidationError("id is required");
    }

    const existing = await this.repository.findById(id);
    if (!existing) {
      throw new NotFoundError(`${this.entityName} with id ${id} not found`);
    }

    try {
      const validated = this.updateSchema.parse(data);
      const updated = await this.repository.update(id, validated);
      if (!updated) {
        throw new NotFoundError(`${this.entityName} with id ${id} not found`);
      }
      return updated;
    } catch (err) {
      if (err instanceof z.ZodError) {
        throw new ValidationError(err.issues.map((i) => i.message).join("; "));
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
      throw new NotFoundError(`${this.entityName} with id ${id} not found`);
    }

    await this.repository.softDelete(id);
  }
}
