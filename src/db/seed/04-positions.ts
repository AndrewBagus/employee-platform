import type { NodePgDatabase } from "drizzle-orm/node-postgres";
import { positions } from "../schema/positions";
import { defaultColumns } from "./utils";
import { DEPT_IDS } from "./02-company-children";

const POSITION_IDS = {
  // Company 1 — HR
  P1_HR_MGR: "01800030-0001-7000-8000-000000000001",
  P1_HR_STAFF: "01800030-0002-7000-8000-000000000002",
  P1_PAYROLL: "01800030-0003-7000-8000-000000000003",
  P1_RECRUITER: "01800030-0004-7000-8000-000000000004",
  // Company 1 — Finance
  P1_FIN_MGR: "01800030-0005-7000-8000-000000000005",
  P1_ACCOUNTANT: "01800030-0006-7000-8000-000000000006",
  P1_TAX: "01800030-0007-7000-8000-000000000007",
  P1_TREASURY: "01800030-0008-7000-8000-000000000008",
  // Company 1 — IT
  P1_IT_MGR: "01800030-0009-7000-8000-000000000009",
  P1_SYSTEM_ANALYST: "01800030-000a-7000-8000-00000000000a",
  P1_DEVELOPER: "01800030-000b-7000-8000-00000000000b",
  P1_NETWORK: "01800030-000c-7000-8000-00000000000c",
  // Company 1 — Operations
  P1_OPS_MGR: "01800030-000d-7000-8000-00000000000d",
  P1_OPS_SUPERVISOR: "01800030-000e-7000-8000-00000000000e",
  P1_OPS_OPERATOR: "01800030-000f-7000-8000-00000000000f",
  // Company 1 — GA
  P1_GA_MGR: "01800030-0010-7000-8000-000000000010",
  P1_GA_STAFF: "01800030-0011-7000-8000-000000000011",
  // Company 2 — HR
  P2_HR_MGR: "01800030-0012-7000-8000-000000000012",
  P2_HR_STAFF: "01800030-0013-7000-8000-000000000013",
  // Company 2 — Finance
  P2_FIN_MGR: "01800030-0014-7000-8000-000000000014",
  P2_ACCOUNTANT: "01800030-0015-7000-8000-000000000015",
  // Company 2 — Engineering
  P2_ENG_MGR: "01800030-0016-7000-8000-000000000016",
  P2_ENGINEER: "01800030-0017-7000-8000-000000000017",
  P2_DRAFTER: "01800030-0018-7000-8000-000000000018",
  // Company 3 — Operations
  P3_OPS_MGR: "01800030-0019-7000-8000-000000000019",
  P3_TEAM_LEADER: "01800030-001a-7000-8000-00000000001a",
  P3_WORKER: "01800030-001b-7000-8000-00000000001b",
  // Company 3 — Logistics
  P3_LOG_MGR: "01800030-001c-7000-8000-00000000001c",
  P3_DRIVER: "01800030-001d-7000-8000-00000000001d",
  P3_WH_STAFF: "01800030-001e-7000-8000-00000000001e",
  // Company 3 — Admin
  P3_ADM_MGR: "01800030-001f-7000-8000-00000000001f",
  P3_ADM_STAFF: "01800030-0020-7000-8000-000000000020",
} as const;

const seedData = [
  // ── Company 1: Premier Corporation ──
  // HR (4 positions)
  { id: POSITION_IDS.P1_HR_MGR, departmentId: DEPT_IDS.C1_HR, name: "HR Manager", isHod: true, ...defaultColumns() },
  { id: POSITION_IDS.P1_HR_STAFF, departmentId: DEPT_IDS.C1_HR, name: "HR Staff", isHod: false, ...defaultColumns() },
  { id: POSITION_IDS.P1_PAYROLL, departmentId: DEPT_IDS.C1_HR, name: "Payroll Specialist", isHod: false, ...defaultColumns() },
  { id: POSITION_IDS.P1_RECRUITER, departmentId: DEPT_IDS.C1_HR, name: "Recruiter", isHod: false, ...defaultColumns() },
  // Finance (4 positions)
  { id: POSITION_IDS.P1_FIN_MGR, departmentId: DEPT_IDS.C1_FINANCE, name: "Finance Manager", isHod: true, ...defaultColumns() },
  { id: POSITION_IDS.P1_ACCOUNTANT, departmentId: DEPT_IDS.C1_FINANCE, name: "Accountant", isHod: false, ...defaultColumns() },
  { id: POSITION_IDS.P1_TAX, departmentId: DEPT_IDS.C1_FINANCE, name: "Tax Specialist", isHod: false, ...defaultColumns() },
  { id: POSITION_IDS.P1_TREASURY, departmentId: DEPT_IDS.C1_FINANCE, name: "Treasury Staff", isHod: false, ...defaultColumns() },
  // IT (4 positions)
  { id: POSITION_IDS.P1_IT_MGR, departmentId: DEPT_IDS.C1_IT, name: "IT Manager", isHod: true, ...defaultColumns() },
  { id: POSITION_IDS.P1_SYSTEM_ANALYST, departmentId: DEPT_IDS.C1_IT, name: "System Analyst", isHod: false, ...defaultColumns() },
  { id: POSITION_IDS.P1_DEVELOPER, departmentId: DEPT_IDS.C1_IT, name: "Developer", isHod: false, ...defaultColumns() },
  { id: POSITION_IDS.P1_NETWORK, departmentId: DEPT_IDS.C1_IT, name: "Network Admin", isHod: false, ...defaultColumns() },
  // Operations (3 positions)
  { id: POSITION_IDS.P1_OPS_MGR, departmentId: DEPT_IDS.C1_OPERATIONS, name: "Operations Manager", isHod: true, ...defaultColumns() },
  { id: POSITION_IDS.P1_OPS_SUPERVISOR, departmentId: DEPT_IDS.C1_OPERATIONS, name: "Supervisor", isHod: false, ...defaultColumns() },
  { id: POSITION_IDS.P1_OPS_OPERATOR, departmentId: DEPT_IDS.C1_OPERATIONS, name: "Operator", isHod: false, ...defaultColumns() },
  // GA (2 positions)
  { id: POSITION_IDS.P1_GA_MGR, departmentId: DEPT_IDS.C1_GA, name: "GA Manager", isHod: true, ...defaultColumns() },
  { id: POSITION_IDS.P1_GA_STAFF, departmentId: DEPT_IDS.C1_GA, name: "Admin Staff", isHod: false, ...defaultColumns() },

  // ── Company 2: Mitra Global Solutions ──
  // HR (2 positions)
  { id: POSITION_IDS.P2_HR_MGR, departmentId: DEPT_IDS.C2_HR, name: "HR Manager", isHod: true, ...defaultColumns() },
  { id: POSITION_IDS.P2_HR_STAFF, departmentId: DEPT_IDS.C2_HR, name: "HR Staff", isHod: false, ...defaultColumns() },
  // Finance (2 positions)
  { id: POSITION_IDS.P2_FIN_MGR, departmentId: DEPT_IDS.C2_FINANCE, name: "Finance Manager", isHod: true, ...defaultColumns() },
  { id: POSITION_IDS.P2_ACCOUNTANT, departmentId: DEPT_IDS.C2_FINANCE, name: "Accountant", isHod: false, ...defaultColumns() },
  // Engineering (3 positions)
  { id: POSITION_IDS.P2_ENG_MGR, departmentId: DEPT_IDS.C2_ENGINEERING, name: "Engineering Manager", isHod: true, ...defaultColumns() },
  { id: POSITION_IDS.P2_ENGINEER, departmentId: DEPT_IDS.C2_ENGINEERING, name: "Engineer", isHod: false, ...defaultColumns() },
  { id: POSITION_IDS.P2_DRAFTER, departmentId: DEPT_IDS.C2_ENGINEERING, name: "Drafter", isHod: false, ...defaultColumns() },

  // ── Company 3: Bintang Engineering ──
  // Operations (3 positions)
  { id: POSITION_IDS.P3_OPS_MGR, departmentId: DEPT_IDS.C3_OPERATIONS, name: "Operations Manager", isHod: true, ...defaultColumns() },
  { id: POSITION_IDS.P3_TEAM_LEADER, departmentId: DEPT_IDS.C3_OPERATIONS, name: "Team Leader", isHod: false, ...defaultColumns() },
  { id: POSITION_IDS.P3_WORKER, departmentId: DEPT_IDS.C3_OPERATIONS, name: "Worker", isHod: false, ...defaultColumns() },
  // Logistics (3 positions)
  { id: POSITION_IDS.P3_LOG_MGR, departmentId: DEPT_IDS.C3_LOGISTICS, name: "Logistics Manager", isHod: true, ...defaultColumns() },
  { id: POSITION_IDS.P3_DRIVER, departmentId: DEPT_IDS.C3_LOGISTICS, name: "Driver", isHod: false, ...defaultColumns() },
  { id: POSITION_IDS.P3_WH_STAFF, departmentId: DEPT_IDS.C3_LOGISTICS, name: "Warehouse Staff", isHod: false, ...defaultColumns() },
  // Admin (2 positions)
  { id: POSITION_IDS.P3_ADM_MGR, departmentId: DEPT_IDS.C3_ADMIN, name: "Admin Manager", isHod: true, ...defaultColumns() },
  { id: POSITION_IDS.P3_ADM_STAFF, departmentId: DEPT_IDS.C3_ADMIN, name: "Admin Staff", isHod: false, ...defaultColumns() },
];

export { POSITION_IDS };

export async function seedPositions(db: NodePgDatabase): Promise<void> {
  await db.transaction(async (tx) => {
    for (const row of seedData) await tx.insert(positions).values(row);
  });
}
