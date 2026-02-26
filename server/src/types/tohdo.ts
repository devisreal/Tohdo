import { tohdos, tohdoUpdateSchema } from "@/db/schema";
import z from "zod";

export type Tohdo = typeof tohdos.$inferSelect;
export type NewTohdo = typeof tohdos.$inferInsert;
export type UpdateTohdo = z.infer<typeof tohdoUpdateSchema>;
