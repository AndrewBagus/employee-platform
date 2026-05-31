import "reflect-metadata";
import { Hono } from "hono";
import { DateTime } from "luxon";
import { registerCompanyRoutes } from "./modules/companies/company.routes";

const app = new Hono();

app.get("/health", (c) => {
  return c.json({
    status: "oke",
    timestamp: DateTime.now().setZone("Asia/Jakarta").toISO(),
    service: "employee-service",
  });
});

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

// Register domain routes
registerCompanyRoutes(app);

export default app;
