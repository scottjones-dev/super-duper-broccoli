import Image from "next/image"
import { Lock } from "lucide-react"
import { Button } from "@deeliciousbakes/ui/components/button"
import { Input } from "@deeliciousbakes/ui/components/input"
import { Label } from "@deeliciousbakes/ui/components/label"
import { Separator } from "@deeliciousbakes/ui/components/separator"
import {
  RadioGroup,
  RadioGroupItem,
} from "@deeliciousbakes/ui/components/radio-group"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@deeliciousbakes/ui/components/card"
import { cartItems, formatPrice } from "@/lib/products"

export default function CheckoutPage() {
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price! * item.quantity,
    0
  )
  const delivery = 6
  const total = subtotal + delivery

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <h1 className="font-heading text-3xl">Checkout</h1>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1.5fr_1fr]">
        <div className="space-y-6">
          <Card className="border-border/60">
            <CardHeader>
              <CardTitle className="font-heading text-lg">
                Contact information
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="you@email.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="first">First name</Label>
                <Input id="first" placeholder="Jane" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last">Last name</Label>
                <Input id="last" placeholder="Baker" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/60">
            <CardHeader>
              <CardTitle className="font-heading text-lg">
                Delivery method
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <RadioGroup defaultValue="delivery" className="grid gap-3">
                <Label
                  htmlFor="delivery"
                  className="flex cursor-pointer items-center justify-between rounded-xl border border-border/60 p-4 has-checked:border-primary"
                >
                  <span className="flex items-center gap-3">
                    <RadioGroupItem value="delivery" id="delivery" />
                    <span>
                      <span className="block text-sm font-medium">
                        Local delivery
                      </span>
                      <span className="block text-xs text-muted-foreground">
                        Within 15 miles
                      </span>
                    </span>
                  </span>
                  <span className="text-sm font-medium">{formatPrice(6)}</span>
                </Label>
                <Label
                  htmlFor="pickup"
                  className="flex cursor-pointer items-center justify-between rounded-xl border border-border/60 p-4 has-checked:border-primary"
                >
                  <span className="flex items-center gap-3">
                    <RadioGroupItem value="pickup" id="pickup" />
                    <span>
                      <span className="block text-sm font-medium">
                        Store pickup
                      </span>
                      <span className="block text-xs text-muted-foreground">
                        14 Honeywell Lane
                      </span>
                    </span>
                  </span>
                  <span className="text-sm font-medium">Free</span>
                </Label>
              </RadioGroup>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="address">Street address</Label>
                  <Input id="address" placeholder="22 Maple Court" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" placeholder="Riverside" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zip">ZIP code</Label>
                  <Input id="zip" placeholder="90210" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/60">
            <CardHeader>
              <CardTitle className="font-heading text-lg">Payment</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="card">Card number</Label>
                <Input id="card" placeholder="1234 5678 9012 3456" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="expiry">Expiry</Label>
                <Input id="expiry" placeholder="MM / YY" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvc">CVC</Label>
                <Input id="cvc" placeholder="123" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="h-fit border-border/60">
          <CardHeader>
            <CardTitle className="font-heading text-lg">
              Order summary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-secondary/40">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                    <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm leading-tight font-medium">
                      {item.name}
                    </p>
                  </div>
                  <span className="text-sm">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}
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
            <Button size="lg" className="w-full gap-2">
              <Lock className="h-4 w-4" />
              Pay {formatPrice(total)}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
