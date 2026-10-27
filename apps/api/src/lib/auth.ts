import { createDB, db } from "@/db";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import * as schema from "@/db/schema";
import { bearer, openAPI } from "better-auth/plugins";
import { AppEnv } from "./types";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    schema,
    provider: "sqlite",
    usePlural: true,
  }),
  emailAndPassword: {
    enabled: true,
  },
  trustedOrigins: ["http://localhost:5173"],
  plugins: [bearer(), openAPI()],
});

export const createAuth = (env: AppEnv["Bindings"]) => {
  return betterAuth({
    database: drizzleAdapter(createDB(env), {
      schema,
      provider: "sqlite",
      usePlural: true,
    }),
    emailAndPassword: {
      enabled: true,
    },
    trustedOrigins: ["http://localhost:5173"],
    plugins: [bearer(), openAPI()],
  });
};
