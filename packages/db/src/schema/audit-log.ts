import { index, jsonb, pgTable, text } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { baseColumns } from "../helpers/base-columns";
import { user } from "./auth";

export const auditLogs = pgTable(
    "audit_log",
    {
        id: baseColumns.id,
        createdAt: baseColumns.createdAt,

        tableName: text("table_name").notNull(),

        recordId: text("record_id").notNull(),

        action: text("action", {
            enum: ["create", "update", "delete"],
        }).notNull(),

        userId: text("user_id").references(() => user.id, {
            onDelete: "set null",
        }),

        before: jsonb("before").$type<Record<string, unknown> | null>(),

        after: jsonb("after").$type<Record<string, unknown> | null>(),
    },
    (table) => [
        index("audit_log_table_idx").on(table.tableName),
        index("audit_log_record_idx").on(table.recordId),
        index("audit_log_user_idx").on(table.userId),
    ]
);

// -----------------------------------------------------------------------------
// Zod Schemas
// -----------------------------------------------------------------------------

export const selectAuditLogSchema = createSelectSchema(auditLogs);

export const insertAuditLogSchema = createInsertSchema(auditLogs, {
    before: z.record(z.string(), z.unknown()).nullable().optional(),
    after: z.record(z.string(), z.unknown()).nullable().optional(),
}).omit({
    id: true,
    createdAt: true,
});

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

export type AuditLog = typeof auditLogs.$inferSelect;
export type NewAuditLog = typeof auditLogs.$inferInsert;

export type SelectAuditLog = z.infer<typeof selectAuditLogSchema>;
export type InsertAuditLog = z.infer<typeof insertAuditLogSchema>;