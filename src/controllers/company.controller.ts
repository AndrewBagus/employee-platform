import { Hono } from "hono";
import { container } from "../cores/container";
import { TYPES } from "../cores/types";
import type { CompanyServiceInterface } from "../services/company/company.service.interface";

const companyController = new Hono();

const service = container.get<CompanyServiceInterface>(TYPES.CompanyServiceInterface);

companyController.get("/", async (c) => {
  const companies = await service.findAll();
  return c.json({
    success: true,
    data: companies,
    message: "Companies retrieved successfully",
  });
});

export default companyController;
