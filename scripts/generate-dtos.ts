/**
 * generate-dtos.ts — DTO codegen from drizzle schema files.
 *
 * Reads every file in src/db/schema/ and generates
 * src/dtos/<entity>.dto.ts for each pgTable export.
 *
 * Usage: bun run scripts/generate-dtos.ts
 *
 * Limitations:
 * - `employeeProjects` has a composite PK (no `id` column); the generated
 *   DTO will lack `id` and the base repository won't compile for it.
 *   Handle as a manual override.
 */

import { existsSync, mkdirSync } from "fs";
import { readFile, writeFile, readdir } from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SCHEMA_DIR = join(__dirname, "..", "src", "db", "schema");
const DTO_DIR = join(__dirname, "..", "src", "dtos");

// Columns to skip in create/update schemas (auto-managed by Drizzle or DB)
const AUDIT_COLUMNS = new Set([
  "id",
  "stsActive",
  "createdAt",
  "createdBy",
  "updatedAt",
  "updatedBy",
  "deletedAt",
]);

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface EnumDef {
  tsName: string;
  values: string[];
}

interface ColumnDef {
  name: string;
  drizzleType: string; // e.g. "varchar", "uuid", "boolean", "numeric"
  notNull: boolean;
  hasDefault: boolean;
  isEnumRef: boolean;
  enumRefName?: string; // tsName of the pgEnum variable
  isFk: boolean;
}

interface TableDef {
  tsName: string; // exported variable name
  dbName: string; // database table name
  columns: ColumnDef[];
}

// ---------------------------------------------------------------------------
// Schema parsing
// ---------------------------------------------------------------------------

function stripComments(code: string): string {
  return code
    .replace(/\/\/.*$/gm, "")
    .replace(/\/\*[\s\S]*?\*\//g, "");
}

function extractEnums(content: string): Map<string, EnumDef> {
  const enums = new Map<string, EnumDef>();
  const regex = /export\s+const\s+(\w+)\s*=\s*pgEnum\s*\(\s*"([^"]+)"\s*,\s*\[([^\]]+)\]\s*\)/g;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(content)) !== null) {
    const tsName = match[1];
    const values = match[3]
      .split(",")
      .map((v) => v.trim().replace(/["'\s]/g, ""))
      .filter(Boolean);
    enums.set(tsName, { tsName, values });
  }
  return enums;
}

function extractTable(content: string, enums: Map<string, EnumDef>): TableDef | null {
  const tableRegex = /export\s+const\s+(\w+)\s*=\s*pgTable\s*\(\s*"([^"]+)"/;
  const tableMatch = tableRegex.exec(content);
  if (!tableMatch) return null;

  const tsName = tableMatch[1];
  const dbName = tableMatch[2];

  // Find opening brace of the columns object (second argument to pgTable)
  const afterTableName = tableMatch.index! + tableMatch[0].length;
  const objStart = content.indexOf("{", afterTableName);

  // Walk balanced braces to find the matching closing `}`
  let depth = 0;
  let objEnd = -1;
  let inString = false;
  let stringChar = "";
  for (let i = objStart; i < content.length; i++) {
    const ch = content[i];
    if (inString) {
      if (ch === "\\") { i++; continue; }
      if (ch === stringChar) inString = false;
      continue;
    }
    if (ch === '"' || ch === "'" || ch === "`") {
      inString = true;
      stringChar = ch;
      continue;
    }
    if (ch === "{") depth++;
    if (ch === "}") {
      depth--;
      if (depth === 0) {
        objEnd = i;
        break;
      }
    }
  }
  if (objEnd === -1) return null;

  const objBody = content.slice(objStart + 1, objEnd);
  const rawColumns = splitTopLevel(objBody);

  const columns: ColumnDef[] = [];
  // enums already extracted by caller

  for (const raw of rawColumns) {
    const trimmed = raw.trim();
    // Skip spread expressions (e.g. ...defaultColumn)
    if (trimmed.startsWith("...")) continue;
    if (!trimmed || !trimmed.includes(":")) continue;

    // Parse: columnName: typeName(args?).chain1().chain2()
    const colRegex = /^\s*(\w+)\s*:\s*(\w+)\s*(\([^)]*\))?\s*/;
    const colMatch = colRegex.exec(trimmed);
    if (!colMatch) continue;

    const name = colMatch[1];
    const typeName = colMatch[2];

    // Rest of the chain after the initial type call
    const chain = trimmed.slice(colMatch.index! + colMatch[0].length).trim();

    const notNull = chain.includes(".notNull()");
    const hasDefault =
      chain.includes(".default(") ||
      chain.includes(".$defaultFn(") ||
      chain.includes(".defaultNow()") ||
      chain.includes(".defaultRandom()");
    const isFk = chain.includes(".references(");
    const isEnumRef = enums.has(typeName);

    columns.push({
      name,
      drizzleType: typeName,
      notNull,
      hasDefault,
      isEnumRef,
      enumRefName: isEnumRef ? typeName : undefined,
      isFk,
    });
  }

  return { tsName, dbName, columns };
}

/**
 * Split a top-level comma-delimited list, respecting nesting of braces,
 * brackets, parentheses, and strings.
 */
function splitTopLevel(text: string): string[] {
  const parts: string[] = [];
  let depth = 0;
  let inString = false;
  let stringChar = "";
  let start = 0;

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (inString) {
      if (ch === "\\") { i++; continue; }
      if (ch === stringChar) inString = false;
      continue;
    }
    if (ch === '"' || ch === "'" || ch === "`") {
      inString = true;
      stringChar = ch;
      continue;
    }
    if ("{[(".includes(ch)) { depth++; continue; }
    if ("}])".includes(ch)) { depth--; continue; }
    if (ch === "," && depth === 0) {
      parts.push(text.slice(start, i));
      start = i + 1;
    }
  }
  const last = text.slice(start).trim();
  if (last) parts.push(last);
  return parts;
}

// ---------------------------------------------------------------------------
// Type mapping
// ---------------------------------------------------------------------------

function mapZodType(col: ColumnDef, enums: Map<string, EnumDef>): string {
  if (col.isEnumRef && col.enumRefName) {
    const enumDef = enums.get(col.enumRefName);
    if (enumDef) {
      return `z.enum([${enumDef.values.map((v) => `"${v}"`).join(", ")}])`;
    }
  }

  switch (col.drizzleType) {
    case "varchar":
    case "text":
    case "uuid":
    case "time":
      return "z.string()";
    case "boolean":
      return "z.boolean()";
    case "numeric":
    case "doublePrecision":
    case "real":
      return "z.coerce.number()";
    case "smallint":
    case "integer":
    case "bigint":
      return "z.number().int()";
    case "date":
    case "timestamp":
      return "z.coerce.date()";
    default:
      return "z.string()";
  }
}

function isRequired(col: ColumnDef): boolean {
  // Required in create: notNull AND no default value
  return col.notNull && !col.hasDefault;
}

// ---------------------------------------------------------------------------
// Name helpers
// ---------------------------------------------------------------------------

function singularize(name: string): string {
  if (name.endsWith("ies")) return name.slice(0, -3) + "y";
  if (name.endsWith("sses")) return name.slice(0, -2);
  if (name.endsWith("ses")) return name.slice(0, -2);
  if (name.endsWith("es") && !name.endsWith("ss")) return name.slice(0, -1);
  if (name.endsWith("s") && !name.endsWith("ss")) return name.slice(0, -1);
  return name;
}

function toPascalCase(s: string): string {
  // Already camelCase or kebab-case → split on uppercase boundaries / hyphens / underscores
  const words = s.split(/[-_]/).map((w) => w.charAt(0).toUpperCase() + w.slice(1));
  // Also split camelCase by re-processing the joined result
  const joined = words.join("");
  return joined
    .replace(/([A-Z])/g, " $1")
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join("")
    .replace(/^\s+/, "");
}

// ---------------------------------------------------------------------------
// DTO generation
// ---------------------------------------------------------------------------

function generateDto(table: TableDef, enums: Map<string, EnumDef>): string {
  const entityName = singularize(table.tsName);
  const pascalName = toPascalCase(entityName);

  const lines: string[] = [];
  lines.push("// Auto-generated by scripts/generate-dtos.ts — do not edit manually");
  lines.push("");
  lines.push(`export interface ${pascalName}ResponseDto {`);

  // Response interface — ALL columns
  for (const col of table.columns) {
    const nullable = !col.notNull;
    const baseType = (() => {
      if (col.isEnumRef && col.enumRefName) {
        const ed = enums.get(col.enumRefName);
        return ed ? ed.values.map((v) => `"${v}"`).join(" | ") : "string";
      }
      switch (col.drizzleType) {
        case "boolean": return "boolean";
        case "numeric": case "doublePrecision": case "real": return "number";
        case "smallint": case "integer": case "bigint": return "number";
        case "date": case "timestamp": return "Date";
        default: return "string";
      }
    })();
    lines.push(`  ${col.name}: ${baseType}${nullable ? " | null" : ""};`);
  }

  lines.push("}");
  lines.push("");
  lines.push("import { z } from \"zod\";");
  lines.push("");

  // Create schema — writable columns only
  const createFields = table.columns.filter(
    (c) => !AUDIT_COLUMNS.has(c.name),
  );
  lines.push(`export const Create${pascalName}Schema = z.object({`);
  for (const col of createFields) {
    const zodType = mapZodType(col, enums);
    const req = isRequired(col);
    // For required FK (uuid) or string columns: add .min(1) validation
    const withValidation =
      req &&
      (col.drizzleType === "varchar" || col.drizzleType === "text" || col.drizzleType === "uuid") &&
      !col.isEnumRef;
    const label = toPascalCase(col.name);
    const line = withValidation
      ? `  ${col.name}: ${zodType}.min(1, "${label} is required"),`
      : req
        ? `  ${col.name}: ${zodType},`
        : `  ${col.name}: ${zodType}.optional(),`;
    lines.push(line);
  }
  lines.push("});");
  lines.push(`export type Create${pascalName}Dto = z.infer<typeof Create${pascalName}Schema>;`);
  lines.push("");

  // Update schema — all writable columns optional
  lines.push(`export const Update${pascalName}Schema = z.object({`);
  for (const col of createFields) {
    const zodType = mapZodType(col, enums);
    const req = isRequired(col);
    const withValidation =
      req &&
      (col.drizzleType === "varchar" || col.drizzleType === "text" || col.drizzleType === "uuid") &&
      !col.isEnumRef;
    const line = withValidation
      ? `  ${col.name}: ${zodType}.min(1).optional(),`
      : `  ${col.name}: ${zodType}.optional(),`;
    lines.push(line);
  }
  lines.push("});");
  lines.push(`export type Update${pascalName}Dto = z.infer<typeof Update${pascalName}Schema>;`);

  return lines.join("\n");
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main(): Promise<void> {
  if (!existsSync(SCHEMA_DIR)) {
    console.error(`Schema directory not found: ${SCHEMA_DIR}`);
    process.exit(1);
  }

  if (!existsSync(DTO_DIR)) {
    mkdirSync(DTO_DIR, { recursive: true });
  }

  const files = (await readdir(SCHEMA_DIR)).filter((f) => f.endsWith(".ts"));

  for (const file of files) {
    const content = stripComments(await readFile(join(SCHEMA_DIR, file), "utf-8"));
    const enums = extractEnums(content);

    const table = extractTable(content, enums);
    if (!table) {
      console.log(`  SKIP  ${file} — no pgTable export found`);
      continue;
    }

    if (table.columns.length === 0) {
      console.log(`  SKIP  ${file} — no columns parsed`);
      continue;
    }

    const dto = generateDto(table, enums);

    const outName = singularize(table.tsName) + ".dto.ts";
    const outPath = join(DTO_DIR, outName);
    await writeFile(outPath, dto, "utf-8");
    console.log(`  DTO   ${file} → ${outName}`);
  }

  console.log("\nDone.");
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
