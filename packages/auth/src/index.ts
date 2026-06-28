import { createDb } from "@deeliciousbakes/db";
import * as schema from "@deeliciousbakes/db/schema/auth";
import { env } from "@deeliciousbakes/env/server";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { admin } from "better-auth/plugins/admin";
import { sendPasswordChangedEmailViaResend, sendPasswordResetEmailViaResend, sendVerificationEmailViaResend } from "./emails";

export function createAuth() {
  const db = createDb();

  return betterAuth({
    appName: "deeliciousbakes",
    database: drizzleAdapter(db, {
      provider: "pg",
      schema: schema,
    }),
    trustedOrigins: [env.CORS_ORIGIN],
    emailVerification: {
      sendVerificationEmail: async ({ user, url }) => {
        void sendVerificationEmailViaResend(user.email, user.name, url);

      },
      sendOnSignUp: true,
      autoSignInAfterVerification: true,
    },
    emailAndPassword: {
      enabled: true,
      requireEmailVerification: true,

      sendResetPassword: async ({ user, url, }) => {
        void sendPasswordResetEmailViaResend(user.email, user.name, url);
      },
      onPasswordReset: async ({ user },) => {
        void sendPasswordChangedEmailViaResend(user.email, user.name);
      },
    },
    secret: env.BETTER_AUTH_SECRET,
    baseURL: env.BETTER_AUTH_URL,
    advanced: {
      defaultCookieAttributes: {
        sameSite: env.NODE_ENV === "production" ? "none" : "lax",
        secure: env.NODE_ENV === "production",
        httpOnly: true,
      },
    },
    plugins: [
      admin()
    ],
  });
}

export const auth = createAuth();

export type Session = typeof auth.$Infer.Session;
