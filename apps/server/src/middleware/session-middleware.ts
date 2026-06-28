import type { Context, Next } from "hono";

import { auth } from "@deeliciousbakes/auth";

import type { AppBindings } from "@/types";

export async function sessionMiddleware(
    c: Context<AppBindings>,
    next: Next,
) {
    const result = await auth.api.getSession({
        headers: c.req.raw.headers,
    });

    c.set("user", result?.user ?? null);
    c.set("session", result?.session ?? null);

    await next();
}