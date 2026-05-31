import "reflect-metadata";
import { Hono } from "hono";
import { DateTime } from "luxon";
import { log } from "@cores/logger";
import companyController from "./controllers/company.controller";
import countryController from "./controllers/country.controller";
import religionController from "./controllers/religion.controller";
import gradeController from "./controllers/grade.controller";
import costCenterController from "./controllers/costCenter.controller";
import projectController from "./controllers/project.controller";

const app = new Hono();

// Request logging
app.use("*", async (c, next) => {
  const start = performance.now();
  await next();
  const ms = (performance.now() - start).toFixed(2);
  log.info(`${c.req.method} ${c.req.path} → ${c.res.status} (${ms}ms)`);
});

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
app.route("/companies", companyController);
app.route("/countries", countryController);
app.route("/religions", religionController);
app.route("/grades", gradeController);
app.route("/cost-centers", costCenterController);
app.route("/projects", projectController);

export default app;
