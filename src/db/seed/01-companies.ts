import type { NodePgDatabase } from "drizzle-orm/node-postgres";
import { companies } from "../schema/companies";
import { defaultColumns } from "./utils";
import { COUNTRY_IDS } from "./00-root-master";

export const COMPANY_IDS = {
  PREMIER_GROUP: "01800010-0001-7000-8000-000000000001",
  SUMMIT_SOLUTIONS: "01800010-0002-7000-8000-000000000002",
  APEX_ENGINEERING: "01800010-0003-7000-8000-000000000003",
} as const;

const seedData = [
  {
    id: COMPANY_IDS.PREMIER_GROUP,
    countryId: COUNTRY_IDS.INDONESIA,
    name: "Premier Corporation",
    nameShort: "Premier",
    type: "GROUP" as const,
    haveWorkerEmployee: true,
    isLdap: false,
    ...defaultColumns(),
  },
  {
    id: COMPANY_IDS.SUMMIT_SOLUTIONS,
    countryId: COUNTRY_IDS.SINGAPORE,
    name: "Summit Global Solutions",
    nameShort: "Summit",
    type: "CLIENT" as const,
    haveWorkerEmployee: false,
    isLdap: false,
    ...defaultColumns(),
  },
  {
    id: COMPANY_IDS.APEX_ENGINEERING,
    countryId: COUNTRY_IDS.INDONESIA,
    name: "Apex Engineering",
    nameShort: "Apex",
    type: "SUBCON" as const,
    haveWorkerEmployee: true,
    isLdap: false,
    ...defaultColumns(),
  },
];

export async function seedCompanies(db: NodePgDatabase): Promise<void> {
  await db.transaction(async (tx) => {
    for (const row of seedData) {
      await tx.insert(companies).values(row);
    }
  });
}
