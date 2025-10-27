import * as t from "drizzle-orm/pg-core";
import { users } from "./users.schema";

export const tohdoGroups = t.pgTable(
  "groups",
  {
    id: t.integer("id").primaryKey().generatedAlwaysAsIdentity(),
    groupName: t.varchar("group_name", { length: 255 }).notNull(),
    userId: t
      .integer("user_id")
      .references(() => users.id)
      .notNull(),
  },
  (table) => [t.index("post_author_id_idx").on(table.userId)],
);
