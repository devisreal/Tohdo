import { tohdoGroups } from "@/db/schema";

export type TohdoGroup = typeof tohdoGroups.$inferSelect;
export type NewTohdoGroup = typeof tohdoGroups.$inferInsert;
