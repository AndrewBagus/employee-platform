import type { NodePgDatabase } from "drizzle-orm/node-postgres";
import { employeeAddresses } from "../schema/employeeAddresses";
import { employeeContracts } from "../schema/employeeContracts";
import { employeeContractAdvisors } from "../schema/employeeContractAdvisors";
import { employeeLeaveAdvisors } from "../schema/employeeLeaveAdvisors";
import { employeeMcus } from "../schema/employeeMcus";
import { employeeProjects } from "../schema/employeeProjects";
import { employeeTrainings } from "../schema/employeeTrainings";
import { employeeWarnings } from "../schema/employeeWarnings";
import { employeeWorkZones } from "../schema/employeeWorkZones";
import { defaultColumns } from "./utils";
import { PROJECT_IDS } from "./00-root-master";
import { ZONE_IDS } from "./02-company-children";
import { EMPLOYEE_IDS } from "./05-employees";

// ── Employee Addresses (2 per employee for 6 employees) ────
const ADDRESS_IDS = {
  // Employee 1 — John Smith
  E1_HOME: "01800050-0001-7000-8000-000000000001",
  E1_MAILING: "01800050-0002-7000-8000-000000000002",
  // Employee 2 — Jane Doe
  E2_HOME: "01800050-0003-7000-8000-000000000003",
  E2_PARENTS: "01800050-0004-7000-8000-000000000004",
  // Employee 3 — Bob Wilson
  E3_HOME: "01800050-0005-7000-8000-000000000005",
  E3_MAILING: "01800050-0006-7000-8000-000000000006",
  // Employee 4 — Michael Tan
  E4_HOME: "01800050-0007-7000-8000-000000000007",
  E4_MAILING: "01800050-0008-7000-8000-000000000008",
  // Employee 6 — James Brown
  E6_HOME: "01800050-0009-7000-8000-000000000009",
  E6_MAILING: "01800050-000a-7000-8000-00000000000a",
  // Employee 7 — Tom Harris
  E7_HOME: "01800050-000b-7000-8000-00000000000b",
  E7_PARENTS: "01800050-000c-7000-8000-00000000000c",
} as const;

const seedAddresses = [
  { id: ADDRESS_IDS.E1_HOME, employeeId: EMPLOYEE_IDS.C1_SUPERVISOR, address: "123 High Street, Central London", remark: "Home address", ...defaultColumns() },
  { id: ADDRESS_IDS.E1_MAILING, employeeId: EMPLOYEE_IDS.C1_SUPERVISOR, address: "PO Box 456, London EC1A 1BB", remark: "Mailing address", ...defaultColumns() },
  { id: ADDRESS_IDS.E2_HOME, employeeId: EMPLOYEE_IDS.C1_SUBORDINATE, address: "45 Oxford Road, Manchester", remark: "Boarding house", ...defaultColumns() },
  { id: ADDRESS_IDS.E2_PARENTS, employeeId: EMPLOYEE_IDS.C1_SUBORDINATE, address: "78 King Street, Old Trafford", remark: "Parents' address", ...defaultColumns() },
  { id: ADDRESS_IDS.E3_HOME, employeeId: EMPLOYEE_IDS.C1_STAFF, address: "12 Station Road, Birmingham", remark: "Home address", ...defaultColumns() },
  { id: ADDRESS_IDS.E3_MAILING, employeeId: EMPLOYEE_IDS.C1_STAFF, address: "5 Victoria Park, Selly Oak", remark: "Mailing address", ...defaultColumns() },
  { id: ADDRESS_IDS.E4_HOME, employeeId: EMPLOYEE_IDS.C2_MGR, address: "18 Orchard Road, #12-34, Singapore 238896", remark: "Home address", ...defaultColumns() },
  { id: ADDRESS_IDS.E4_MAILING, employeeId: EMPLOYEE_IDS.C2_MGR, address: "PO Box 789, Singapore 918234", remark: "Mailing address", ...defaultColumns() },
  { id: ADDRESS_IDS.E6_HOME, employeeId: EMPLOYEE_IDS.C3_OPS_MGR, address: "56 Park Lane, Leeds", remark: "Home address", ...defaultColumns() },
  { id: ADDRESS_IDS.E6_MAILING, employeeId: EMPLOYEE_IDS.C3_OPS_MGR, address: "C2 Green Hills Estate, Leeds", remark: "Mailing address", ...defaultColumns() },
  { id: ADDRESS_IDS.E7_HOME, employeeId: EMPLOYEE_IDS.C3_WORKER, address: "101 Broad Street, Bristol", remark: "Rental house", ...defaultColumns() },
  { id: ADDRESS_IDS.E7_PARENTS, employeeId: EMPLOYEE_IDS.C3_WORKER, address: "34 Cathedral Road, Bedminster", remark: "Parents' address", ...defaultColumns() },
];

// ── Employee Contracts (2 per employee for 4 employees) ────
const CONTRACT_IDS = {
  E1_ACTIVE: "01800051-0001-7000-8000-000000000001",
  E1_EXPIRED: "01800051-0002-7000-8000-000000000002",
  E2_ACTIVE: "01800051-0003-7000-8000-000000000003",
  E2_EXPIRED: "01800051-0004-7000-8000-000000000004",
  E4_ACTIVE: "01800051-0005-7000-8000-000000000005",
  E4_EXPIRED: "01800051-0006-7000-8000-000000000006",
  E6_ACTIVE: "01800051-0007-7000-8000-000000000007",
  E6_EXPIRED: "01800051-0008-7000-8000-000000000008",
} as const;

const seedContracts = [
  { id: CONTRACT_IDS.E1_EXPIRED, employeeId: EMPLOYEE_IDS.C1_SUPERVISOR, startDate: "2018-01-01", endDate: "2022-12-31", terminationDate: "2022-12-31", remark: "First contract (completed)", ...defaultColumns() },
  { id: CONTRACT_IDS.E1_ACTIVE, employeeId: EMPLOYEE_IDS.C1_SUPERVISOR, startDate: "2023-01-01", endDate: "2027-12-31", terminationDate: "9999-12-31", remark: "Second contract (active)", ...defaultColumns() },
  { id: CONTRACT_IDS.E2_EXPIRED, employeeId: EMPLOYEE_IDS.C1_SUBORDINATE, startDate: "2023-07-01", endDate: "2024-06-30", terminationDate: "2024-06-30", remark: "Probation contract", ...defaultColumns() },
  { id: CONTRACT_IDS.E2_ACTIVE, employeeId: EMPLOYEE_IDS.C1_SUBORDINATE, startDate: "2024-07-01", endDate: "2025-12-31", terminationDate: "9999-12-31", remark: "Extension contract (active)", ...defaultColumns() },
  { id: CONTRACT_IDS.E4_EXPIRED, employeeId: EMPLOYEE_IDS.C2_MGR, startDate: "2019-03-01", endDate: "2023-02-28", terminationDate: "2023-02-28", remark: "First contract", ...defaultColumns() },
  { id: CONTRACT_IDS.E4_ACTIVE, employeeId: EMPLOYEE_IDS.C2_MGR, startDate: "2023-03-01", endDate: "2028-02-29", terminationDate: "9999-12-31", remark: "Second contract (active)", ...defaultColumns() },
  { id: CONTRACT_IDS.E6_EXPIRED, employeeId: EMPLOYEE_IDS.C3_OPS_MGR, startDate: "2020-05-01", endDate: "2024-04-30", terminationDate: "2024-04-30", remark: "First contract", ...defaultColumns() },
  { id: CONTRACT_IDS.E6_ACTIVE, employeeId: EMPLOYEE_IDS.C3_OPS_MGR, startDate: "2024-05-01", endDate: "2028-04-30", terminationDate: "9999-12-31", remark: "Second contract (active)", ...defaultColumns() },
];

// ── Employee Contract Advisors (2 per employee for 3 employees) ─
const CONT_ADV_IDS = {
  E1_ADV1: "01800052-0001-7000-8000-000000000001",
  E1_ADV2: "01800052-0002-7000-8000-000000000002",
  E2_ADV1: "01800052-0003-7000-8000-000000000003",
  E2_ADV2: "01800052-0004-7000-8000-000000000004",
  E4_ADV1: "01800052-0005-7000-8000-000000000005",
  E4_ADV2: "01800052-0006-7000-8000-000000000006",
} as const;

const seedContractAdvisors = [
  { id: CONT_ADV_IDS.E1_ADV1, employeeId: EMPLOYEE_IDS.C1_SUPERVISOR, order: 1, remark: "Primary contract advisor", ...defaultColumns() },
  { id: CONT_ADV_IDS.E1_ADV2, employeeId: EMPLOYEE_IDS.C1_SUPERVISOR, order: 2, remark: "Secondary contract advisor", ...defaultColumns() },
  { id: CONT_ADV_IDS.E2_ADV1, employeeId: EMPLOYEE_IDS.C1_SUBORDINATE, order: 1, remark: "Primary contract advisor", ...defaultColumns() },
  { id: CONT_ADV_IDS.E2_ADV2, employeeId: EMPLOYEE_IDS.C1_SUBORDINATE, order: 2, remark: "Secondary contract advisor", ...defaultColumns() },
  { id: CONT_ADV_IDS.E4_ADV1, employeeId: EMPLOYEE_IDS.C2_MGR, order: 1, remark: "Primary contract advisor", ...defaultColumns() },
  { id: CONT_ADV_IDS.E4_ADV2, employeeId: EMPLOYEE_IDS.C2_MGR, order: 2, remark: "Secondary contract advisor", ...defaultColumns() },
];

// ── Employee Leave Advisors (2 per employee for 3 employees) ──
const LEAV_ADV_IDS = {
  E1_LA1: "01800053-0001-7000-8000-000000000001",
  E1_LA2: "01800053-0002-7000-8000-000000000002",
  E2_LA1: "01800053-0003-7000-8000-000000000003",
  E2_LA2: "01800053-0004-7000-8000-000000000004",
  E4_LA1: "01800053-0005-7000-8000-000000000005",
  E4_LA2: "01800053-0006-7000-8000-000000000006",
} as const;

const seedLeaveAdvisors = [
  { id: LEAV_ADV_IDS.E1_LA1, employeeId: EMPLOYEE_IDS.C1_SUPERVISOR, order: 1, remark: "Primary leave advisor", ...defaultColumns() },
  { id: LEAV_ADV_IDS.E1_LA2, employeeId: EMPLOYEE_IDS.C1_SUPERVISOR, order: 2, remark: "Secondary leave advisor", ...defaultColumns() },
  { id: LEAV_ADV_IDS.E2_LA1, employeeId: EMPLOYEE_IDS.C1_SUBORDINATE, order: 1, remark: "Primary leave advisor", ...defaultColumns() },
  { id: LEAV_ADV_IDS.E2_LA2, employeeId: EMPLOYEE_IDS.C1_SUBORDINATE, order: 2, remark: "Secondary leave advisor", ...defaultColumns() },
  { id: LEAV_ADV_IDS.E4_LA1, employeeId: EMPLOYEE_IDS.C2_MGR, order: 1, remark: "Primary leave advisor", ...defaultColumns() },
  { id: LEAV_ADV_IDS.E4_LA2, employeeId: EMPLOYEE_IDS.C2_MGR, order: 2, remark: "Secondary leave advisor", ...defaultColumns() },
];

// ── Employee Medical Checkups (2 per employee for 4 employees) ─
const MCU_IDS = {
  E1_PASS: "01800054-0001-7000-8000-000000000001",
  E1_FAILED: "01800054-0002-7000-8000-000000000002",
  E2_PASS: "01800054-0003-7000-8000-000000000003",
  E2_FAILED: "01800054-0004-7000-8000-000000000004",
  E3_PASS: "01800054-0005-7000-8000-000000000005",
  E3_FAILED: "01800054-0006-7000-8000-000000000006",
  E6_PASS: "01800054-0007-7000-8000-000000000007",
  E6_FAILED: "01800054-0008-7000-8000-000000000008",
} as const;

const seedMcus = [
  { id: MCU_IDS.E1_PASS, employeeId: EMPLOYEE_IDS.C1_SUPERVISOR, mcuDate: "2024-01-15", mcuEndDate: null, mcuStatus: "PASS" as const, remark: "Annual MCU - healthy", ...defaultColumns() },
  { id: MCU_IDS.E1_FAILED, employeeId: EMPLOYEE_IDS.C1_SUPERVISOR, mcuDate: "2023-01-20", mcuEndDate: "2023-02-10", mcuStatus: "FAILED" as const, remark: "MCU 2023 - needs follow-up examination", ...defaultColumns() },
  { id: MCU_IDS.E2_PASS, employeeId: EMPLOYEE_IDS.C1_SUBORDINATE, mcuDate: "2024-06-01", mcuEndDate: null, mcuStatus: "PASS" as const, remark: "Pre-employment MCU", ...defaultColumns() },
  { id: MCU_IDS.E2_FAILED, employeeId: EMPLOYEE_IDS.C1_SUBORDINATE, mcuDate: "2024-03-10", mcuEndDate: null, mcuStatus: "FAILED" as const, remark: "Initial MCU - high blood pressure", ...defaultColumns() },
  { id: MCU_IDS.E3_PASS, employeeId: EMPLOYEE_IDS.C1_STAFF, mcuDate: "2024-11-05", mcuEndDate: null, mcuStatus: "PASS" as const, remark: "Annual MCU", ...defaultColumns() },
  { id: MCU_IDS.E3_FAILED, employeeId: EMPLOYEE_IDS.C1_STAFF, mcuDate: "2023-11-10", mcuEndDate: null, mcuStatus: "FAILED" as const, remark: "MCU 2023 - high blood sugar", ...defaultColumns() },
  { id: MCU_IDS.E6_PASS, employeeId: EMPLOYEE_IDS.C3_OPS_MGR, mcuDate: "2024-08-20", mcuEndDate: null, mcuStatus: "PASS" as const, remark: "Annual MCU", ...defaultColumns() },
  { id: MCU_IDS.E6_FAILED, employeeId: EMPLOYEE_IDS.C3_OPS_MGR, mcuDate: "2023-08-15", mcuEndDate: "2023-09-30", mcuStatus: "FAILED" as const, remark: "MCU 2023 - needs physiotherapy", ...defaultColumns() },
];

// ── Employee Projects (many-to-many) ──────────────────────
const seedEmployeeProjects = [
  { employeeId: EMPLOYEE_IDS.C1_SUPERVISOR, projectId: PROJECT_IDS.ALPHA, remark: "IT Lead - System Development", ...defaultColumns() },
  { employeeId: EMPLOYEE_IDS.C1_SUPERVISOR, projectId: PROJECT_IDS.BETA, remark: "IT Consultant - Infrastructure", ...defaultColumns() },
  { employeeId: EMPLOYEE_IDS.C1_SUBORDINATE, projectId: PROJECT_IDS.ALPHA, remark: "Developer - System Development", ...defaultColumns() },
  { employeeId: EMPLOYEE_IDS.C1_STAFF, projectId: PROJECT_IDS.GAMMA, remark: "Operator - Maintenance", ...defaultColumns() },
  { employeeId: EMPLOYEE_IDS.C2_MGR, projectId: PROJECT_IDS.BETA, remark: "Engineering Lead - Infrastructure", ...defaultColumns() },
  { employeeId: EMPLOYEE_IDS.C2_ENG, projectId: PROJECT_IDS.BETA, remark: "Site Engineer - Infrastructure", ...defaultColumns() },
  { employeeId: EMPLOYEE_IDS.C3_OPS_MGR, projectId: PROJECT_IDS.GAMMA, remark: "Operations Lead - Maintenance", ...defaultColumns() },
  { employeeId: EMPLOYEE_IDS.C3_WORKER, projectId: PROJECT_IDS.GAMMA, remark: "Worker - Maintenance", ...defaultColumns() },
];

// ── Employee Trainings (2 per employee for 4 employees) ────
const TRAIN_IDS = {
  E1_T1: "01800055-0001-7000-8000-000000000001",
  E1_T2: "01800055-0002-7000-8000-000000000002",
  E2_T1: "01800055-0003-7000-8000-000000000003",
  E2_T2: "01800055-0004-7000-8000-000000000004",
  E4_T1: "01800055-0005-7000-8000-000000000005",
  E4_T2: "01800055-0006-7000-8000-000000000006",
  E6_T1: "01800055-0007-7000-8000-000000000007",
  E6_T2: "01800055-0008-7000-8000-000000000008",
} as const;

const seedTrainings = [
  { id: TRAIN_IDS.E1_T1, employeeId: EMPLOYEE_IDS.C1_SUPERVISOR, trainingDate: "2024-02-10", trainingStatus: "PASS" as const, remark: "Leadership training", ...defaultColumns() },
  { id: TRAIN_IDS.E1_T2, employeeId: EMPLOYEE_IDS.C1_SUPERVISOR, trainingDate: "2025-01-20", trainingStatus: "REGISTERED" as const, remark: "Advanced leadership", ...defaultColumns() },
  { id: TRAIN_IDS.E2_T1, employeeId: EMPLOYEE_IDS.C1_SUBORDINATE, trainingDate: "2024-05-15", trainingStatus: "PASS" as const, remark: "Node.js workshop", ...defaultColumns() },
  { id: TRAIN_IDS.E2_T2, employeeId: EMPLOYEE_IDS.C1_SUBORDINATE, trainingDate: "2024-11-01", trainingStatus: "FAILED" as const, remark: "Database design", ...defaultColumns() },
  { id: TRAIN_IDS.E4_T1, employeeId: EMPLOYEE_IDS.C2_MGR, trainingDate: "2024-03-20", trainingStatus: "PASS" as const, remark: "Project management", ...defaultColumns() },
  { id: TRAIN_IDS.E4_T2, employeeId: EMPLOYEE_IDS.C2_MGR, trainingDate: "2024-09-10", trainingStatus: "NOTATTEND" as const, remark: "Risk assessment", ...defaultColumns() },
  { id: TRAIN_IDS.E6_T1, employeeId: EMPLOYEE_IDS.C3_OPS_MGR, trainingDate: "2024-07-01", trainingStatus: "PASS" as const, remark: "Safety supervisor", ...defaultColumns() },
  { id: TRAIN_IDS.E6_T2, employeeId: EMPLOYEE_IDS.C3_OPS_MGR, trainingDate: "2025-02-15", trainingStatus: "REGISTERED" as const, remark: "Operational excellence", ...defaultColumns() },
];

// ── Employee Warnings ─────────────────────────────────────
const WARN_IDS = {
  E2_W1: "01800056-0001-7000-8000-000000000001",
  E3_W1: "01800056-0002-7000-8000-000000000002",
  E3_W2: "01800056-0003-7000-8000-000000000003",
  E5_W1: "01800056-0004-7000-8000-000000000004",
  E7_W1: "01800056-0005-7000-8000-000000000005",
  E7_W2: "01800056-0006-7000-8000-000000000006",
} as const;

const seedEmployeeWarnings = [
  { id: WARN_IDS.E2_W1, employeeId: EMPLOYEE_IDS.C1_SUBORDINATE, warningStartDate: "2024-08-01", warningEndDate: null, warningStatus: "PERMANENT" as const, remark: "Repeated late arrivals", ...defaultColumns() },
  { id: WARN_IDS.E3_W1, employeeId: EMPLOYEE_IDS.C1_STAFF, warningStartDate: "2024-10-15", warningEndDate: "2025-04-15", warningStatus: "TEMPORARY" as const, remark: "Production SOP violation", ...defaultColumns() },
  { id: WARN_IDS.E3_W2, employeeId: EMPLOYEE_IDS.C1_STAFF, warningStartDate: "2024-03-01", warningEndDate: "2024-09-01", warningStatus: "TEMPORARY" as const, remark: "Unauthorized absence", ...defaultColumns() },
  { id: WARN_IDS.E5_W1, employeeId: EMPLOYEE_IDS.C2_ENG, warningStartDate: "2024-12-01", warningEndDate: null, warningStatus: "PERMANENT" as const, remark: "Safety violation on site", ...defaultColumns() },
  { id: WARN_IDS.E7_W1, employeeId: EMPLOYEE_IDS.C3_WORKER, warningStartDate: "2024-09-01", warningEndDate: "2025-03-01", warningStatus: "TEMPORARY" as const, remark: "Smoking in prohibited area", ...defaultColumns() },
  { id: WARN_IDS.E7_W2, employeeId: EMPLOYEE_IDS.C3_WORKER, warningStartDate: "2025-01-15", warningEndDate: null, warningStatus: "PERMANENT" as const, remark: "Littering", ...defaultColumns() },
];

// ── Employee Work Zones ────────────────────────────────────
const WORKZONE_IDS = {
  E1_Z1: "01800057-0001-7000-8000-000000000001",
  E1_Z2: "01800057-0002-7000-8000-000000000002",
  E3_Z1: "01800057-0003-7000-8000-000000000003",
  E3_Z2: "01800057-0004-7000-8000-000000000004",
  E4_Z1: "01800057-0005-7000-8000-000000000005",
  E4_Z2: "01800057-0006-7000-8000-000000000006",
  E6_Z1: "01800057-0007-7000-8000-000000000007",
  E6_Z2: "01800057-0008-7000-8000-000000000008",
} as const;

const seedWorkZones = [
  { id: WORKZONE_IDS.E1_Z1, employeeId: EMPLOYEE_IDS.C1_SUPERVISOR, workingZoneId: ZONE_IDS.C1_ZONE_C, remark: "Head office", ...defaultColumns() },
  { id: WORKZONE_IDS.E1_Z2, employeeId: EMPLOYEE_IDS.C1_SUPERVISOR, workingZoneId: ZONE_IDS.C1_ZONE_A, remark: "Production inspection", ...defaultColumns() },
  { id: WORKZONE_IDS.E3_Z1, employeeId: EMPLOYEE_IDS.C1_STAFF, workingZoneId: ZONE_IDS.C1_ZONE_A, remark: "Primary work area", ...defaultColumns() },
  { id: WORKZONE_IDS.E3_Z2, employeeId: EMPLOYEE_IDS.C1_STAFF, workingZoneId: ZONE_IDS.C1_ZONE_B, remark: "Warehouse area", ...defaultColumns() },
  { id: WORKZONE_IDS.E4_Z1, employeeId: EMPLOYEE_IDS.C2_MGR, workingZoneId: ZONE_IDS.C2_SITE_1, remark: "Main site", ...defaultColumns() },
  { id: WORKZONE_IDS.E4_Z2, employeeId: EMPLOYEE_IDS.C2_MGR, workingZoneId: ZONE_IDS.C2_SITE_2, remark: "Secondary site", ...defaultColumns() },
  { id: WORKZONE_IDS.E6_Z1, employeeId: EMPLOYEE_IDS.C3_OPS_MGR, workingZoneId: ZONE_IDS.C3_WORKSHOP, remark: "Main workshop", ...defaultColumns() },
  { id: WORKZONE_IDS.E6_Z2, employeeId: EMPLOYEE_IDS.C3_OPS_MGR, workingZoneId: ZONE_IDS.C3_WAREHOUSE, remark: "Warehouse", ...defaultColumns() },
];

export async function seedEmployeeDetails(db: NodePgDatabase): Promise<void> {
  await db.transaction(async (tx) => {
    for (const row of seedAddresses) await tx.insert(employeeAddresses).values(row);
    for (const row of seedContracts) await tx.insert(employeeContracts).values(row);
    for (const row of seedContractAdvisors) await tx.insert(employeeContractAdvisors).values(row);
    for (const row of seedLeaveAdvisors) await tx.insert(employeeLeaveAdvisors).values(row);
    for (const row of seedMcus) await tx.insert(employeeMcus).values(row);
    for (const row of seedEmployeeProjects) await tx.insert(employeeProjects).values(row);
    for (const row of seedTrainings) await tx.insert(employeeTrainings).values(row);
    for (const row of seedEmployeeWarnings) await tx.insert(employeeWarnings).values(row);
    for (const row of seedWorkZones) await tx.insert(employeeWorkZones).values(row);
  });
}
