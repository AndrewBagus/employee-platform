import { LogLayer } from "loglayer";
import { PinoTransport } from "@loglayer/transport-pino";
import pino from "pino";

const isDev = process.env.NODE_ENV !== "production";

const pinoInstance = pino({
  level: process.env.LOG_LEVEL || "info",
  ...(isDev ? { transport: { target: "pino-pretty", options: { colorize: true } } } : {}),
});

export const log = new LogLayer({
  transport: new PinoTransport({ logger: pinoInstance }),
});
