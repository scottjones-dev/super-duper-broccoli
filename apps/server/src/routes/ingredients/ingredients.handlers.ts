import { desc, eq } from "drizzle-orm";
import * as HttpStatusCodes from "@/http/status-codes";
import * as HttpStatusPhrases from "@/http/status-phrases";

import type { AppRouteHandler } from "@/types";

import { db } from "@deeliciousbakes/db";
import { ingredients } from "@deeliciousbakes/db/schema/ingredients";
import { auditLogs } from "@deeliciousbakes/db/schema/audit-log";
import { ZOD_ERROR_CODES, ZOD_ERROR_MESSAGES } from "@/constants";

import type { AuditLogRoute, CreateRoute, GetOneRoute, ListRoute, PatchRoute, RemoveRoute, } from "./ingredients.routes";
import { recordAudit } from "@deeliciousbakes/db/helpers/record-audit";

// lowercase, matches what the audit-log query filters on below.
const AUDIT_TABLE_NAME = "ingredients";

export const list: AppRouteHandler<ListRoute> = async (c) => {
    const ingredientsList = await db.query.ingredients.findMany();
    return c.json(ingredientsList, HttpStatusCodes.OK);
};

export const create: AppRouteHandler<CreateRoute> = async (c) => {
    const ingredient = c.req.valid("json");
    // Safe: this route runs behind requireAdmin, which guarantees a user.
    const user = c.get("user")!;

    const [inserted] = await db
        .insert(ingredients)
        .values({
            ...ingredient,
            createdBy: user.id,
            updatedBy: user.id,
        })
        .returning();

    if (!inserted) {
        return c.json(
            { message: HttpStatusPhrases.INTERNAL_SERVER_ERROR },
            HttpStatusCodes.INTERNAL_SERVER_ERROR,
        );
    }

    await recordAudit(db, {
        tableName: AUDIT_TABLE_NAME,
        recordId: inserted.id,
        action: "create",
        userId: user.id,
        before: null,
        after: inserted as Record<string, unknown>,
    });

    return c.json(inserted, HttpStatusCodes.OK);
};

export const getOne: AppRouteHandler<GetOneRoute> = async (c) => {
    const { id } = c.req.valid("param");
    const ingredient = await db.query.ingredients.findFirst({
        where(fields, operators) {
            return operators.eq(fields.id, id);
        },
    });

    if (!ingredient) {
        return c.json(
            { message: HttpStatusPhrases.NOT_FOUND },
            HttpStatusCodes.NOT_FOUND,
        );
    }

    return c.json(ingredient, HttpStatusCodes.OK);
};

export const patch: AppRouteHandler<PatchRoute> = async (c) => {
    const { id } = c.req.valid("param");
    const updates = c.req.valid("json");
    // Safe: this route runs behind requireAdmin, which guarantees a user.
    const user = c.get("user")!;

    if (Object.keys(updates).length === 0) {
        return c.json(
            {
                success: false,
                error: {
                    issues: [
                        {
                            code: ZOD_ERROR_CODES.INVALID_UPDATES,
                            path: [],
                            message: ZOD_ERROR_MESSAGES.NO_UPDATES,
                        },
                    ],
                    name: "ZodError",
                },
            },
            HttpStatusCodes.UNPROCESSABLE_ENTITY,
        );
    }

    const before = await db.query.ingredients.findFirst({
        where(fields, operators) {
            return operators.eq(fields.id, id);
        },
    });

    if (!before) {
        return c.json(
            { message: HttpStatusPhrases.NOT_FOUND },
            HttpStatusCodes.NOT_FOUND,
        );
    }

    const [ingredient] = await db.update(ingredients)
        .set({
            ...updates,
            updatedBy: user.id,
        })
        .where(eq(ingredients.id, id))
        .returning();

    if (!ingredient) {
        return c.json(
            { message: HttpStatusPhrases.NOT_FOUND },
            HttpStatusCodes.NOT_FOUND,
        );
    }

    await recordAudit(db, {
        tableName: AUDIT_TABLE_NAME,
        recordId: ingredient.id,
        action: "update",
        userId: user.id,
        before: before as Record<string, unknown>,
        after: ingredient as Record<string, unknown>,
    });

    return c.json(ingredient, HttpStatusCodes.OK);
};

export const remove: AppRouteHandler<RemoveRoute> = async (c) => {
    const { id } = c.req.valid("param");
    // Safe: this route runs behind requireAdmin, which guarantees a user.
    const user = c.get("user")!;

    // Capture the row before it's gone — this is the only chance to record
    // what existed, since after DELETE there's nothing left to read.
    const existing = await db.query.ingredients.findFirst({
        where(fields, operators) {
            return operators.eq(fields.id, id);
        },
    });

    if (!existing) {
        return c.json(
            { message: HttpStatusPhrases.NOT_FOUND },
            HttpStatusCodes.NOT_FOUND,
        );
    }

    const result = await db.delete(ingredients)
        .where(eq(ingredients.id, id));

    if (result.rowCount === 0) {
        return c.json(
            { message: HttpStatusPhrases.NOT_FOUND },
            HttpStatusCodes.NOT_FOUND,
        );
    }

    await recordAudit(db, {
        tableName: AUDIT_TABLE_NAME,
        recordId: id,
        action: "delete",
        userId: user.id,
        before: existing as Record<string, unknown>,
        after: null,
    });

    return c.body(null, HttpStatusCodes.NO_CONTENT);
};

export const auditLogHistory: AppRouteHandler<AuditLogRoute> = async (c) => {
    const { id } = c.req.valid("param");

    // Deliberately does NOT check whether the ingredient currently exists —
    // history must remain viewable for ingredients that have since been
    // deleted (remove() audits a "delete" entry, but the row itself is gone).
    // We 404 only when there is no audit history at all for this id, which
    // covers both "id never existed" and "no input validation match".
    const history = await db.query.auditLogs.findMany({
        where(fields, operators) {
            return operators.and(
                operators.eq(fields.tableName, AUDIT_TABLE_NAME),
                operators.eq(fields.recordId, id),
            );
        },
        orderBy: [desc(auditLogs.createdAt)],
    });

    if (history.length === 0) {
        return c.json(
            { message: HttpStatusPhrases.NOT_FOUND },
            HttpStatusCodes.NOT_FOUND,
        );
    }

    return c.json(history, HttpStatusCodes.OK);
};