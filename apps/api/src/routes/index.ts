import { AppOpenAPI } from "@/lib/types";
import index from "./index.routes";
import todos from "./todos/todos.index";
import { createRouter } from "@/lib/create-router";

export const registerRoutes = (app: AppOpenAPI) => {
  return app.route("/", index).route("/todos", todos);
};

export const router = registerRoutes(createRouter().basePath("/"));
export type Router = typeof router;
