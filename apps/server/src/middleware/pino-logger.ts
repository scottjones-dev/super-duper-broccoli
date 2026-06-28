import { env } from "@deeliciousbakes/env/server";
import { pinoLogger as logger } from "hono-pino";
import pino from "pino";
import pretty from "pino-pretty";

export default function pinoLogger() {
  return logger({ pino: pino({ level: env.LOG_LEVEL || "info", }, env.NODE_ENV === "production" ? undefined : pretty()), });
}
