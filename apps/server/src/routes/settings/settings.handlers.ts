import { eq } from "drizzle-orm";
import * as HttpStatusCodes from "@/http/status-codes";
import * as HttpStatusPhrases from "@/http/status-phrases";

import type { AppRouteHandler } from "@/types";

import { db } from "@deeliciousbakes/db";
import { settings } from "@deeliciousbakes/db/schema/settings";
import { ZOD_ERROR_CODES, ZOD_ERROR_MESSAGES } from "@/constants";

import type { CreateRoute, GetOneRoute, ListRoute, PatchRoute } from "./settings.routes";
import { recordAudit } from "@deeliciousbakes/db/helpers/record-audit";

const AUDIT_TABLE_NAME = "settings";

export const list: AppRouteHandler<ListRoute> = async (c) => {
  const settingsList = await db.query.settings.findMany();
  return c.json(settingsList, HttpStatusCodes.OK);
};

export const create: AppRouteHandler<CreateRoute> = async (c) => {
  const setting = c.req.valid("json");
  const [inserted] = await db.insert(settings).values(setting).returning();

  await recordAudit(db, {
    tableName: AUDIT_TABLE_NAME,
    recordId: inserted!.id,
    action: "create",
    userId: c.get("user")?.id ?? null,
    before: null,
    after: inserted as Record<string, unknown>,
  });

  return c.json(inserted, HttpStatusCodes.OK);
};

export const getOne: AppRouteHandler<GetOneRoute> = async (c) => {
  const { id } = c.req.valid("param");
  const setting = await db.query.settings.findFirst({
    where(fields, operators) {
      return operators.eq(fields.id, id);
    },
  });

  if (!setting) {
    return c.json(
      {
        message: HttpStatusPhrases.NOT_FOUND,
      },
      HttpStatusCodes.NOT_FOUND,
    );
  }

  return c.json(setting, HttpStatusCodes.OK);
};

export const patch: AppRouteHandler<PatchRoute> = async (c) => {
  const { id } = c.req.valid("param");
  const updates = c.req.valid("json");

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

  const before = await db.query.settings.findFirst({
    where(fields, operators) {
      return operators.eq(fields.id, id);
    },
  });

  const [setting] = await db.update(settings)
    .set(updates)
    .where(eq(settings.id, id))
    .returning();

  if (!setting) {
    return c.json(
      {
        message: HttpStatusPhrases.NOT_FOUND,
      },
      HttpStatusCodes.NOT_FOUND,
    );
  }

  await recordAudit(db, {
    tableName: AUDIT_TABLE_NAME,
    recordId: setting.id,
    action: "update",
    userId: c.get("user")?.id ?? null,
    before: (before ?? null) as Record<string, unknown> | null,
    after: setting as Record<string, unknown>,
  });

  return c.json(setting, HttpStatusCodes.OK);
};