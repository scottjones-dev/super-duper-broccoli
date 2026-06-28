import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"
import { Button, buttonVariants } from "@deeliciousbakes/ui/components/button"
import { Input } from "@deeliciousbakes/ui/components/input"
import { Badge } from "@deeliciousbakes/ui/components/badge"
import { ProductCard } from "@/components/product-card"
import { products } from "@/lib/products"
import { cn } from "@deeliciousbakes/ui/lib/utils"

export default function HomePage() {

  const featured = products.slice(0, 4)

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
          <div className="space-y-6">
            <Badge
              variant="secondary"
              className="gap-1.5 rounded-full px-3 py-1"
            >
              <Sparkles className="h-3.5 w-3.5 text-accent" />
              <span className="badge-caption">Opening Soon</span>
            </Badge>
            <div className="space-y-3">
              <p className="signature-text text-5xl sm:text-6xl">
                Deelicious Bakes
              </p>
              <h1 className="font-heading text-4xl leading-tight text-balance sm:text-5xl">
                Artisanal cakes, baked fresh and made to celebrate.
              </h1>
            </div>
            <p className="max-w-md leading-relaxed text-pretty text-muted-foreground">
              Our online bakery is almost ready. Be the first to know when we
              launch and receive a sweet treat on your first order.
            </p>
            <form className="flex max-w-md flex-col gap-3 sm:flex-row">
              <Input
                type="email"
                placeholder="Enter your email"
                aria-label="Email address"
                className="h-11"
              />
              <Button type="submit" size="lg" className="gap-2">
                Notify Me
                <ArrowRight className="h-4 w-4" />
              </Button>
            </form>
            <div className="flex flex-wrap items-center gap-6 pt-2">
              <div>
                <p className="font-heading text-2xl text-primary">12+</p>
                <p className="text-xs text-muted-foreground">
                  Signature recipes
                </p>
              </div>
              <div>
                <p className="font-heading text-2xl text-primary">100%</p>
                <p className="text-xs text-muted-foreground">
                  Made from scratch
                </p>
              </div>
              <div>
                <p className="font-heading text-2xl text-primary">5★</p>
                <p className="text-xs text-muted-foreground">
                  Loved by tasters
                </p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative aspect-4/5 overflow-hidden rounded-3xl border border-border/60 shadow-xl">
              <Image
                src="/cakes/hero-cake.png"
                alt="Signature Deelicious Bakes layer cake on a marble stand"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-5 -left-5 hidden rounded-2xl border border-border/60 bg-card p-4 shadow-lg sm:block">
              <p className="signature-text text-2xl">Freshly baked</p>
              <p className="text-xs text-muted-foreground">
                Every single morning
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border/60 bg-secondary/30">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div className="space-y-2">
              <p className="badge-caption">A taste of what is coming</p>
              <h2 className="font-heading text-3xl">Featured Confections</h2>
            </div>
            <Link href="/store" className={cn(buttonVariants({ variant: "outline" }), "gap-2")}>
              Browse the store
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-5 lg:grid-cols-4">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
