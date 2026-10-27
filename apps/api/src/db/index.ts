import { AppEnv } from "@/lib/types";
import { drizzle } from "drizzle-orm/d1";
import { relations } from "./relations";

export const db = (env: AppEnv["Bindings"]) => {
  return drizzle(env.DB, {
    relations,
  });
};

export const createDB = (env: AppEnv["Bindings"]) => {
  return drizzle(env.DB, {
    relations,
  });
};
