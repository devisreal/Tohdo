import { tohdos } from "@/db/schema";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import z from "zod";

export type Tohdo = typeof tohdos.$inferSelect;
export type NewTohdo = typeof tohdos.$inferInsert;

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
