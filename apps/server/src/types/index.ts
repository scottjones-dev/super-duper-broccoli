import type { OpenAPIHono, RouteConfig, RouteHandler } from "@hono/zod-openapi";
import type { Schema } from "hono";
import type { PinoLogger } from "hono-pino";
import type { z } from "@hono/zod-openapi";
import type { Session } from "@deeliciousbakes/auth";

export interface AppBindings {
  Variables: {
    logger: PinoLogger;
    user: Session["user"] | null;
    session: Session["session"] | null;
  };
}

// eslint-disable-next-line ts/ban-ts-comment
// @ts-expect-error
export type ZodSchema = z.ZodUnion | z.AnyZodObject | z.ZodArray<z.AnyZodObject>;
export type ZodIssue = z.core.$ZodIssue;

export type AppOpenAPI<S extends Schema = {}> = OpenAPIHono<AppBindings, S>;

export type AppRouteHandler<R extends RouteConfig> = RouteHandler<R, AppBindings>;