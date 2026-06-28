// packages/db/src/helpers/audit-columns.ts
import { text } from "drizzle-orm/pg-core";

import { user } from "../schema/auth";

export const auditColumns = {
  createdBy: text("created_by").references(() => user.id, {
    onDelete: "set null",
  }),
  updatedBy: text("updated_by").references(() => user.id, {
    onDelete: "set null",
  }),
};