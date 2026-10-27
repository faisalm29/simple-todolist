import { db } from "@/db";
import { todos } from "@/db/schema";
import { CreateTodo, UpdateTodo } from "@/validators/todos";
import { and, eq, isNotNull, isNull } from "drizzle-orm";

type DB = ReturnType<typeof db>;
const notDeleted = isNull(todos.deletedAt);
const deleted = isNotNull(todos.deletedAt);

export async function create(db: DB, userId: string, input: CreateTodo) {
  const [newTodo] = await db
    .insert(todos)
    .values({
      ...input,
      userId,
    })
    .returning();

  return newTodo;
}

export async function list(db: DB, userId: string) {
  return db.query.todos.findMany({
    where: {
      userId,
      deletedAt: { isNull: true },
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function getOne(db: DB, userId: string, todoId: string) {
  const result = await db.query.todos.findFirst({
    where: {
      userId,
      id: todoId,
      deletedAt: { isNull: true },
    },
  });

  return result ?? null;
}

export async function patch(
  db: DB,
  userId: string,
  todoId: string,
  input: UpdateTodo
) {
  if (Object.keys(input).length === 0) {
    return getOne(db, userId, todoId);
  }

  const [updated] = await db
    .update(todos)
    .set(input)
    .where(and(eq(todos.userId, userId), eq(todos.id, todoId), notDeleted))
    .returning();

  return updated ?? null;
}

export async function remove(db: DB, userId: string, todoId: string) {
  // Soft delete: mark the todo as archived by setting deletedAt
  const [removedTodo] = await db
    .update(todos)
    .set({
      deletedAt: new Date(),
    })
    .where(and(eq(todos.userId, userId), eq(todos.id, todoId), notDeleted))
    .returning({
      id: todos.id,
    });

  return removedTodo ?? null;
}

export async function restore(db: DB, userId: string, todoId: string) {
  const [restoredTodo] = await db
    .update(todos)
    .set({
      deletedAt: null,
    })
    .where(and(eq(todos.userId, userId), eq(todos.id, todoId), deleted))
    .returning();

  return restoredTodo ?? null;
}
