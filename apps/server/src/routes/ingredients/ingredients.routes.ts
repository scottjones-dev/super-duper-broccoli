import { createRoute, z } from "@hono/zod-openapi";
import * as HttpStatusCodes from "@/http/status-codes";
import { jsonContent, jsonContentRequired } from "@/openapi/helpers";
import { createErrorSchema, IdParamsSchema } from "@/openapi/schemas";

import { insertIngredientsSchema, selectIngredientsSchema, patchIngredientsSchema } from "@deeliciousbakes/db/schema/ingredients";
import { selectAuditLogSchema } from "@deeliciousbakes/db/schema/audit-log";
import { notFoundSchema, internalServerErrorSchema } from "@/constants";

const tags = ["Ingredients"];

export const list = createRoute({
    path: "/ingredients",
    operationId: "listIngredients",
    method: "get",
    tags,
    responses: {
        [HttpStatusCodes.OK]: jsonContent(
            z.array(selectIngredientsSchema),
            "The list of ingredients",
        ),
    },
});

export const create = createRoute({
    path: "/ingredients",
    operationId: "createIngredient",
    method: "post",
    request: {
        body: jsonContentRequired(
            insertIngredientsSchema,
            "The ingredient to create",
        ),
    },
    tags,
    responses: {
        [HttpStatusCodes.OK]: jsonContent(
            selectIngredientsSchema,
            "The created ingredient",
        ),
        [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
            createErrorSchema(insertIngredientsSchema),
            "The validation error(s)",
        ),
        [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
            internalServerErrorSchema,
            "Failed to create ingredient",
        ),
    },
});

export const getOne = createRoute({
    path: "/ingredients/{id}",
    operationId: "getIngredient",
    method: "get",
    request: {
        params: IdParamsSchema,
    },
    tags,
    responses: {
        [HttpStatusCodes.OK]: jsonContent(
            selectIngredientsSchema,
            "The requested ingredient",
        ),
        [HttpStatusCodes.NOT_FOUND]: jsonContent(
            notFoundSchema,
            "Ingredient not found",
        ),
        [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
            createErrorSchema(IdParamsSchema),
            "Invalid id error",
        ),
    },
});

export const patch = createRoute({
    path: "/ingredients/{id}",
    operationId: "patchIngredient",
    method: "patch",
    request: {
        params: IdParamsSchema,
        body: jsonContentRequired(
            patchIngredientsSchema,
            "The ingredient updates",
        ),
    },
    tags,
    responses: {
        [HttpStatusCodes.OK]: jsonContent(
            selectIngredientsSchema,
            "The updated ingredient",
        ),
        [HttpStatusCodes.NOT_FOUND]: jsonContent(
            notFoundSchema,
            "Ingredient not found",
        ),
        [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
            createErrorSchema(patchIngredientsSchema)
                .or(createErrorSchema(IdParamsSchema)),
            "The validation error(s)",
        ),
        [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
            internalServerErrorSchema,
            "Failed to update ingredient",
        ),
    },
});

export const remove = createRoute({
    path: "/ingredients/{id}",
    operationId: "deleteIngredient",
    method: "delete",
    request: {
        params: IdParamsSchema,
    },
    tags,
    responses: {
        [HttpStatusCodes.NO_CONTENT]: {
            description: "Ingredient deleted",
        },
        [HttpStatusCodes.NOT_FOUND]: jsonContent(
            notFoundSchema,
            "Ingredient not found",
        ),
        [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
            createErrorSchema(IdParamsSchema),
            "Invalid id error",
        ),
    },
});

export const auditLog = createRoute({
    path: "/ingredients/{id}/audit-log",
    operationId: "getIngredientAuditLog",
    method: "get",
    description: "Get the audit log history for a single ingredient",
    request: {
        params: IdParamsSchema,
    },
    tags,
    responses: {
        [HttpStatusCodes.OK]: jsonContent(
            z.array(selectAuditLogSchema),
            "Audit log entries for this ingredient",
        ),
        [HttpStatusCodes.NOT_FOUND]: jsonContent(
            notFoundSchema,
            "Ingredient not found",
        ),
    },
});

export type ListRoute = typeof list;
export type CreateRoute = typeof create;
export type GetOneRoute = typeof getOne;
export type PatchRoute = typeof patch;
export type RemoveRoute = typeof remove;
export type AuditLogRoute = typeof auditLog;