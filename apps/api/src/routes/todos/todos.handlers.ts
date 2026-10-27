import { AppRouteHandler } from "@/lib/types";
import {
  CreateRoute,
  GetOneRoute,
  ListRoute,
  PatchRoute,
  RemoveRoute,
  RestoreRoute,
} from "./todos.routes";
import { createDB } from "@/db";
import { getSession } from "@/lib/get-session";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import * as todosService from "@/services/todos.service";

export const create: AppRouteHandler<CreateRoute> = async (c) => {
  const db = createDB(c.env);
  const user = getSession(c).user;
  const input = c.req.valid("json");

  const newTodo = await todosService.create(db, user.id, input);

  return c.json(newTodo, StatusCodes.CREATED);
};

export const list: AppRouteHandler<ListRoute> = async (c) => {
  const db = createDB(c.env);
  const user = getSession(c).user;

  const todos = await todosService.list(db, user.id);

  return c.json(todos, StatusCodes.OK);
};

export const getOne: AppRouteHandler<GetOneRoute> = async (c) => {
  const db = createDB(c.env);
  const user = getSession(c).user;
  const { id } = c.req.valid("param");

  const todo = await todosService.getOne(db, user.id, id);

  if (!todo) {
    return c.json(
      {
        message: ReasonPhrases.NOT_FOUND,
      },
      StatusCodes.NOT_FOUND
    );
  }

  return c.json(todo, StatusCodes.OK);
};

export const patch: AppRouteHandler<PatchRoute> = async (c) => {
  const db = createDB(c.env);
  const user = getSession(c).user;
  const { id } = c.req.valid("param");
  const input = c.req.valid("json");

  const updatedTodo = await todosService.patch(db, user.id, id, input);

  if (!updatedTodo) {
    return c.json(
      {
        message: ReasonPhrases.NOT_FOUND,
      },
      StatusCodes.NOT_FOUND
    );
  }

  return c.json(updatedTodo, StatusCodes.OK);
};

export const remove: AppRouteHandler<RemoveRoute> = async (c) => {
  const db = createDB(c.env);
  const user = getSession(c).user;
  const { id } = c.req.valid("param");

  const deletedTodo = await todosService.remove(db, user.id, id);

  if (!deletedTodo) {
    return c.json(
      {
        message: ReasonPhrases.NOT_FOUND,
      },
      StatusCodes.NOT_FOUND
    );
  }

  return c.body(null, StatusCodes.NO_CONTENT);
};

export const restore: AppRouteHandler<RestoreRoute> = async (c) => {
  const db = createDB(c.env);
  const user = getSession(c).user;
  const { id } = c.req.valid("param");

  const restoredTodo = await todosService.restore(db, user.id, id);

  if (!restoredTodo) {
    return c.json(
      {
        message: ReasonPhrases.NOT_FOUND,
      },
      StatusCodes.NOT_FOUND
    );
  }

  return c.json(restoredTodo, StatusCodes.OK);
};
