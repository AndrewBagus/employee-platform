import "reflect-metadata";
import { Hono } from "hono";
import { DateTime } from "luxon";
import companyController from "./controllers/company.controller";

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
app.route("/companies", companyController);

export default app;
