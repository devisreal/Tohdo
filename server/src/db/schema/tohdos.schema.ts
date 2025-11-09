import * as t from "drizzle-orm/pg-core";
import { users } from "./users.schema";
import { tohdoGroups } from "./groups.schema";
import { timestamps } from "./columns.helpers";
import { createSelectSchema } from "drizzle-zod";
import { createInsertSchema } from "drizzle-zod";
import z from "zod";

export const tohdos = t.pgTable(
  "tohdos",
  {
    id: t.integer("id").primaryKey().generatedAlwaysAsIdentity(),
    userId: t
      .integer("user_id")
      .references(() => users.id)
      .notNull(),
    groupId: t.integer("group_id").references(() => tohdoGroups.id),
    title: t.varchar("title", { length: 255 }).notNull(),
    completed: t.boolean("completed").default(false).notNull(),
    ...timestamps,
  },
  (table) => [
    t.index("user_id_idx").on(table.userId),
    t.index("group_id_idx").on(table.groupId),
    t.index("tohdo_title_idx").on(table.title),
  ],
);

export const tohdoSelectSchema = createSelectSchema(tohdos);
export const tohdoInsertSchema = createInsertSchema(tohdos, {
  title: z
    .string("Title must be a string")
    .trim()
    .min(1, { message: "Title cannot be empty" })
    .min(3, { message: "Title must be at least 3 characters long" }),

  completed: z.boolean("Completed must be true or false").default(false),

  groupId: z
    .number("Group ID must be a number")
    .int({ message: "Group ID must be an integer" })
    .positive({ message: "Group ID must be a positive number" }).optional,

  created_at: z
    .date("Invalid date format for created_at")
    .default(() => new Date()),
});
