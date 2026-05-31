import type { NodePgDatabase } from "drizzle-orm/node-postgres";
import { countries } from "@db/schema/countries";
import { religion } from "@db/schema/religion";
import { grades } from "@db/schema/grades";
import { costCenters } from "@db/schema/costCenters";
import { projects } from "@db/schema/projects";
import { defaultColumns } from "./utils";

// ── Countries ──────────────────────────────────────────────
const COUNTRY_IDS = {
  INDONESIA: "01800001-0001-7000-8000-000000000001",
  SINGAPORE: "01800001-0002-7000-8000-000000000002",
  MALAYSIA: "01800001-0003-7000-8000-000000000003",
} as const;

const seedCountries = [
  {
    id: COUNTRY_IDS.INDONESIA,
    code: "ID",
    currency: "IDR",
    flag: "🇮🇩",
    ...defaultColumns(),
  },
  {
    id: COUNTRY_IDS.SINGAPORE,
    code: "SG",
    currency: "SGD",
    flag: "🇸🇬",
    ...defaultColumns(),
  },
  {
    id: COUNTRY_IDS.MALAYSIA,
    code: "MY",
    currency: "MYR",
    flag: "🇲🇾",
    ...defaultColumns(),
  },
];

// ── Religions ──────────────────────────────────────────────
const RELIGION_IDS = {
  ISLAM: "01800002-0001-7000-8000-000000000001",
  PROTESTANT: "01800002-0002-7000-8000-000000000002",
  CATHOLIC: "01800002-0003-7000-8000-000000000003",
  HINDU: "01800002-0004-7000-8000-000000000004",
} as const;

const seedReligions = [
  { id: RELIGION_IDS.ISLAM, name: "Islam", description: "Islam", ...defaultColumns() },
  {
    id: RELIGION_IDS.PROTESTANT,
    name: "Protestant",
    description: "Protestant Christian",
    ...defaultColumns(),
  },
  {
    id: RELIGION_IDS.CATHOLIC,
    name: "Catholic",
    description: "Roman Catholic",
    ...defaultColumns(),
  },
  { id: RELIGION_IDS.HINDU, name: "Hindu", description: "Hindu", ...defaultColumns() },
];

// ── Grades ─────────────────────────────────────────────────
const GRADE_IDS = {
  I: "01800003-0001-7000-8000-000000000001",
  II: "01800003-0002-7000-8000-000000000002",
  III: "01800003-0003-7000-8000-000000000003",
} as const;

const seedGrades = [
  { id: GRADE_IDS.I, name: "I", remark: "Grade I - Entry level", ...defaultColumns() },
  { id: GRADE_IDS.II, name: "II", remark: "Grade II - Mid level", ...defaultColumns() },
  { id: GRADE_IDS.III, name: "III", remark: "Grade III - Senior level", ...defaultColumns() },
];

// ── Cost Centers ───────────────────────────────────────────
const COSTCENTER_IDS = {
  HQ_IT: "01800004-0001-7000-8000-000000000001",
  HQ_FIN: "01800004-0002-7000-8000-000000000002",
  OPS_MFG: "01800004-0003-7000-8000-000000000003",
} as const;

const seedCostCenters = [
  {
    id: COSTCENTER_IDS.HQ_IT,
    sapCode: "CC-HQ-IT",
    name: "HQ Information Technology",
    ...defaultColumns(),
  },
  {
    id: COSTCENTER_IDS.HQ_FIN,
    sapCode: "CC-HQ-FIN",
    name: "HQ Finance",
    ...defaultColumns(),
  },
  {
    id: COSTCENTER_IDS.OPS_MFG,
    sapCode: "CC-OPS-MFG",
    name: "Operations Manufacturing",
    ...defaultColumns(),
  },
];

// ── Projects ───────────────────────────────────────────────
export const PROJECT_IDS = {
  ALPHA: "01800005-0001-7000-8000-000000000001",
  BETA: "01800005-0002-7000-8000-000000000002",
  GAMMA: "01800005-0003-7000-8000-000000000003",
} as const;

const seedProjects = [
  {
    id: PROJECT_IDS.ALPHA,
    sapCode: "PROJ-ALPHA",
    name: "Project Alpha - System Development",
    ...defaultColumns(),
  },
  {
    id: PROJECT_IDS.BETA,
    sapCode: "PROJ-BETA",
    name: "Project Beta - Infrastructure",
    ...defaultColumns(),
  },
  {
    id: PROJECT_IDS.GAMMA,
    sapCode: "PROJ-GAMMA",
    name: "Project Gamma - Maintenance",
    ...defaultColumns(),
  },
];

export async function seedRootMaster(db: NodePgDatabase): Promise<void> {
  await db.transaction(async (tx) => {
    for (const row of seedCountries) await tx.insert(countries).values(row);
    for (const row of seedReligions) await tx.insert(religion).values(row);
    for (const row of seedGrades) await tx.insert(grades).values(row);
    for (const row of seedCostCenters) await tx.insert(costCenters).values(row);
    for (const row of seedProjects) await tx.insert(projects).values(row);
  });
}

export { COUNTRY_IDS, RELIGION_IDS, GRADE_IDS, COSTCENTER_IDS };
