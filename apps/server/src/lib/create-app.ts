import type { Schema } from "hono";

import { OpenAPIHono } from "@hono/zod-openapi";
import { requestId } from "hono/request-id";
import { defaultHook } from "@/openapi";
import type { AppBindings, AppOpenAPI } from "@/types";
import { corsMiddleware, notFound, onError, serveEmojiFavicon } from "@/middleware";
import { logger } from "hono/logger";

export function createRouter() {
  return new OpenAPIHono<AppBindings>({
    strict: false,
    defaultHook,
  });
}

export default function createApp() {
  const app = createRouter();
  app.use(corsMiddleware())
    .use(requestId())
    .use(serveEmojiFavicon("📝"))
    .use(logger());

  app.notFound(notFound);
  app.onError(onError);
  return app;
}

export function createTestApp<S extends Schema>(router: AppOpenAPI<S>) {
  return createApp().route("/", router);
}
