import "reflect-metadata";
import { Hono } from "hono";
import { DateTime } from "luxon";
import { log } from "@cores/logger";
import companyController from "./controllers/company.controller";

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

export default app;
