import { createRoute, z } from "@hono/zod-openapi";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { jsonContent } from "@/lib/json-content";
import {
  createTodoSchema,
  todoSchema,
  updateTodoSchema,
} from "@/validators/todos";
import { jsonContentRequired } from "@/lib/json-content-required";
import { createErrorSchema } from "@/lib/create-error-schema";
import { createMessageObjectSchema } from "@/lib/create-message-object-schema";
import { todoParamsSchema } from "@/validators/params";

const tags = ["Todos"];

export const create = createRoute({
  tags,
  path: "/",
  method: "post",
  security: [{ Bearer: [] }],
  request: {
    body: jsonContentRequired(
      createTodoSchema,
      "Payload for creating a new todo."
    ),
  },
  responses: {
    [StatusCodes.CREATED as 201]: jsonContent(
      todoSchema,
      "The newly created todo."
    ),
    [StatusCodes.UNPROCESSABLE_ENTITY as 422]: jsonContent(
      createErrorSchema(createTodoSchema),
      "The validation error(s)."
    ),
    [StatusCodes.UNAUTHORIZED as 401]: jsonContent(
      createMessageObjectSchema(ReasonPhrases.UNAUTHORIZED),
      "The unauthorized error."
    ),
  },
});

export const list = createRoute({
  tags,
  path: "/",
  method: "get",
  security: [{ Bearer: [] }],
  responses: {
    [StatusCodes.OK as 200]: jsonContent(z.array(todoSchema), "List of todos."),
    [StatusCodes.UNAUTHORIZED as 401]: jsonContent(
      createMessageObjectSchema(ReasonPhrases.UNAUTHORIZED),
      "The unauthorized error."
    ),
  },
});

export const getOne = createRoute({
  tags,
  path: "/{id}",
  method: "get",
  security: [{ Bearer: [] }],
  request: {
    params: todoParamsSchema,
  },
  responses: {
    [StatusCodes.OK as 200]: jsonContent(todoSchema, "The returned todo."),
    [StatusCodes.NOT_FOUND as 404]: jsonContent(
      createMessageObjectSchema(ReasonPhrases.NOT_FOUND),
      "Not found error."
    ),
    [StatusCodes.UNPROCESSABLE_ENTITY as 422]: jsonContent(
      createErrorSchema(todoParamsSchema),
      "The validation error(s)."
    ),
    [StatusCodes.UNAUTHORIZED as 401]: jsonContent(
      createMessageObjectSchema(ReasonPhrases.UNAUTHORIZED),
      "The unauthorized error."
    ),
  },
});

export const patch = createRoute({
  tags,
  path: "/{id}",
  method: "patch",
  security: [{ Bearer: [] }],
  request: {
    params: todoParamsSchema,
    body: jsonContentRequired(
      updateTodoSchema,
      "Payload for updating the todo."
    ),
  },
  responses: {
    [StatusCodes.OK as 200]: jsonContent(todoSchema, "The updated todo."),
    [StatusCodes.NOT_FOUND as 404]: jsonContent(
      createMessageObjectSchema(ReasonPhrases.NOT_FOUND),
      "Not found error."
    ),
    [StatusCodes.UNPROCESSABLE_ENTITY as 422]: jsonContent(
      createErrorSchema(updateTodoSchema),
      "The validation error(s)."
    ),
    [StatusCodes.UNAUTHORIZED as 401]: jsonContent(
      createMessageObjectSchema(ReasonPhrases.UNAUTHORIZED),
      "The unauthorized error."
    ),
  },
});

export const remove = createRoute({
  tags,
  path: "/{id}",
  method: "delete",
  security: [{ Bearer: [] }],
  request: {
    params: todoParamsSchema,
  },
  responses: {
    [StatusCodes.NO_CONTENT as 204]: {
      description: "Todo deleted.",
    },
    [StatusCodes.NOT_FOUND as 404]: jsonContent(
      createMessageObjectSchema(ReasonPhrases.NOT_FOUND),
      "Not found error."
    ),
    [StatusCodes.UNPROCESSABLE_ENTITY as 422]: jsonContent(
      createErrorSchema(todoParamsSchema),
      "The validation error(s)."
    ),
    [StatusCodes.UNAUTHORIZED as 401]: jsonContent(
      createMessageObjectSchema(ReasonPhrases.UNAUTHORIZED),
      "The unauthorized error."
    ),
  },
});

export const restore = createRoute({
  tags,
  path: "/{id}/restore",
  method: "post",
  security: [{ Bearer: [] }],
  request: {
    params: todoParamsSchema,
  },
  responses: {
    [StatusCodes.OK as 200]: jsonContent(
      todoSchema,
      "The restored application"
    ),
    [StatusCodes.NOT_FOUND as 404]: jsonContent(
      createMessageObjectSchema(ReasonPhrases.NOT_FOUND),
      "Not found error"
    ),
    [StatusCodes.UNPROCESSABLE_ENTITY as 422]: jsonContent(
      createErrorSchema(todoParamsSchema),
      "The validation error(s)"
    ),
    [StatusCodes.UNAUTHORIZED as 401]: jsonContent(
      createMessageObjectSchema(ReasonPhrases.UNAUTHORIZED),
      "The unauthorized error"
    ),
  },
});

export type CreateRoute = typeof create;
export type ListRoute = typeof list;
export type GetOneRoute = typeof getOne;
export type PatchRoute = typeof patch;
export type RemoveRoute = typeof remove;
export type RestoreRoute = typeof restore;
