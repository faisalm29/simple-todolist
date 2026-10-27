import { z } from "@hono/zod-openapi";

export const todoParamsSchema = z.object({
  id: z.uuid(),
});

export type TodoParams = z.infer<typeof todoParamsSchema>;
