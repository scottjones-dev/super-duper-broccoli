import type { Context, Next } from "hono";

import * as HttpStatusCodes from "@/http/status-codes";
import * as HttpStatusPhrases from "@/http/status-phrases";
import type { AppBindings } from "@/types";

/**
 * Rejects the request if there is no authenticated user.
 * Must run after `sessionMiddleware`.
 */
export async function requireAuth(c: Context<AppBindings>, next: Next) {
    const user = c.get("user");

    if (!user) {
        return c.json(
            { message: HttpStatusPhrases.UNAUTHORIZED },
            HttpStatusCodes.UNAUTHORIZED,
        );
    }

    await next();
}

/**
 * Rejects the request if there is no authenticated user, or the user's
 * role (set by the better-auth `admin` plugin) is not "admin".
 * Must run after `sessionMiddleware`.
 */
export async function requireAdmin(c: Context<AppBindings>, next: Next) {
    const user = c.get("user");

    if (!user) {
        return c.json(
            { message: HttpStatusPhrases.UNAUTHORIZED },
            HttpStatusCodes.UNAUTHORIZED,
        );
    }

    if (user.role !== "admin") {
        return c.json(
            { message: HttpStatusPhrases.FORBIDDEN },
            HttpStatusCodes.FORBIDDEN,
        );
    }

    await next();
}