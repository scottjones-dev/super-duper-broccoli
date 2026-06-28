import { createRoute, z } from "@hono/zod-openapi";
import * as HttpStatusCodes from "@/http/status-codes";
import { jsonContent, jsonContentRequired } from "@/openapi/helpers";
import { createErrorSchema, IdParamsSchema } from "@/openapi/schemas";

import { insertSettingsSchema, patchSettingsSchema, selectSettingsSchema } from "@deeliciousbakes/db/schema/settings";
import { notFoundSchema } from "@/constants";

const tags = ["Settings"];

export const list = createRoute({
  path: "/settings",
  operationId: "listSettings",
  method: "get",
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.array(selectSettingsSchema),
      "The list of settings",
    ),
  },
});

export const create = createRoute({
  path: "/settings",
  operationId: "createSetting",
  method: "post",
  request: {
    body: jsonContentRequired(
      insertSettingsSchema,
      "The setting to create",
    ),
  },
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      selectSettingsSchema,
      "The created setting",
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(insertSettingsSchema),
      "The validation error(s)",
    ),
  },
});

export const getOne = createRoute({
  path: "/settings/{id}",
  operationId: "getSetting",
  method: "get",
  request: {
    params: IdParamsSchema,
  },
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      selectSettingsSchema,
      "The requested setting",
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      notFoundSchema,
      "Setting not found",
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(IdParamsSchema),
      "Invalid id error",
    ),
  },
});

export const patch = createRoute({
  path: "/settings/{id}",
  operationId: "patchSetting",
  method: "patch",
  request: {
    params: IdParamsSchema,
    body: jsonContentRequired(
      patchSettingsSchema,
      "The setting updates",
    ),
  },
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      selectSettingsSchema,
      "The updated setting",
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      notFoundSchema,
      "Setting not found",
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(patchSettingsSchema)
        .or(createErrorSchema(IdParamsSchema)),
      "The validation error(s)",
    ),
  },
});

export const remove = createRoute({
  path: "/settings/{id}",
  operationId: "removeSetting",
  method: "delete",
  request: {
    params: IdParamsSchema,
  },
  tags,
  responses: {
    [HttpStatusCodes.NO_CONTENT]: {
      description: "Setting deleted",
    },
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      notFoundSchema,
      "Setting not found",
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
export type PatchRoute = typeof patch;
export type RemoveRoute = typeof remove;
