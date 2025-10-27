import * as t from "drizzle-orm/pg-core";
import { users } from "./users.schema";
import { tohdoGroups } from "./groups.schema";
import { timestamps } from "./columns.helpers";

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
