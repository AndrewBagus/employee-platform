import { randomUUIDv7 } from "bun";
import { initDatabase } from "../index";

export const db = initDatabase;

export function seedId(): string {
  return randomUUIDv7();
}

export interface DefaultColumnValues {
  stsActive: boolean;
  createdAt: Date;
  createdBy: string;
  updatedAt: Date;
  updatedBy: string;
  deletedAt: null;
}

export function defaultColumns(createdBy?: string): DefaultColumnValues {
  const now = new Date();
  const by = createdBy ?? "seed";
  return {
    stsActive: true,
    createdAt: now,
    createdBy: by,
    updatedAt: now,
    updatedBy: by,
    deletedAt: null,
  };
}
