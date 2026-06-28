import { createDb } from "@deeliciousbakes/db";
import { SETTINGS_SINGLETON_ID } from "@deeliciousbakes/db/schema/settings";

export type EmailBranding = {
  companyName: string;
  logoUrl: string;
  logoAlt: string;
  logoWidth: number;
  logoHeight: number;
  emailFrom: string;
};

const FALLBACK: EmailBranding = {
  companyName: "Deelicious Bakes",
  logoUrl: "https://deeliciousbakes.com/logo.png",
  logoAlt: "Deelicious Bakes logo",
  logoWidth: 150,
  logoHeight: 50,
  emailFrom: "onboarding@resend.dev",
};

export async function getEmailBranding(): Promise<EmailBranding> {
  const db = createDb();

  const row = await db.query.settings.findFirst({
    where(fields, op) {
      return op.eq(fields.id, SETTINGS_SINGLETON_ID);
    },
  });

  if (!row) return FALLBACK;

  return {
    ...FALLBACK,
    companyName: row.companyName,
    emailFrom: row.emailFrom,
  };
}