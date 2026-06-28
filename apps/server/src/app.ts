import configureOpenAPI from "@/lib/configure-open-api";
import createApp from "@/lib/create-app";
import Home from "@/routes/index.route";
import { auth } from "@deeliciousbakes/auth";
import auditLogRouter from "@/routes/audit-log/audit-logs.index";
import settingsRouter from "@/routes/settings/settings.index";
import ingredientsRouter from "@/routes/ingredients/ingredients.index";

const app = createApp();

configureOpenAPI(app);

app.on(["POST", "GET", "OPTIONS"], "/api/auth/**", (c) => auth.handler(c.req.raw));

const routes = [Home, auditLogRouter, settingsRouter, ingredientsRouter] as const;
routes.forEach((route) => { app.route("/api", route); });

export type AppType = typeof routes[number];

export default app;