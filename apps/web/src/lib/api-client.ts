import { env } from "@deeliciousbakes/env/web";
import DeeliciousAPI from "@deeliciousbakes/sdk";

export const client = new DeeliciousAPI({
  baseURL: `${env.NEXT_PUBLIC_SERVER_URL}/api`,
});

