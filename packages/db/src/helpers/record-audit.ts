import type { NodePgDatabase } from "drizzle-orm/node-postgres";
import type * as schema from "../schema";
import { auditLogs } from "../schema/audit-log";

type DB = NodePgDatabase<typeof schema>;

type AuditJson = Record<string, unknown> | null;

type RecordAuditInput = {
    tableName: string;
    recordId: string;
    action: "create" | "update" | "delete";
    userId: string | null;
    before?: AuditJson;
    after?: AuditJson;
};

export async function recordAudit(
    db: DB,
    input: RecordAuditInput,
) {
    await db.insert(auditLogs).values({
        tableName: input.tableName,
        recordId: input.recordId,
        action: input.action,
        userId: input.userId,
        before: input.before ?? null,
        after: input.after ?? null,
    });
}