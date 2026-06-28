import type { ReactElement } from "react";
import { Resend } from "resend";
import { env } from "@deeliciousbakes/env/server";
import { renderEmail } from "./router";
import { getEmailBranding, type EmailBranding } from "./settings";
import type { NotificationPayloads, NotificationType } from "./types";

const resend = new Resend(env.RESEND_API_KEY);

type BrandingFields =
  | "companyName"
  | "logoUrl"
  | "logoAlt"
  | "logoWidth"
  | "logoHeight";

// A genuine discriminated union — not a generic index — so `type` narrows
// branch by branch inside the switch below, with zero casts required.
type NotifyInput = {
  [K in NotificationType]: {
    type: K;
    to: string | string[];
    subject: string;
    payload: Omit<NotificationPayloads[K], BrandingFields>;
    from?: string;
  };
}[NotificationType];

async function deliver(
  to: string | string[],
  subject: string,
  from: string | undefined,
  branding: EmailBranding,
  react: ReactElement
) {
  /**
   * IMPORTANT:
   * Resend expects:
   * "Acme <onboarding@resend.dev>"
   */
  const fromAddress = from ?? `${branding.companyName} <${branding.emailFrom}>`;

  const { data, error } = await resend.emails.send({
    from: fromAddress,
    to,
    subject,
    react,
  });

  if (error) {
    throw new Error(`Email send failed: ${error.message}`);
  }

  return data;
}

export async function notify(input: NotifyInput) {
  const branding = await getEmailBranding();

  switch (input.type) {
    case "auth.magic_link":
      return deliver(
        input.to, input.subject, input.from, branding,
        renderEmail(input.type, { ...input.payload, ...branding })
      );
    case "auth.verification":
      return deliver(
        input.to, input.subject, input.from, branding,
        renderEmail(input.type, { ...input.payload, ...branding })
      );
    case "auth.password_reset":
      return deliver(
        input.to, input.subject, input.from, branding,
        renderEmail(input.type, { ...input.payload, ...branding })
      );
    case "auth.password_changed":
      return deliver(
        input.to, input.subject, input.from, branding,
        renderEmail(input.type, { ...input.payload, ...branding })
      );
    case "ecommerce.order_confirmation":
      return deliver(
        input.to, input.subject, input.from, branding,
        renderEmail(input.type, { ...input.payload, ...branding })
      );
    case "ecommerce.receipt":
      return deliver(
        input.to, input.subject, input.from, branding,
        renderEmail(input.type, { ...input.payload, ...branding })
      );
    case "ecommerce.shipping_update":
      return deliver(
        input.to, input.subject, input.from, branding,
        renderEmail(input.type, { ...input.payload, ...branding })
      );
    case "system.welcome":
      return deliver(
        input.to, input.subject, input.from, branding,
        renderEmail(input.type, { ...input.payload, ...branding })
      );
  }
}