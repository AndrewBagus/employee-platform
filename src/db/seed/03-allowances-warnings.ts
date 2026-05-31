import type { NodePgDatabase } from "drizzle-orm/node-postgres";
import { allowances } from "../schema/allowances";
import { warnings } from "../schema/warnings";
import { defaultColumns } from "./utils";
import { COUNTRY_IDS } from "./00-root-master";
import { COMPANY_IDS } from "./01-companies";
import { WARNING_GRADE_IDS } from "./02-company-children";

// ── Allowances ─────────────────────────────────────────────
const ALLOWANCE_IDS = {
  C1_TRANSPORT: "01800020-0001-7000-8000-000000000001",
  C1_MEAL: "01800020-0002-7000-8000-000000000002",
  C1_HEALTH: "01800020-0003-7000-8000-000000000003",
  C2_TRANSPORT: "01800020-0004-7000-8000-000000000004",
  C2_MEAL: "01800020-0005-7000-8000-000000000005",
  C3_TRANSPORT: "01800020-0006-7000-8000-000000000006",
  C3_MEAL: "01800020-0007-7000-8000-000000000007",
  C3_PROJECT: "01800020-0008-7000-8000-000000000008",
} as const;

const seedAllowances = [
  {
    id: ALLOWANCE_IDS.C1_TRANSPORT,
    companyId: COMPANY_IDS.PREMIER_GROUP,
    currencyId: COUNTRY_IDS.INDONESIA,
    name: "Transport Allowance",
    nominal: "500000.00",
    remark: "Transport allowance per month",
    ...defaultColumns(),
  },
  {
    id: ALLOWANCE_IDS.C1_MEAL,
    companyId: COMPANY_IDS.PREMIER_GROUP,
    currencyId: COUNTRY_IDS.INDONESIA,
    name: "Meal Allowance",
    nominal: "350000.00",
    remark: "Meal allowance per month",
    ...defaultColumns(),
  },
  {
    id: ALLOWANCE_IDS.C1_HEALTH,
    companyId: COMPANY_IDS.PREMIER_GROUP,
    currencyId: COUNTRY_IDS.INDONESIA,
    name: "Health Allowance",
    nominal: "250000.00",
    remark: "Health allowance per month",
    ...defaultColumns(),
  },
  {
    id: ALLOWANCE_IDS.C2_TRANSPORT,
    companyId: COMPANY_IDS.SUMMIT_SOLUTIONS,
    currencyId: COUNTRY_IDS.SINGAPORE,
    name: "Transport Allowance",
    nominal: "300000.00",
    remark: "Transport allowance per month",
    ...defaultColumns(),
  },
  {
    id: ALLOWANCE_IDS.C2_MEAL,
    companyId: COMPANY_IDS.SUMMIT_SOLUTIONS,
    currencyId: COUNTRY_IDS.SINGAPORE,
    name: "Meal Allowance",
    nominal: "200000.00",
    remark: "Meal allowance per month",
    ...defaultColumns(),
  },
  {
    id: ALLOWANCE_IDS.C3_TRANSPORT,
    companyId: COMPANY_IDS.APEX_ENGINEERING,
    currencyId: COUNTRY_IDS.INDONESIA,
    name: "Transport Allowance",
    nominal: "150000.00",
    remark: "Transport allowance per month",
    ...defaultColumns(),
  },
  {
    id: ALLOWANCE_IDS.C3_MEAL,
    companyId: COMPANY_IDS.APEX_ENGINEERING,
    currencyId: COUNTRY_IDS.INDONESIA,
    name: "Meal Allowance",
    nominal: "100000.00",
    remark: "Meal allowance per month",
    ...defaultColumns(),
  },
  {
    id: ALLOWANCE_IDS.C3_PROJECT,
    companyId: COMPANY_IDS.APEX_ENGINEERING,
    currencyId: COUNTRY_IDS.INDONESIA,
    name: "Project Allowance",
    nominal: "750000.00",
    remark: "Project allowance per month",
    ...defaultColumns(),
  },
];

// ── Warnings ───────────────────────────────────────────────
const WARNING_IDS = {
  C1_LATE: "01800021-0001-7000-8000-000000000001",
  C1_ABSENT: "01800021-0002-7000-8000-000000000002",
  C2_LATE: "01800021-0003-7000-8000-000000000003",
  C2_ABSENT: "01800021-0004-7000-8000-000000000004",
  C3_SAFETY: "01800021-0005-7000-8000-000000000005",
  C3_QUALITY: "01800021-0006-7000-8000-000000000006",
} as const;

const seedWarnings = [
  {
    id: WARNING_IDS.C1_LATE,
    companyId: COMPANY_IDS.PREMIER_GROUP,
    warningGradeId: WARNING_GRADE_IDS.C1_SP1,
    name: "Late Arrival",
    remark: "Late arrival without valid reason",
    ...defaultColumns(),
  },
  {
    id: WARNING_IDS.C1_ABSENT,
    companyId: COMPANY_IDS.PREMIER_GROUP,
    warningGradeId: WARNING_GRADE_IDS.C1_SP2,
    name: "Unauthorized Absence",
    remark: "Absence without prior notice",
    ...defaultColumns(),
  },
  {
    id: WARNING_IDS.C2_LATE,
    companyId: COMPANY_IDS.SUMMIT_SOLUTIONS,
    warningGradeId: WARNING_GRADE_IDS.C2_SP1,
    name: "Late Arrival",
    remark: "Repeated late arrival without valid reason",
    ...defaultColumns(),
  },
  {
    id: WARNING_IDS.C2_ABSENT,
    companyId: COMPANY_IDS.SUMMIT_SOLUTIONS,
    warningGradeId: WARNING_GRADE_IDS.C2_SP2,
    name: "Unauthorized Absence",
    remark: "Absence without prior notice",
    ...defaultColumns(),
  },
  {
    id: WARNING_IDS.C3_SAFETY,
    companyId: COMPANY_IDS.APEX_ENGINEERING,
    warningGradeId: WARNING_GRADE_IDS.C3_SP1,
    name: "Safety Violation",
    remark: "Failure to comply with safety procedures",
    ...defaultColumns(),
  },
  {
    id: WARNING_IDS.C3_QUALITY,
    companyId: COMPANY_IDS.APEX_ENGINEERING,
    warningGradeId: WARNING_GRADE_IDS.C3_SP2,
    name: "Work Quality",
    remark: "Work not meeting quality standards",
    ...defaultColumns(),
  },
];

export async function seedAllowancesWarnings(db: NodePgDatabase): Promise<void> {
  await db.transaction(async (tx) => {
    for (const row of seedAllowances) await tx.insert(allowances).values(row);
    for (const row of seedWarnings) await tx.insert(warnings).values(row);
  });
}
