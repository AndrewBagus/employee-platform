export interface CompanyResponseDto {
  id: string;
  countryId: string | null;
  name: string | null;
  nameShort: string | null;
  type: "GROUP" | "CLIENT" | "SUBCON" | null;
  haveWorkerEmployee: boolean | null;
  isLdap: boolean | null;
  stsActive: boolean | null;
  createdAt: Date;
  createdBy: string | null;
  updatedAt: Date | null;
  updatedBy: string | null;
  deletedAt: Date | null;
}

import { z } from "zod";

export const CreateCompanySchema = z.object({
  name: z.string().min(1, "Name is required"),
  type: z.enum(["GROUP", "CLIENT", "SUBCON"], { message: "Type must be GROUP, CLIENT, or SUBCON" }),
  countryId: z.string().min(1, "Country ID is required"),
  nameShort: z.string().optional(),
  haveWorkerEmployee: z.boolean().optional(),
  isLdap: z.boolean().optional(),
});

export type CreateCompanyDto = z.infer<typeof CreateCompanySchema>;

export const UpdateCompanySchema = z.object({
  name: z.string().min(1).optional(),
  nameShort: z.string().optional(),
  type: z.enum(["GROUP", "CLIENT", "SUBCON"]).optional(),
  countryId: z.string().min(1).optional(),
  haveWorkerEmployee: z.boolean().optional(),
  isLdap: z.boolean().optional(),
});

export type UpdateCompanyDto = z.infer<typeof UpdateCompanySchema>;
