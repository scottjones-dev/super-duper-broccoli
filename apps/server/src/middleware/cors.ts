import { cors } from "hono/cors";
import { env } from "@deeliciousbakes/env/server";

export function corsMiddleware() {
    const isProd = env.NODE_ENV === "production";

    const origin = isProd
        ? env.CORS_ORIGIN.split(",").map((o) => o.trim())
        : ["http://localhost:3000", "http://localhost:9000"];

    return cors({
        origin,
        allowHeaders: [
            "Content-Type",
            "Authorization",
            "X-Request-Id",

            // Scalar/OpenAPI dev client headers
            "x-scalar-lang",
            "x-scalar-runtime-version",
            "x-scalar-os",
        ],
        allowMethods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
        credentials: true,
    });
}