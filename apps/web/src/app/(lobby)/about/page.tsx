import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Heart, Leaf, Wheat } from "lucide-react"
import { Button, buttonVariants } from "@deeliciousbakes/ui/components/button"
import { cn } from "@deeliciousbakes/ui/lib/utils"

const values = [
  {
    icon: Wheat,
    title: "Made from scratch",
    description:
      "No mixes, no shortcuts. Every batter and buttercream is made by hand in our kitchen.",
  },
  {
    icon: Leaf,
    title: "Seasonal & local",
    description:
      "We source fruit, dairy and chocolate from trusted local growers and makers.",
  },
  {
    icon: Heart,
    title: "Baked with love",
    description:
      "Each cake is a small celebration — finished with care and a personal touch.",
  },
]

export default function AboutPage() {
  return (
    <div>
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2">
        <div className="space-y-5">
          <p className="badge-caption">Our Story</p>
          <h1 className="font-heading text-4xl leading-tight text-balance">
            A little kitchen with a big love for baking.
          </h1>
          <p className="leading-relaxed text-muted-foreground">
            Deelicious Bakes began at a worn farmhouse table, where weekend
            baking for friends slowly turned into something more. What started
            as a single vanilla sponge has grown into a collection of cakes,
            pastries and confections that we are proud to share.
          </p>
          <p className="leading-relaxed text-muted-foreground">
            We believe a cake should taste as wonderful as it looks. That means
            real butter, good chocolate, ripe fruit and the kind of patience
            that only comes from doing things the slow, honest way.
          </p>
          <Link href="/store" className={cn(buttonVariants({ variant: "default" }), "w-full gap-2")}>
            Explore the collection
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="relative aspect-4/5 overflow-hidden rounded-3xl border border-border/60 shadow-xl">
          <Image
            src="/cakes/strawberry-cream.png"
            alt="A freshly finished strawberries and cream gateau"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      </section>

      <section className="border-t border-border/60 bg-secondary/30">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="grid gap-8 md:grid-cols-3">
            {values.map((value) => (
              <div key={value.title} className="space-y-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <value.icon className="h-5 w-5" />
                </div>
                <h3 className="font-heading text-xl">{value.title}</h3>
                <p className="leading-relaxed text-muted-foreground">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
        <p className="signature-text text-4xl">Thank you for stopping by</p>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          Whether it is a birthday, a wedding or simply a Tuesday that needs a
          little sweetness, we would be honoured to bake for you.
        </p>
      </section>
    </div>
  )
}
