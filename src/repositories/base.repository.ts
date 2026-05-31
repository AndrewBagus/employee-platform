import { injectable, inject } from "inversify";
import { type NodePgDatabase } from "drizzle-orm/node-postgres";
import { and, eq, sql } from "drizzle-orm";
import { type PgTable, type PgColumn } from "drizzle-orm/pg-core";
import { TYPES } from "@cores/types";

@injectable()
export abstract class BaseRepository<
  TTable extends PgTable,
  TResponse extends object,
  TCreate extends object,
  TUpdate extends object,
> {
  constructor(
    @inject(TYPES.Database) protected readonly db: NodePgDatabase,
    protected readonly table: TTable,
  ) {}

  async findAll(): Promise<TResponse[]> {
    const rows = await this.db
      .select()
      .from(this.table as PgTable)
      .where(eq(this.tableColumn("stsActive"), true));
    return rows as TResponse[];
  }

  async findById(id: string): Promise<TResponse | null> {
    const rows = await this.db
      .select()
      .from(this.table as PgTable)
      .where(and(eq(this.tableColumn("id"), id), eq(this.tableColumn("stsActive"), true)))
      .limit(1);
    return (rows[0] as TResponse) ?? null;
  }

  async create(data: TCreate): Promise<TResponse> {
    const rows = await this.db
      .insert(this.table as PgTable)
      .values(data as unknown as Record<string, unknown>)
      .returning();
    return rows[0] as TResponse;
  }

  async update(id: string, data: TUpdate): Promise<TResponse | null> {
    const updateData: Record<string, unknown> = {};
    const entries = Object.entries(data as unknown as Record<string, unknown>);
    for (const [key, value] of entries) {
      if (value !== undefined) updateData[key] = value;
    }
    const rows = await this.db
      .update(this.table as PgTable)
      .set(updateData)
      .where(eq(this.tableColumn("id"), id))
      .returning();
    return (rows[0] as TResponse) ?? null;
  }

  async softDelete(id: string): Promise<void> {
    await this.db
      .update(this.table as PgTable)
      .set({ stsActive: false, deletedAt: sql`now()` })
      .where(eq(this.tableColumn("id"), id));
  }

  private tableColumn(name: string): PgColumn {
    return (this.table as unknown as Record<string, PgColumn>)[name];
  }
}
