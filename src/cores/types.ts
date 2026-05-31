import { GroupATypes } from "./types/group-a.types";
import { GroupBTypes } from "./types/group-b.types";
import { GroupCTypes } from "./types/group-c.types";
import { GroupDTypes } from "./types/group-d.types";

export const TYPES = {
  Database: Symbol.for("Database"),
  ...GroupATypes,
  ...GroupBTypes,
  ...GroupCTypes,
  ...GroupDTypes,
} as const;
