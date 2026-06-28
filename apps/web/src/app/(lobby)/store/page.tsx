"use client"

import * as React from "react"
import { ProductCard } from "@/components/product-card"
import { Button } from "@deeliciousbakes/ui/components/button"
import { products, categories } from "@/lib/products"
import { cn } from "@deeliciousbakes/ui/lib/utils"

const filters = ["All", ...categories] as const

export default function StorePage() {
  const [active, setActive] = React.useState<(typeof filters)[number]>("All")

  const visible =
    active === "All"
      ? products
      : products.filter((product) => product.category === active)

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <div className="space-y-3 text-center">
        <p className="badge-caption">The Bakery</p>
        <h1 className="font-heading text-4xl">Our Collection</h1>
        <p className="mx-auto max-w-xl leading-relaxed text-pretty text-muted-foreground">
          Every cake is handcrafted to order using seasonal, locally sourced
          ingredients. Choose a category to explore.
        </p>
      </div>

      <div className="mt-10 flex flex-wrap justify-center gap-2">
        {filters.map((filter) => (
          <Button
            key={filter}
            variant={active === filter ? "default" : "outline"}
            size="sm"
            onClick={() => setActive(filter)}
            className={cn("rounded-full")}
          >
            {filter}
          </Button>
        ))}
      </div>

      <div className="mt-10 grid grid-cols-2 gap-5 lg:grid-cols-4">
        {visible.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
