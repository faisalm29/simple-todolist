import { createRouter } from "@/lib/create-router";
import * as todoRoutes from "./todos.routes";
import * as todoHandlers from "./todos.handlers";

const router = createRouter()
  .openapi(todoRoutes.create, todoHandlers.create)
  .openapi(todoRoutes.list, todoHandlers.list)
  .openapi(todoRoutes.getOne, todoHandlers.getOne)
  .openapi(todoRoutes.patch, todoHandlers.patch)
  .openapi(todoRoutes.remove, todoHandlers.remove)
  .openapi(todoRoutes.restore, todoHandlers.restore);

export default router;
