import { createClient } from "@libsql/client";
import { Global, Module } from "@nestjs/common";
import { drizzle } from "drizzle-orm/libsql";

import env from "@/env";

import * as exampleTableSchema from "../examples/schema";
import { DATABASE_CONNECTION } from "./database-connection";

const client = createClient({
  url: env.DATABASE_URL,
  authToken: env.DATABASE_AUTH_TOKEN,
});

@Global()
@Module({
  providers: [
    {
      provide: DATABASE_CONNECTION,
      useValue: drizzle(client, {
        schema: {
          ...exampleTableSchema,
        },
      }),
    },
  ],
  exports: [DATABASE_CONNECTION],
})
export class DatabaseModule {}
