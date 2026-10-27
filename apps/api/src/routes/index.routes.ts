import { createRoute } from "@hono/zod-openapi";
import { StatusCodes } from "http-status-codes";
import { jsonContent } from "@/lib/json-content";
import { createMessageObjectSchema } from "@/lib/create-message-object-schema";
import { createRouter } from "@/lib/create-router";

const tags = ["Index"];

const router = createRouter().openapi(
  createRoute({
    tags,
    method: "get",
    path: "/",
    responses: {
      [StatusCodes.OK as 200]: jsonContent(
        createMessageObjectSchema("Simple Todo List API"),
        "Simple Todo List API"
      ),
    },
  }),
  (c) => {
    return c.json(
      {
        message: "Simple Todo List API",
      },
      StatusCodes.OK
    );
  }
);

export default router;
