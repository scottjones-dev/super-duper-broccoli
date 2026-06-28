import * as HttpStatusCodes from "@/http/status-codes";
import * as HttpStatusPhrases from "@/http/status-phrases";

import type { AppRouteHandler } from "@/types";

import { auditLogs } from "@deeliciousbakes/db/schema/audit-log";

import type { CreateRoute, GetOneRoute, ListRoute, } from "./audit-log.routes";
import { db } from "@deeliciousbakes/db";


export const list: AppRouteHandler<ListRoute> = async (c) => {
  const auditLogs = await db.query.auditLogs.findMany();
  return c.json(auditLogs);
};

export const create: AppRouteHandler<CreateRoute> = async (c) => {
  const auditLog = c.req.valid("json");
  const [inserted] = await db.insert(auditLogs).values(auditLog).returning();
  return c.json(inserted, HttpStatusCodes.OK);
};

export const getOne: AppRouteHandler<GetOneRoute> = async (c) => {
  const { id } = c.req.valid("param");
  const auditLog = await db.query.auditLogs.findFirst({
    where(fields, operators) {
      return operators.eq(fields.id, id);
    },
  });

  if (!auditLog) {
    return c.json(
      {
        message: HttpStatusPhrases.NOT_FOUND,
      },
      HttpStatusCodes.NOT_FOUND,
    );
  }

  return c.json(auditLog, HttpStatusCodes.OK);
};