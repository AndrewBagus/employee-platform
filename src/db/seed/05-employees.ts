import type { NodePgDatabase } from "drizzle-orm/node-postgres";
import { employees } from "../schema/employees";
import { defaultColumns } from "./utils";
import { COMPANY_IDS } from "./01-companies";
import { DEPT_IDS } from "./02-company-children";
import { POSITION_IDS } from "./04-positions";

export const EMPLOYEE_IDS = {
  // Company 1 — Indah Corp (3 employees)
  C1_SUPERVISOR: "01800040-0001-7000-8000-000000000001",
  C1_SUBORDINATE: "01800040-0002-7000-8000-000000000002",
  C1_STAFF: "01800040-0003-7000-8000-000000000003",
  // Company 2 — Mitra Global Solutions (2 employees)
  C2_MGR: "01800040-0004-7000-8000-000000000004",
  C2_ENG: "01800040-0005-7000-8000-000000000005",
  // Company 3 — Bintang Engineering (2 employees)
  C3_OPS_MGR: "01800040-0006-7000-8000-000000000006",
  C3_WORKER: "01800040-0007-7000-8000-000000000007",
} as const;

const seedData = [
  // ── Company 1: Premier Corporation ──
  // Employee 1: IT Manager — supervisor of Employee 2
  {
    id: EMPLOYEE_IDS.C1_SUPERVISOR,
    companyId: COMPANY_IDS.PREMIER_GROUP,
    departmentId: DEPT_IDS.C1_IT,
    positionId: POSITION_IDS.P1_IT_MGR,
    supervisorId: null,
    fingerId: "ENG001",
    firstName: "John",
    middleName: null,
    lastName: "Smith",
    email: "john.smith@premiercorp.com",
    phone: "021-5550001",
    mobile: "081234567801",
    birthDate: "1985-03-15",
    birthPlace: "London",
    gender: "M" as const,
    maritalStatus: "MARRIED" as const,
    employeeType: "STAFF" as const,
    employeeStatus: "PERMANENT" as const,
    remark: "IT Department Head",
    ...defaultColumns(),
  },
  // Employee 2: Developer — supervised by Employee 1
  {
    id: EMPLOYEE_IDS.C1_SUBORDINATE,
    companyId: COMPANY_IDS.PREMIER_GROUP,
    departmentId: DEPT_IDS.C1_IT,
    positionId: POSITION_IDS.P1_DEVELOPER,
    supervisorId: EMPLOYEE_IDS.C1_SUPERVISOR,
    fingerId: "ENG002",
    firstName: "Jane",
    middleName: null,
    lastName: "Doe",
    email: "jane.doe@premiercorp.com",
    phone: "021-5550002",
    mobile: "081234567802",
    birthDate: "1995-07-22",
    birthPlace: "Manchester",
    gender: "W" as const,
    maritalStatus: "SINGLE" as const,
    employeeType: "STAFF" as const,
    employeeStatus: "CONTRACT" as const,
    remark: "Junior Developer",
    ...defaultColumns(),
  },
  // Employee 3: Operator — Worker level
  {
    id: EMPLOYEE_IDS.C1_STAFF,
    companyId: COMPANY_IDS.PREMIER_GROUP,
    departmentId: DEPT_IDS.C1_OPERATIONS,
    positionId: POSITION_IDS.P1_OPS_OPERATOR,
    supervisorId: null,
    fingerId: "ENG003",
    firstName: "Bob",
    middleName: null,
    lastName: "Wilson",
    email: "bob.wilson@premiercorp.com",
    phone: "021-5550003",
    mobile: "081234567803",
    birthDate: "1998-11-02",
    birthPlace: "Birmingham",
    gender: "M" as const,
    maritalStatus: "SINGLE" as const,
    employeeType: "WORKER" as const,
    employeeStatus: "PERMANENT" as const,
    remark: "Production machine operator",
    ...defaultColumns(),
  },

  // ── Company 2: Summit Global Solutions ──
  // Employee 4: Engineering Manager
  {
    id: EMPLOYEE_IDS.C2_MGR,
    companyId: COMPANY_IDS.SUMMIT_SOLUTIONS,
    departmentId: DEPT_IDS.C2_ENGINEERING,
    positionId: POSITION_IDS.P2_ENG_MGR,
    supervisorId: null,
    fingerId: "ENG004",
    firstName: "Michael",
    middleName: null,
    lastName: "Tan",
    email: "michael.tan@summitglobal.com",
    phone: "021-5550004",
    mobile: "081234567804",
    birthDate: "1980-05-10",
    birthPlace: "Singapore",
    gender: "M" as const,
    maritalStatus: "MARRIED" as const,
    employeeType: "STAFF" as const,
    employeeStatus: "PERMANENT" as const,
    remark: "Engineering Department Head",
    ...defaultColumns(),
  },
  // Employee 5: Engineer
  {
    id: EMPLOYEE_IDS.C2_ENG,
    companyId: COMPANY_IDS.SUMMIT_SOLUTIONS,
    departmentId: DEPT_IDS.C2_ENGINEERING,
    positionId: POSITION_IDS.P2_ENGINEER,
    supervisorId: EMPLOYEE_IDS.C2_MGR,
    fingerId: "ENG005",
    firstName: "David",
    middleName: null,
    lastName: "Chen",
    email: "david.chen@summitglobal.com",
    phone: "021-5550005",
    mobile: "081234567805",
    birthDate: "1992-09-18",
    birthPlace: "Liverpool",
    gender: "M" as const,
    maritalStatus: "MARRIED" as const,
    employeeType: "STAFF" as const,
    employeeStatus: "CONTRACT" as const,
    remark: "Site Engineer",
    ...defaultColumns(),
  },

  // ── Company 3: Apex Engineering ──
  // Employee 6: Operations Manager
  {
    id: EMPLOYEE_IDS.C3_OPS_MGR,
    companyId: COMPANY_IDS.APEX_ENGINEERING,
    departmentId: DEPT_IDS.C3_OPERATIONS,
    positionId: POSITION_IDS.P3_OPS_MGR,
    supervisorId: null,
    fingerId: "ENG006",
    firstName: "James",
    middleName: null,
    lastName: "Brown",
    email: "james.brown@apexeng.com",
    phone: "021-5550006",
    mobile: "081234567806",
    birthDate: "1988-01-25",
    birthPlace: "Leeds",
    gender: "M" as const,
    maritalStatus: "DIVORCED" as const,
    employeeType: "STAFF" as const,
    employeeStatus: "PERMANENT" as const,
    remark: "Operations Department Head",
    ...defaultColumns(),
  },
  // Employee 7: Worker
  {
    id: EMPLOYEE_IDS.C3_WORKER,
    companyId: COMPANY_IDS.APEX_ENGINEERING,
    departmentId: DEPT_IDS.C3_OPERATIONS,
    positionId: POSITION_IDS.P3_WORKER,
    supervisorId: EMPLOYEE_IDS.C3_OPS_MGR,
    fingerId: "ENG007",
    firstName: "Tom",
    middleName: null,
    lastName: "Harris",
    email: "tom.harris@apexeng.com",
    phone: "021-5550007",
    mobile: "081234567807",
    birthDate: "1999-12-07",
    birthPlace: "Bristol",
    gender: "M" as const,
    maritalStatus: "SINGLE" as const,
    employeeType: "WORKER" as const,
    employeeStatus: "CONTRACT" as const,
    remark: "Daily worker",
    ...defaultColumns(),
  },
];

export async function seedEmployees(db: NodePgDatabase): Promise<void> {
  await db.transaction(async (tx) => {
    for (const row of seedData) await tx.insert(employees).values(row);
  });
}
