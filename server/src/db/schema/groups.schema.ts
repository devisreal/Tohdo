import * as t from "drizzle-orm/pg-core";
import { users } from "./users.schema";
import z from "zod";
import { createSelectSchema } from "drizzle-zod";
import { createInsertSchema } from "drizzle-zod";
import { timestamps } from "./columns.helpers";

export const tohdoGroups = t.pgTable(
  "groups",
  {
    id: t.integer("id").primaryKey().generatedAlwaysAsIdentity(),
    groupName: t.varchar("group_name", { length: 255 }).notNull(),
    userId: t
      .integer("user_id")
      .references(() => users.id)
      .notNull(),
    ...timestamps,
  },
  (table) => [t.index("post_author_id_idx").on(table.userId)],
);

export const groupSelectSchema = createSelectSchema(tohdoGroups);
export const groupInsertSchema = createInsertSchema(tohdoGroups, {
  groupName: z
    .string("Group name must be a string")
    .trim()
    .min(1, { message: "Group name cannot be empty" })
    .min(3, { message: "Group name must be at least 3 characters long" }),

  userId: z
    .number("User ID must be a number")
    .int({ message: "User ID must be an integer" })
    .positive({ message: "User ID must be a positive number" }).optional,

  created_at: z
    .date("Invalid date format for created_at")
    .default(() => new Date()),
});
