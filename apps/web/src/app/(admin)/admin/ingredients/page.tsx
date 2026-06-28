"use client"

import { useEffect, useState } from "react"
import { client } from "@/lib/api-client"
import { authClient } from "@/lib/auth-client"
import type {
  IngredientListResponse,
  IngredientCreateParams,
  IngredientPatchParams,
} from "@deeliciousbakes/sdk/resources/ingredients"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@deeliciousbakes/ui/components/card"
import { Badge } from "@deeliciousbakes/ui/components/badge"
import { Button } from "@deeliciousbakes/ui/components/button"
import { Input } from "@deeliciousbakes/ui/components/input"
import { Label } from "@deeliciousbakes/ui/components/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@deeliciousbakes/ui/components/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@deeliciousbakes/ui/components/dialog"
import { Checkbox } from "@deeliciousbakes/ui/components/checkbox"
import { PackagePlus, Pencil, Trash2, Loader2 } from "lucide-react"

// ─── Types ───────────────────────────────────────────────────────────────────

type Ingredient = IngredientListResponse[number]

type BuyFrom = IngredientCreateParams["buyFrom"]
type BuyQuantityType = IngredientCreateParams["buyQuantityType"]

const BUY_FROM_OPTIONS: { value: BuyFrom; label: string }[] = [
  { value: "sainsburys", label: "Sainsbury's" },
  { value: "tesco", label: "Tesco" },
  { value: "bookers", label: "Bookers" },
  { value: "costco", label: "Costco" },
  { value: "amazon", label: "Amazon" },
  { value: "other", label: "Other" },
]

const QUANTITY_TYPE_OPTIONS: { value: BuyQuantityType; label: string }[] = [
  { value: "count", label: "Count" },
  { value: "g", label: "Grams (g)" },
  { value: "kg", label: "Kilograms (kg)" },
  { value: "ml", label: "Millilitres (ml)" },
  { value: "l", label: "Litres (l)" },
]

const ALLERGENS: { key: keyof IngredientCreateParams; label: string }[] = [
  { key: "isGluten", label: "Gluten" },
  { key: "isDairy", label: "Dairy" },
  { key: "isEggs", label: "Eggs" },
  { key: "isNuts", label: "Nuts" },
  { key: "isPeanuts", label: "Peanuts" },
  { key: "isSoya", label: "Soya" },
  { key: "isSesame", label: "Sesame" },
  { key: "isSulphites", label: "Sulphites" },
]

const BUY_FROM_LABEL: Record<BuyFrom, string> = {
  sainsburys: "Sainsbury's",
  tesco: "Tesco",
  bookers: "Bookers",
  costco: "Costco",
  amazon: "Amazon",
  other: "Other",
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** buyPriceTotal is stored in pence as an integer */
function formatPrice(pence: number) {
  return `£${(pence / 100).toFixed(2)}`
}

function allergenBadges(ingredient: Ingredient) {
  return ALLERGENS.filter(({ key }) => ingredient[key as keyof Ingredient]).map(
    ({ label }) => label,
  )
}

const EMPTY_FORM: IngredientCreateParams = {
  name: "",
  buyFrom: "sainsburys",
  buyQuantity: 0,
  buyQuantityType: "g",
  buyPriceTotal: 0,
  isGluten: false,
  isDairy: false,
  isEggs: false,
  isNuts: false,
  isPeanuts: false,
  isSoya: false,
  isSesame: false,
  isSulphites: false,
}

// ─── Ingredient Form ──────────────────────────────────────────────────────────

interface IngredientFormProps {
  initial: IngredientCreateParams
  onSubmit: (values: IngredientCreateParams) => Promise<void>
  onCancel: () => void
  submitLabel: string
  isLoading: boolean
}

function IngredientForm({ initial, onSubmit, onCancel, submitLabel, isLoading, }: IngredientFormProps) {

  const [values, setValues] = useState<IngredientCreateParams>(initial)

  function set<K extends keyof IngredientCreateParams>(key: K, value: IngredientCreateParams[K],) { setValues((prev) => ({ ...prev, [key]: value })) }

  async function handleSubmit() {
    await onSubmit(values)
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Name */}
      <div className="grid gap-1.5">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          value={values.name}
          onChange={(e) => set("name", e.target.value)}
          placeholder="e.g. Unsalted Butter"
        />
      </div>

      {/* Buy from + Quantity type */}
      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-1.5">
          <Label>Buy from</Label>
          <Select
            value={values.buyFrom}
            onValueChange={(v) => set("buyFrom", v as BuyFrom)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {BUY_FROM_OPTIONS.map((o) => (
                <SelectItem key={o.value} value={o.value}>
                  {o.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-1.5">
          <Label>Unit</Label>
          <Select
            value={values.buyQuantityType}
            onValueChange={(v) => set("buyQuantityType", v as BuyQuantityType)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {QUANTITY_TYPE_OPTIONS.map((o) => (
                <SelectItem key={o.value} value={o.value}>
                  {o.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Quantity + Price */}
      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-1.5">
          <Label htmlFor="buyQuantity">Quantity</Label>
          <Input
            id="buyQuantity"
            type="number"
            min={0}
            value={values.buyQuantity}
            onChange={(e) => set("buyQuantity", Number(e.target.value))}
          />
        </div>

        <div className="grid gap-1.5">
          <Label htmlFor="buyPriceTotal">Total price (pence)</Label>
          <Input
            id="buyPriceTotal"
            type="number"
            min={0}
            value={values.buyPriceTotal}
            onChange={(e) => set("buyPriceTotal", Number(e.target.value))}
            placeholder="e.g. 150 = £1.50"
          />
        </div>
      </div>

      {/* Allergens */}
      <div className="grid gap-2">
        <Label>Allergens</Label>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {ALLERGENS.map(({ key, label }) => (
            <div key={key} className="flex items-center gap-2">
              <Checkbox
                id={key}
                checked={!!values[key as keyof IngredientCreateParams]}
                onCheckedChange={(checked) =>
                  set(
                    key as keyof IngredientCreateParams,
                    !!checked as IngredientCreateParams[typeof key],
                  )
                }
              />
              <Label htmlFor={key} className="cursor-pointer font-normal">
                {label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <DialogFooter>
        <Button variant="outline" onClick={onCancel} disabled={isLoading}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} disabled={isLoading || !values.name.trim()}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {submitLabel}
        </Button>
      </DialogFooter>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AdminIngredientsPage() {
  const { data: session, isPending: sessionPending } = authClient.useSession()

  const [ingredients, setIngredients] = useState<Ingredient[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Dialog state
  const [createOpen, setCreateOpen] = useState(false)
  const [editTarget, setEditTarget] = useState<Ingredient | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<Ingredient | null>(null)
  const [isMutating, setIsMutating] = useState(false)

  // ── Data fetching ──────────────────────────────────────────────────────────

  async function fetchIngredients() {
    setIsLoading(true)
    setError(null)
    try {
      const data = await client.ingredients.list()
      setIngredients(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load ingredients")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (session) fetchIngredients()
  }, [session])

  // ── Mutations ──────────────────────────────────────────────────────────────

  async function handleCreate(values: IngredientCreateParams) {
    setIsMutating(true)
    try {
      const created = await client.ingredients.create(values)
      setIngredients((prev) => [...prev, created])
      setCreateOpen(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create ingredient")
    } finally {
      setIsMutating(false)
    }
  }

  async function handleEdit(values: IngredientCreateParams) {
    if (!editTarget) return
    setIsMutating(true)
    try {
      const patch: IngredientPatchParams = values
      const updated = await client.ingredients.patch(editTarget.id, patch)
      setIngredients((prev) =>
        prev.map((i) => (i.id === updated.id ? updated : i)),
      )
      setEditTarget(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update ingredient")
    } finally {
      setIsMutating(false)
    }
  }

  async function handleDelete() {
    if (!deleteTarget) return
    setIsMutating(true)
    try {
      await client.ingredients.delete(deleteTarget.id)
      setIngredients((prev) => prev.filter((i) => i.id !== deleteTarget.id))
      setDeleteTarget(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete ingredient")
    } finally {
      setIsMutating(false)
    }
  }

  // ── Auth guards ────────────────────────────────────────────────────────────

  if (sessionPending) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-lg font-medium text-muted-foreground">Loading...</p>
      </div>
    )
  }

  if (!session) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-lg font-medium text-muted-foreground">
          You must be logged in to access this page.
        </p>
      </div>
    )
  }

  if (!session.user.role || session.user.role !== "admin") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-lg font-medium text-muted-foreground">
          You do not have permission to access this page.
        </p>
      </div>
    )
  }

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <main className="flex flex-1 flex-col gap-6 p-4 md:p-6">
      {/* Header row */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-serif text-2xl font-semibold">Ingredients</h2>
          <p className="text-sm text-muted-foreground">
            Manage your bakery ingredients and allergen information.
          </p>
        </div>
        <Button onClick={() => setCreateOpen(true)}>
          <PackagePlus className="mr-2 h-4 w-4" />
          Add ingredient
        </Button>
      </div>

      {/* Error banner */}
      {error && (
        <div className="rounded-md border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle className="font-serif">All ingredients</CardTitle>
          <CardDescription>
            {ingredients.length} ingredient{ingredients.length !== 1 ? "s" : ""}{" "}
            in stock
          </CardDescription>
        </CardHeader>

        <CardContent className="px-0">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : ingredients.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-2 py-12 text-center">
              <PackagePlus className="h-8 w-8 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                No ingredients yet. Add your first one!
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left text-muted-foreground">
                    <th className="px-6 py-3 font-medium">Name</th>
                    <th className="px-6 py-3 font-medium">Buy from</th>
                    <th className="px-6 py-3 font-medium">Quantity</th>
                    <th className="px-6 py-3 font-medium">Price</th>
                    <th className="px-6 py-3 font-medium">Allergens</th>
                    <th className="px-6 py-3 font-medium" />
                  </tr>
                </thead>
                <tbody>
                  {ingredients.map((ingredient) => {
                    const badges = allergenBadges(ingredient)
                    return (
                      <tr
                        key={ingredient.id}
                        className="border-b transition-colors last:border-0 hover:bg-muted/40"
                      >
                        <td className="px-6 py-4 font-medium">
                          {ingredient.name}
                        </td>
                        <td className="px-6 py-4 text-muted-foreground">
                          {BUY_FROM_LABEL[ingredient.buyFrom]}
                        </td>
                        <td className="px-6 py-4 text-muted-foreground">
                          {ingredient.buyQuantity} {ingredient.buyQuantityType}
                        </td>
                        <td className="px-6 py-4 text-muted-foreground">
                          {formatPrice(ingredient.buyPriceTotal)}
                        </td>
                        <td className="px-6 py-4">
                          {badges.length === 0 ? (
                            <span className="text-muted-foreground">None</span>
                          ) : (
                            <div className="flex flex-wrap gap-1">
                              {badges.map((b) => (
                                <Badge key={b} variant="secondary">
                                  {b}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => setEditTarget(ingredient)}
                              aria-label={`Edit ${ingredient.name}`}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="text-destructive hover:text-destructive"
                              onClick={() => setDeleteTarget(ingredient)}
                              aria-label={`Delete ${ingredient.name}`}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* ── Create dialog ── */}
      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-serif">Add ingredient</DialogTitle>
            <DialogDescription>
              Fill in the details for the new ingredient.
            </DialogDescription>
          </DialogHeader>
          <IngredientForm
            initial={EMPTY_FORM}
            onSubmit={handleCreate}
            onCancel={() => setCreateOpen(false)}
            submitLabel="Add ingredient"
            isLoading={isMutating}
          />
        </DialogContent>
      </Dialog>

      {/* ── Edit dialog ── */}
      <Dialog open={!!editTarget} onOpenChange={() => setEditTarget(null)}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-serif">Edit ingredient</DialogTitle>
            <DialogDescription>
              Update the details for{" "}
              <span className="font-medium">{editTarget?.name}</span>.
            </DialogDescription>
          </DialogHeader>
          {editTarget && (
            <IngredientForm
              initial={{
                name: editTarget.name,
                buyFrom: editTarget.buyFrom,
                buyQuantity: editTarget.buyQuantity,
                buyQuantityType: editTarget.buyQuantityType,
                buyPriceTotal: editTarget.buyPriceTotal,
                isGluten: editTarget.isGluten,
                isDairy: editTarget.isDairy,
                isEggs: editTarget.isEggs,
                isNuts: editTarget.isNuts,
                isPeanuts: editTarget.isPeanuts,
                isSoya: editTarget.isSoya,
                isSesame: editTarget.isSesame,
                isSulphites: editTarget.isSulphites,
              }}
              onSubmit={handleEdit}
              onCancel={() => setEditTarget(null)}
              submitLabel="Save changes"
              isLoading={isMutating}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* ── Delete confirmation dialog ── */}
      <Dialog open={!!deleteTarget} onOpenChange={() => setDeleteTarget(null)}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle className="font-serif">Delete ingredient</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete{" "}
              <span className="font-medium">{deleteTarget?.name}</span>? This
              cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteTarget(null)}
              disabled={isMutating}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isMutating}
            >
              {isMutating && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  )
}