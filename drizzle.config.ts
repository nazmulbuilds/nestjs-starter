import { defineConfig } from "drizzle-kit";

import env from "@/env";

export default defineConfig({
  schema: "./src/**/schema.ts",
  out: "./src/database/migrations",
  dialect: env.NODE_ENV === "development" ? "sqlite" : "turso", // postgresql
  dbCredentials: {
    url: env.DATABASE_URL,
    authToken: env.DATABASE_AUTH_TOKEN,
  },
});
