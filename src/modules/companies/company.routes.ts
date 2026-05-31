import type { Hono } from "hono";
import { container } from "../../di/container";
import { CompanyController } from "./company.controller";

export function registerCompanyRoutes(app: Hono): void {
  const controller = container.get(CompanyController);

  app.get("/companies", controller.findAll());
}
