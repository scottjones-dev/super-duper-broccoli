import type { WelcomeEmailProps } from "@/templates/welcome";
import type { OrderItem } from "../templates/ecommerce/order-confirmation";
import type { InvoiceItem } from "../templates/ecommerce/receipt";

export type NotificationType =
  | "auth.magic_link"
  | "auth.verification"
  | "auth.password_reset"
  | "auth.password_changed"
  | "ecommerce.order_confirmation"
  | "ecommerce.receipt"
  | "ecommerce.shipping_update"
  | "system.welcome";

/**
 * STRICT CONTRACT:
 * Every template prop must be represented here exactly.
 */
export type NotificationPayloads = {
  /* ---------------- AUTH ---------------- */

  "auth.magic_link": {
    userName: string;
    loginUrl: string;
    logoUrl: string;
    logoAlt: string;
    logoWidth?: number;
    logoHeight?: number;
    companyName: string;
    previewText: string;
  };

  "auth.verification": {
    userName: string;
    verifyUrl: string;
    logoUrl: string;
    logoAlt: string;
    logoWidth?: number;
    logoHeight?: number;
    companyName: string;
    previewText: string;
  };

  "auth.password_reset": {
    userName: string;
    resetUrl: string;
    logoUrl: string;
    logoAlt: string;
    logoWidth?: number;
    logoHeight?: number;
    companyName: string;
    previewText: string;
  };

  "auth.password_changed": {
    userName: string;
    logoUrl: string;
    logoAlt: string;
    logoWidth?: number;
    logoHeight?: number;
    companyName: string;
    previewText: string;
  };

  /* ---------------- ECOMMERCE ---------------- */

  "ecommerce.order_confirmation": {
    userName: string;
    orderId: string;
    orderDate: string;
    items: OrderItem[];
    totalPrice: string;
    viewOrderUrl: string;
    logoUrl: string;
    logoAlt: string;
    logoWidth?: number;
    logoHeight?: number;
    companyName: string;
    previewText: string;
  };

  "ecommerce.receipt": {
    userName: string;
    receiptId: string;
    date: string;
    items: InvoiceItem[];
    totalPrice: string;
    paymentMethod: string;
    logoUrl: string;
    logoAlt: string;
    logoWidth?: number;
    logoHeight?: number;
    companyName: string;
    previewText: string;
  };

  "ecommerce.shipping_update": {
    userName: string;
    orderId: string;
    carrier: string;
    trackingNumber: string;
    trackingUrl: string;
    estimatedDelivery: string;
    logoUrl: string;
    logoAlt: string;
    logoWidth?: number;
    logoHeight?: number;
    companyName: string;
    previewText: string;
  };

  /* ---------------- SYSTEM ---------------- */

  "system.welcome": WelcomeEmailProps;
};