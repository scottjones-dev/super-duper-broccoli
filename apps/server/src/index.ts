import { serve } from "@hono/node-server";
import { env } from "@deeliciousbakes/env/server";
import app from "./app";

const port = env.PORT;

console.log(`
  Website is running on ${env.CORS_ORIGIN}
  Server is running on http://localhost:${port}
  Server Apis Docs on http://localhost:${port}/reference  
`);

serve({ fetch: app.fetch, port });
