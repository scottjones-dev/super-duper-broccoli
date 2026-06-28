import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, Trash2, ArrowRight } from "lucide-react"
import { Button, buttonVariants } from "@deeliciousbakes/ui/components/button"
import { Input } from "@deeliciousbakes/ui/components/input"
import { Separator } from "@deeliciousbakes/ui/components/separator"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@deeliciousbakes/ui/components/card"
import { cartItems, formatPrice } from "@/lib/products"
import { cn } from "@deeliciousbakes/ui/lib/utils"

export default function CartPage() {
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price! * item.quantity,
    0
  )
  const delivery = 6
  const total = subtotal + delivery

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <div className="space-y-1">
        <p className="badge-caption">Your selection</p>
        <h1 className="font-heading text-4xl">Shopping Cart</h1>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1.6fr_1fr]">
        <div className="space-y-4">
          {cartItems.map((item) => (
            <Card key={item.id} className="border-border/60">
              <CardContent className="flex gap-4 py-4">
                <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-secondary/40">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="badge-caption">{item.category}</p>
                      <h3 className="font-heading text-base leading-tight">
                        {item.name}
                      </h3>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label={`Remove ${item.name}`}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="mt-auto flex items-center justify-between pt-3">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </Button>
                      <span className="w-6 text-center text-sm font-medium">
                        {item.quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        aria-label="Increase quantity"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                    <span className="font-heading text-base text-primary">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="h-fit border-border/60">
          <CardHeader>
            <CardTitle className="font-heading text-xl">
              Order Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input placeholder="Promo code" aria-label="Promo code" />
              <Button variant="outline">Apply</Button>
            </div>
            <Separator />
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Delivery</span>
                <span>{formatPrice(delivery)}</span>
              </div>
            </div>
            <Separator />
            <div className="flex justify-between font-heading text-lg">
              <span>Total</span>
              <span className="text-primary">{formatPrice(total)}</span>
            </div>
            <Link
              href="/checkout"
              className={cn(buttonVariants({ variant: "default", size: "lg" }), "w-full gap-2")}
            >

              Checkout
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link href="/store" className={cn(buttonVariants({ variant: "default", }), "w-full gap-2")}>
              Continue shopping
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
