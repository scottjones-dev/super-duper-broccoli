import { createRoute, z } from "@hono/zod-openapi";
import * as HttpStatusCodes from "@/http/status-codes";
import { jsonContent, jsonContentRequired } from "@/openapi/helpers";
import { createErrorSchema, IdParamsSchema } from "@/openapi/schemas";
import { insertAuditLogSchema, selectAuditLogSchema } from "@deeliciousbakes/db/schema/audit-log";
import { notFoundSchema } from "@/constants";

const tags = ["Audit Logs"];

export const list = createRoute({
  path: "/audit-logs",
  operationId: "listAuditLogs",
  method: "get",
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.array(selectAuditLogSchema),
      "The list of audit logs",
    ),
  },
});

export const create = createRoute({
  path: "/audit-logs",
  operationId: "createAuditLog",
  method: "post",
  request: {
    body: jsonContentRequired(
      insertAuditLogSchema,
      "The audit log to create",
    ),
  },
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      selectAuditLogSchema,
      "The created audit log",
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(insertAuditLogSchema),
      "The validation error(s)",
    ),
  },
});

export const getOne = createRoute({
  path: "/audit-logs/{id}",
  operationId: "getAuditLog",
  method: "get",
  request: {
    params: IdParamsSchema,
  },
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      selectAuditLogSchema,
      "The requested audit log",
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      notFoundSchema,
      "Audit log not found",
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(IdParamsSchema),
      "Invalid id error",
    ),
  },
});

export type ListRoute = typeof list;
export type CreateRoute = typeof create;
export type GetOneRoute = typeof getOne;
