import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { createZodDto } from "nestjs-zod";

export const examples = sqliteTable("examples", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  content: text("content").notNull(),
  authorId: integer("author_id", { mode: "number" }).notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(() => new Date()).$onUpdate(() => new Date()),
});

export const SelectExamplesDto = createZodDto(createSelectSchema(examples));

const insertExamplesSchema = createInsertSchema(
  examples,
  {
    title: schema => schema.min(1).max(500).describe("The title of the example"),
  },
).required({
  title: true,
  content: true,
  authorId: true,
}).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export class InsertExamplesDto extends createZodDto(insertExamplesSchema) {}
