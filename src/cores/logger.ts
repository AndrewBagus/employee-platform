import { LogLayer } from "loglayer";
import { PinoTransport } from "@loglayer/transport-pino";
import pino from "pino";
import { join } from "path";

const isDev = process.env.NODE_ENV !== "production";
const logLevel = process.env.LOG_LEVEL || "info";
const logDir = join(import.meta.dir, "../../logs");

const targets: pino.TransportTargetOptions[] = [
  // Always write to file
  { target: "pino/file", options: { destination: join(logDir, "app.log"), mkdir: true }, level: logLevel },
];

// Pretty console output in dev
if (isDev) {
  targets.push({
    target: "pino-pretty",
    options: { colorize: true },
    level: logLevel,
  });
} else {
  // JSON lines to stdout in production
  targets.push({ target: "pino/file", options: {}, level: logLevel });
}

const transport = pino.transport({ targets });
const pinoInstance = pino({ level: logLevel }, transport);

export const log = new LogLayer({
  transport: new PinoTransport({ logger: pinoInstance }),
});
