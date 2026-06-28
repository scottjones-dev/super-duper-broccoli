import Image from "next/image"
import { Plus } from "lucide-react"
import { Button } from "@deeliciousbakes/ui/components/button"
import { Badge } from "@deeliciousbakes/ui/components/badge"
import { Card, CardContent } from "@deeliciousbakes/ui/components/card"
import { formatPrice, type Product } from "@/lib/products"

export function ProductCard({ product }: { product: Product }) {
  return (
    <Card className="group overflow-hidden border-border/60 pt-0 transition-shadow hover:shadow-lg">
      <div className="relative aspect-square overflow-hidden bg-secondary/40">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {product.badge ? (
          <Badge className="absolute top-3 left-3 bg-accent text-accent-foreground">
            {product.badge}
          </Badge>
        ) : null}
      </div>
      <CardContent className="space-y-2">
        <p className="badge-caption">{product.category}</p>
        <h3 className="font-heading text-lg leading-tight">{product.name}</h3>
        <p className="line-clamp-2 text-sm text-muted-foreground">
          {product.description}
        </p>
        <div className="flex items-center justify-between pt-2">
          <span className="font-heading text-lg text-primary">
            {formatPrice(product.price)}
          </span>
          <Button size="sm" className="gap-1">
            <Plus className="h-4 w-4" />
            Add
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
