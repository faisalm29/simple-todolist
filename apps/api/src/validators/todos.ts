import { todos } from "@/db/schema";
import { z } from "@hono/zod-openapi";
import { createInsertSchema, createSelectSchema } from "drizzle-orm/zod";

export const todoSchema = createSelectSchema(todos, {
  id: z.uuid(),
});
export const createTodoSchema = createInsertSchema(todos, {
  title: (s) => s.trim().min(1).max(200),
  description: (s) =>
    s
      .trim()
      .max(2000)
      .transform((v) => (v === "" ? null : v))
      .nullable()
      .optional(),
  dueDate: z.iso.date().nullable().optional(),
  priority: (s) => s.min(1).max(3).optional(),
}).omit({
  id: true,
  userId: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
});
export const updateTodoSchema = createTodoSchema
  .partial()
  .refine((body) => Object.keys(body).length > 0, {
    error: "At least one field must be provided",
  });

export type Todos = z.infer<typeof todoSchema>;
export type CreateTodo = z.infer<typeof createTodoSchema>;
export type UpdateTodo = z.infer<typeof updateTodoSchema>;
