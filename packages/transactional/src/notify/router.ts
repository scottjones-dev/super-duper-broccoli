import type { ReactElement } from "react";
import type { NotificationType, NotificationPayloads } from "./types";

import { VerificationEmail } from "../templates/auth/verification-email";
import { PasswordResetEmail } from "../templates/auth/password-reset-email";
import { PasswordChangedEmail } from "../templates/auth/password-changed-email";
import { MagicLinkEmail } from "../templates/auth/magic-link-email";

import { OrderConfirmation } from "../templates/ecommerce/order-confirmation";
import { Receipt } from "../templates/ecommerce/receipt";
import { ShippingUpdate } from "../templates/ecommerce/shipping-update";

import { WelcomeEmail } from "../templates/welcome";

/**
 * IMPORTANT:
 * Each function is explicitly bound to its payload type.
 * This preserves type correlation at call time.
 */
const emailRenderers = {
  "auth.magic_link": (p: NotificationPayloads["auth.magic_link"]) =>
    MagicLinkEmail(p),

  "auth.verification": (p: NotificationPayloads["auth.verification"]) =>
    VerificationEmail(p),

  "auth.password_reset": (p: NotificationPayloads["auth.password_reset"]) =>
    PasswordResetEmail(p),

  "auth.password_changed": (p: NotificationPayloads["auth.password_changed"]) =>
    PasswordChangedEmail(p),

  "ecommerce.order_confirmation": (p: NotificationPayloads["ecommerce.order_confirmation"]) =>
    OrderConfirmation(p),

  "ecommerce.receipt": (p: NotificationPayloads["ecommerce.receipt"]) =>
    Receipt(p),

  "ecommerce.shipping_update": (p: NotificationPayloads["ecommerce.shipping_update"]) =>
    ShippingUpdate(p),

  "system.welcome": (p: NotificationPayloads["system.welcome"]) =>
    WelcomeEmail(p),
} satisfies {
  [K in NotificationType]: (payload: NotificationPayloads[K]) => ReactElement;
};

export function renderEmail<T extends NotificationType>(
  type: T,
  payload: NotificationPayloads[T]
): ReactElement {
  const renderer = emailRenderers[type] as (
    payload: NotificationPayloads[T]
  ) => ReactElement;
  return renderer(payload);
}