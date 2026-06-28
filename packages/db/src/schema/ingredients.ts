// packages/db/src/schema/ingredients.ts
import { boolean, integer, pgTable, real, text } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { baseColumns } from "../helpers/base-columns";
import { auditColumns } from "../helpers/audit-columns";

export const ingredients = pgTable("ingredients", {
    ...baseColumns,
    ...auditColumns,
    name: text("name").notNull(),
    buyFrom: text("buy_from", {
        enum: ["sainsburys", "tesco", "bookers", "costco", "amazon", "other"],
    }).notNull(),
    buyQuantity: real("buy_quantity").notNull(),
    buyQuantityType: text("buy_quantity_type", {
        enum: ["count", "g", "kg", "ml", "l"],
    }).notNull(),
    buyPriceTotal: integer("buy_price_total").notNull(),
    isGluten: boolean("is_gluten").notNull().default(false),
    isDairy: boolean("is_dairy").notNull().default(false),
    isEggs: boolean("is_eggs").notNull().default(false),
    isNuts: boolean("is_nuts").notNull().default(false),
    isPeanuts: boolean("is_peanuts").notNull().default(false),
    isSoya: boolean("is_soya").notNull().default(false),
    isSesame: boolean("is_sesame").notNull().default(false),
    isSulphites: boolean("is_sulphites").notNull().default(false),
});

// -----------------------------------------------------------------------------
// Zod Schemas
// -----------------------------------------------------------------------------

export const selectIngredientsSchema = createSelectSchema(ingredients);

export const insertIngredientsSchema = createInsertSchema(ingredients, {
    name: field => field.min(1).max(255),
    buyQuantity: field => field.positive(),
    buyPriceTotal: field => field.int().positive(),
}).omit({
    id: true,
    createdAt: true,
    updatedAt: true,
    createdBy: true,
    updatedBy: true,
});

export const patchIngredientsSchema = insertIngredientsSchema.partial();

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

export type Ingredient = typeof ingredients.$inferSelect;
export type NewIngredient = typeof ingredients.$inferInsert;