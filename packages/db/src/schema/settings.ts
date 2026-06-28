// packages/db/src/tables/settings.ts
import { pgTable, text } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { baseColumns } from "../helpers/base-columns";
import { auditColumns } from "../helpers/audit-columns";

export const SETTINGS_SINGLETON_ID = "default";

export const settings = pgTable("settings", {
    ...baseColumns,
    id: text("id").primaryKey().$default(() => SETTINGS_SINGLETON_ID), // Singleton override (ensures deterministic single row)
    companyName: text("company_name").notNull().default("Deelicious Bakes"),
    emailFrom: text("email_from").notNull(),
    ...auditColumns,
});

// ----------------------------
// Zod Schemas
// ----------------------------

export const selectSettingsSchema = createSelectSchema(settings);
export const insertSettingsSchema = createInsertSchema(settings);
export const patchSettingsSchema = insertSettingsSchema.partial();