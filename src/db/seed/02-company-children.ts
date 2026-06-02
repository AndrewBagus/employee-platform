import type { NodePgDatabase } from "drizzle-orm/node-postgres";
import { departments } from "@db/schema/departments";
import { workingZones } from "@db/schema/workingZones";
import { trainingTypes } from "@db/schema/trainingTypes";
import { trainings } from "@db/schema/trainings";
import { trainingSchedules } from "@db/schema/trainingSchedules";
import { warningGrades } from "@db/schema/warningGrades";
import { defaultColumns } from "./utils";
import { COMPANY_IDS } from "./01-companies";

// ── Departments ────────────────────────────────────────────
const DEPT_IDS = {
  // Company 1 — Indah Corp
  C1_HR: "01800011-0001-7000-8000-000000000001",
  C1_FINANCE: "01800011-0002-7000-8000-000000000002",
  C1_IT: "01800011-0003-7000-8000-000000000003",
  C1_OPERATIONS: "01800011-0004-7000-8000-000000000004",
  C1_GA: "01800011-0005-7000-8000-000000000005",
  // Company 2 — Mitra Global Solutions
  C2_HR: "01800011-0006-7000-8000-000000000006",
  C2_FINANCE: "01800011-0007-7000-8000-000000000007",
  C2_ENGINEERING: "01800011-0008-7000-8000-000000000008",
  // Company 3 — Bintang Engineering
  C3_OPERATIONS: "01800011-0009-7000-8000-000000000009",
  C3_LOGISTICS: "01800011-000a-7000-8000-00000000000a",
  C3_ADMIN: "01800011-000b-7000-8000-00000000000b",
} as const;

const seedDepartments = [
  { id: DEPT_IDS.C1_HR, companyId: COMPANY_IDS.PREMIER_GROUP, name: "Human Resources", ...defaultColumns() },
  { id: DEPT_IDS.C1_FINANCE, companyId: COMPANY_IDS.PREMIER_GROUP, name: "Finance", ...defaultColumns() },
  { id: DEPT_IDS.C1_IT, companyId: COMPANY_IDS.PREMIER_GROUP, name: "Information Technology", ...defaultColumns() },
  { id: DEPT_IDS.C1_OPERATIONS, companyId: COMPANY_IDS.PREMIER_GROUP, name: "Operations", ...defaultColumns() },
  { id: DEPT_IDS.C1_GA, companyId: COMPANY_IDS.PREMIER_GROUP, name: "General Affairs", ...defaultColumns() },
  { id: DEPT_IDS.C2_HR, companyId: COMPANY_IDS.SUMMIT_SOLUTIONS, name: "Human Resources", ...defaultColumns() },
  { id: DEPT_IDS.C2_FINANCE, companyId: COMPANY_IDS.SUMMIT_SOLUTIONS, name: "Finance", ...defaultColumns() },
  { id: DEPT_IDS.C2_ENGINEERING, companyId: COMPANY_IDS.SUMMIT_SOLUTIONS, name: "Engineering", ...defaultColumns() },
  { id: DEPT_IDS.C3_OPERATIONS, companyId: COMPANY_IDS.APEX_ENGINEERING, name: "Operations", ...defaultColumns() },
  { id: DEPT_IDS.C3_LOGISTICS, companyId: COMPANY_IDS.APEX_ENGINEERING, name: "Logistics", ...defaultColumns() },
  { id: DEPT_IDS.C3_ADMIN, companyId: COMPANY_IDS.APEX_ENGINEERING, name: "Administration", ...defaultColumns() },
];

// ── Working Zones ──────────────────────────────────────────
const ZONE_IDS = {
  C1_ZONE_A: "01800012-0001-7000-8000-000000000001",
  C1_ZONE_B: "01800012-0002-7000-8000-000000000002",
  C1_ZONE_C: "01800012-0003-7000-8000-000000000003",
  C2_SITE_1: "01800012-0004-7000-8000-000000000004",
  C2_SITE_2: "01800012-0005-7000-8000-000000000005",
  C3_WORKSHOP: "01800012-0006-7000-8000-000000000006",
  C3_WAREHOUSE: "01800012-0007-7000-8000-000000000007",
} as const;

const seedWorkingZones = [
  { id: ZONE_IDS.C1_ZONE_A, companyId: COMPANY_IDS.PREMIER_GROUP, name: "Zone A - Produksi", remark: "Main production area", ...defaultColumns() },
  { id: ZONE_IDS.C1_ZONE_B, companyId: COMPANY_IDS.PREMIER_GROUP, name: "Zone B - Gudang", remark: "Warehouse area", ...defaultColumns() },
  { id: ZONE_IDS.C1_ZONE_C, companyId: COMPANY_IDS.PREMIER_GROUP, name: "Zone C - Kantor", remark: "Head office area", ...defaultColumns() },
  { id: ZONE_IDS.C2_SITE_1, companyId: COMPANY_IDS.SUMMIT_SOLUTIONS, name: "Site 1 - Batam", remark: "Batam project site", ...defaultColumns() },
  { id: ZONE_IDS.C2_SITE_2, companyId: COMPANY_IDS.SUMMIT_SOLUTIONS, name: "Site 2 - Jakarta", remark: "Jakarta project site", ...defaultColumns() },
  { id: ZONE_IDS.C3_WORKSHOP, companyId: COMPANY_IDS.APEX_ENGINEERING, name: "Workshop", remark: "Workshop", ...defaultColumns() },
  { id: ZONE_IDS.C3_WAREHOUSE, companyId: COMPANY_IDS.APEX_ENGINEERING, name: "Warehouse", remark: "Storage warehouse", ...defaultColumns() },
];

// ── Training Types ─────────────────────────────────────────
const TRAINING_TYPE_IDS = {
  C1_SAFETY: "01800013-0001-7000-8000-000000000001",
  C1_TECHNICAL: "01800013-0002-7000-8000-000000000002",
  C1_SOFT_SKILL: "01800013-0003-7000-8000-000000000003",
  C2_SAFETY: "01800013-0004-7000-8000-000000000004",
  C2_TECHNICAL: "01800013-0005-7000-8000-000000000005",
  C3_SAFETY: "01800013-0006-7000-8000-000000000006",
  C3_TECHNICAL: "01800013-0007-7000-8000-000000000007",
} as const;

const seedTrainingTypes = [
  { id: TRAINING_TYPE_IDS.C1_SAFETY, companyId: COMPANY_IDS.PREMIER_GROUP, name: "Occupational Safety", remark: "Safety training", ...defaultColumns() },
  { id: TRAINING_TYPE_IDS.C1_TECHNICAL, companyId: COMPANY_IDS.PREMIER_GROUP, name: "Technical", remark: "Technical training", ...defaultColumns() },
  { id: TRAINING_TYPE_IDS.C1_SOFT_SKILL, companyId: COMPANY_IDS.PREMIER_GROUP, name: "Soft Skill", remark: "Soft skill training", ...defaultColumns() },
  { id: TRAINING_TYPE_IDS.C2_SAFETY, companyId: COMPANY_IDS.SUMMIT_SOLUTIONS, name: "Safety", remark: "Safety training", ...defaultColumns() },
  { id: TRAINING_TYPE_IDS.C2_TECHNICAL, companyId: COMPANY_IDS.SUMMIT_SOLUTIONS, name: "Technical", remark: "Technical training", ...defaultColumns() },
  { id: TRAINING_TYPE_IDS.C3_SAFETY, companyId: COMPANY_IDS.APEX_ENGINEERING, name: "Safety", remark: "Safety training", ...defaultColumns() },
  { id: TRAINING_TYPE_IDS.C3_TECHNICAL, companyId: COMPANY_IDS.APEX_ENGINEERING, name: "Technical", remark: "Technical training", ...defaultColumns() },
];

// ── Trainings ──────────────────────────────────────────────
const TRAINING_IDS = {
  C1_FIRE_DRILL: "01800014-0001-7000-8000-000000000001",
  C1_WELDING: "01800014-0002-7000-8000-000000000002",
  C1_COMMS: "01800014-0003-7000-8000-000000000003",
  C2_SAFETY_INDUCTION: "01800014-0004-7000-8000-000000000004",
  C2_SOP: "01800014-0005-7000-8000-000000000005",
  C3_BASIC_SAFETY: "01800014-0006-7000-8000-000000000006",
  C3_FORKLIFT: "01800014-0007-7000-8000-000000000007",
} as const;

const seedTrainings = [
  { id: TRAINING_IDS.C1_FIRE_DRILL, companyId: COMPANY_IDS.PREMIER_GROUP, name: "Fire Drill", remark: "Emergency fire response training", ...defaultColumns() },
  { id: TRAINING_IDS.C1_WELDING, companyId: COMPANY_IDS.PREMIER_GROUP, name: "Welding 101", remark: "Basic welding training", ...defaultColumns() },
  { id: TRAINING_IDS.C1_COMMS, companyId: COMPANY_IDS.PREMIER_GROUP, name: "Komunikasi Efektif", remark: "Workplace communication training", ...defaultColumns() },
  { id: TRAINING_IDS.C2_SAFETY_INDUCTION, companyId: COMPANY_IDS.SUMMIT_SOLUTIONS, name: "Safety Induction", remark: "Safety induction for new employees", ...defaultColumns() },
  { id: TRAINING_IDS.C2_SOP, companyId: COMPANY_IDS.SUMMIT_SOLUTIONS, name: "SOP Documentation", remark: "SOP documentation training", ...defaultColumns() },
  { id: TRAINING_IDS.C3_BASIC_SAFETY, companyId: COMPANY_IDS.APEX_ENGINEERING, name: "Basic Safety", remark: "Basic workplace safety", ...defaultColumns() },
  { id: TRAINING_IDS.C3_FORKLIFT, companyId: COMPANY_IDS.APEX_ENGINEERING, name: "Forklift Operation", remark: "Forklift operation", ...defaultColumns() },
];

// ── Training Schedules ─────────────────────────────────────
const SCHEDULE_IDS = {
  C1_SCH_A: "01800015-0001-7000-8000-000000000001",
  C1_SCH_B: "01800015-0002-7000-8000-000000000002",
  C1_SCH_C: "01800015-0003-7000-8000-000000000003",
  C2_SCH_A: "01800015-0004-7000-8000-000000000004",
  C2_SCH_B: "01800015-0005-7000-8000-000000000005",
  C3_SCH_A: "01800015-0006-7000-8000-000000000006",
  C3_SCH_B: "01800015-0007-7000-8000-000000000007",
} as const;

const seedTrainingSchedules = [
  { id: SCHEDULE_IDS.C1_SCH_A, companyId: COMPANY_IDS.PREMIER_GROUP, trainingDate: "2025-01-15", trainingTime: "09:00:00", remark: "Fire Drill Q1", ...defaultColumns() },
  { id: SCHEDULE_IDS.C1_SCH_B, companyId: COMPANY_IDS.PREMIER_GROUP, trainingDate: "2025-03-20", trainingTime: "10:00:00", remark: "Welding 101 Q1", ...defaultColumns() },
  { id: SCHEDULE_IDS.C1_SCH_C, companyId: COMPANY_IDS.PREMIER_GROUP, trainingDate: "2025-06-10", trainingTime: "08:30:00", remark: "Effective Communication Q2", ...defaultColumns() },
  { id: SCHEDULE_IDS.C2_SCH_A, companyId: COMPANY_IDS.SUMMIT_SOLUTIONS, trainingDate: "2025-02-10", trainingTime: "09:00:00", remark: "Safety Induction Q1", ...defaultColumns() },
  { id: SCHEDULE_IDS.C2_SCH_B, companyId: COMPANY_IDS.SUMMIT_SOLUTIONS, trainingDate: "2025-05-15", trainingTime: "13:00:00", remark: "SOP Training Q2", ...defaultColumns() },
  { id: SCHEDULE_IDS.C3_SCH_A, companyId: COMPANY_IDS.APEX_ENGINEERING, trainingDate: "2025-04-01", trainingTime: "08:00:00", remark: "Basic Safety Q2", ...defaultColumns() },
  { id: SCHEDULE_IDS.C3_SCH_B, companyId: COMPANY_IDS.APEX_ENGINEERING, trainingDate: "2025-07-20", trainingTime: "09:30:00", remark: "Forklift Q3", ...defaultColumns() },
];

// ── Warning Grades ─────────────────────────────────────────
const WARNING_GRADE_IDS = {
  C1_SP1: "01800016-0001-7000-8000-000000000001",
  C1_SP2: "01800016-0002-7000-8000-000000000002",
  C1_SP3: "01800016-0003-7000-8000-000000000003",
  C2_SP1: "01800016-0004-7000-8000-000000000004",
  C2_SP2: "01800016-0005-7000-8000-000000000005",
  C3_SP1: "01800016-0006-7000-8000-000000000006",
  C3_SP2: "01800016-0007-7000-8000-000000000007",
} as const;

const seedWarningGrades = [
  { id: WARNING_GRADE_IDS.C1_SP1, companyId: COMPANY_IDS.PREMIER_GROUP, name: "SP1 - Minor", remark: "Warning Letter 1 - Minor offense", ...defaultColumns() },
  { id: WARNING_GRADE_IDS.C1_SP2, companyId: COMPANY_IDS.PREMIER_GROUP, name: "SP2 - Medium", remark: "Warning Letter 2 - Medium offense", ...defaultColumns() },
  { id: WARNING_GRADE_IDS.C1_SP3, companyId: COMPANY_IDS.PREMIER_GROUP, name: "SP3 - Severe", remark: "Warning Letter 3 - Severe offense", ...defaultColumns() },
  { id: WARNING_GRADE_IDS.C2_SP1, companyId: COMPANY_IDS.SUMMIT_SOLUTIONS, name: "SP1 - Minor", remark: "Minor offense", ...defaultColumns() },
  { id: WARNING_GRADE_IDS.C2_SP2, companyId: COMPANY_IDS.SUMMIT_SOLUTIONS, name: "SP2 - Major", remark: "Major offense", ...defaultColumns() },
  { id: WARNING_GRADE_IDS.C3_SP1, companyId: COMPANY_IDS.APEX_ENGINEERING, name: "SP1 - Minor", remark: "Minor offense", ...defaultColumns() },
  { id: WARNING_GRADE_IDS.C3_SP2, companyId: COMPANY_IDS.APEX_ENGINEERING, name: "SP2 - Severe", remark: "Severe offense", ...defaultColumns() },
];

export {
  DEPT_IDS,
  ZONE_IDS,
  TRAINING_TYPE_IDS,
  TRAINING_IDS,
  SCHEDULE_IDS,
  WARNING_GRADE_IDS,
};

export async function seedCompanyChildren(db: NodePgDatabase): Promise<void> {
  await db.transaction(async (tx) => {
    for (const row of seedDepartments) await tx.insert(departments).values(row);
    for (const row of seedWorkingZones) await tx.insert(workingZones).values(row);
    for (const row of seedTrainingTypes) await tx.insert(trainingTypes).values(row);
    for (const row of seedTrainings) await tx.insert(trainings).values(row);
    for (const row of seedTrainingSchedules) await tx.insert(trainingSchedules).values(row);
    for (const row of seedWarningGrades) await tx.insert(warningGrades).values(row);
  });
}
