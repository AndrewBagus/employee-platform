import { injectable, inject } from "inversify";
import { type NodePgDatabase } from "drizzle-orm/node-postgres";
import { and, eq, sql } from "drizzle-orm";
import { type PgTableWithColumns, type PgColumn } from "drizzle-orm/pg-core";
import { TYPES } from "@cores/types";

@injectable()
export abstract class BaseRepository<
  TTable extends PgTableWithColumns<any>,
  TResponse extends Record<string, unknown>,
  TCreate extends Record<string, unknown>,
  TUpdate extends Record<string, unknown>,
> {
  constructor(
    @inject(TYPES.Database) protected readonly db: NodePgDatabase,
    protected readonly table: TTable,
  ) {}

  async findAll(): Promise<TResponse[]> {
    const rows = await this.db
      .select()
      .from(this.table)
      .where(eq(this.tableColumn("stsActive"), true))
      .orderBy(this.tableColumn("name"));
    return rows as TResponse[];
  }

  async findById(id: string): Promise<TResponse | null> {
    const rows = await this.db
      .select()
      .from(this.table)
      .where(and(eq(this.tableColumn("id"), id), eq(this.tableColumn("stsActive"), true)))
      .limit(1);
    return (rows[0] as TResponse) ?? null;
  }

  async create(data: TCreate): Promise<TResponse> {
    const rows = await this.db
      .insert(this.table)
      .values(data as unknown as Record<string, unknown>)
      .returning();
    return rows[0] as TResponse;
  }

  async update(id: string, data: TUpdate): Promise<TResponse | null> {
    const updateData: Record<string, unknown> = {};
    // Filter out undefined values so drizzle doesn't attempt to set NULL on skipped fields
    const entries = Object.entries(data as unknown as Record<string, unknown>);
    for (const [key, value] of entries) {
      if (value !== undefined) updateData[key] = value;
    }
    const rows = await this.db
      .update(this.table)
      .set(updateData)
      .where(eq(this.tableColumn("id"), id))
      .returning();
    return (rows[0] as TResponse) ?? null;
  }

  async softDelete(id: string): Promise<void> {
    await this.db
      .update(this.table)
      .set({ stsActive: false, deletedAt: sql`now()` })
      .where(eq(this.tableColumn("id"), id));
  }

  /**
   * Access a table column by name at runtime.
   * Drizzle table objects expose columns as properties, but the generic constraint
   * hides specific column keys, requiring an unchecked cast.
   * Kept as a dedicated method because five call sites need lockstep behavior.
   */
  private tableColumn(name: string): PgColumn {
    return (this.table as unknown as Record<string, PgColumn>)[name];
  }
}
