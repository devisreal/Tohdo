import { tohdos } from "@/db/schema";

export type Tohdo = typeof tohdos.$inferSelect;
export type NewTohdo = typeof tohdos.$inferInsert;
