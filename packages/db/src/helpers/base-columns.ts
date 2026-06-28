// packages/db/src/helpers/base-columns.ts
import { createId } from "@paralleldrive/cuid2";
import { text, timestamp } from "drizzle-orm/pg-core";

export const baseColumns = {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),

  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),

  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
};