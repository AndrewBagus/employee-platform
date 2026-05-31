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
