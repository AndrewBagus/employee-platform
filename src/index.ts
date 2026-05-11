import { Hono } from "hono";
import { DateTime } from "luxon";

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

export default app;
