import * as t from "drizzle-orm/pg-core";
import { timestamps } from "./columns.helpers";

export const users = t.pgTable(
  "users",
  {
    id: t.integer("id").primaryKey().generatedAlwaysAsIdentity(),
    username: t.varchar("username", { length: 255 }).notNull().unique(),
    firstname: t.varchar("firstname", { length: 255 }),
    lastname: t.varchar("lastname", { length: 255 }),
    email: t.varchar("email", { length: 255 }).notNull().unique(),
    password: t.varchar("password", { length: 255 }).notNull(),
    ...timestamps,
  },
  (table) => [
    t.uniqueIndex("user_username_idx").on(table.username),
    t.uniqueIndex("user_email_idx").on(table.email),
    t.index("user_created_at_idx").on(table.created_at),
  ],
);
