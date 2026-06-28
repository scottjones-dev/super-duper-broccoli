import Link from "next/link"
import { Button, buttonVariants } from "@deeliciousbakes/ui/components/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@deeliciousbakes/ui/components/accordion"
import { cn } from "@deeliciousbakes/ui/lib/utils"

const faqs = [
  {
    q: "How far in advance should I place my order?",
    a: "For standard cakes we recommend at least 48 hours' notice. Custom and tiered celebration cakes are best ordered 1–2 weeks ahead so we can plan the design and ingredients.",
  },
  {
    q: "Do you cater to allergies and dietary needs?",
    a: "Yes. We offer gluten-free, vegan and nut-free options for most of our cakes. Please note our kitchen handles nuts, dairy, eggs and gluten, so we cannot guarantee a fully allergen-free environment.",
  },
  {
    q: "Do you deliver?",
    a: "We deliver within a 15-mile radius of our kitchen for a flat fee, and offer free pickup at our storefront. Delivery slots are confirmed at checkout.",
  },
  {
    q: "Can I customise flavours and decorations?",
    a: "Absolutely. Almost every cake can be customised with your choice of sponge, filling, colours and message. Use the contact form to share your vision.",
  },
  {
    q: "How should I store my cake?",
    a: "Keep your cake refrigerated and bring it to room temperature about an hour before serving for the best flavour and texture. Most cakes are best enjoyed within three days.",
  },
  {
    q: "What is your cancellation policy?",
    a: "Orders can be amended or cancelled up to 72 hours before the collection or delivery date for a full refund. Within 72 hours a 50% charge applies due to ingredient preparation.",
  },
]

export default function FaqsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <div className="space-y-3 text-center">
        <p className="badge-caption">Good to know</p>
        <h1 className="font-heading text-4xl">Frequently Asked Questions</h1>
        <p className="leading-relaxed text-pretty text-muted-foreground">
          Everything you need to know before placing your order.
        </p>
      </div>

      <Accordion className="mt-10">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-left font-heading text-base">
              {faq.q}
            </AccordionTrigger>
            <AccordionContent className="leading-relaxed text-muted-foreground">
              {faq.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <div className="mt-12 rounded-2xl border border-border/60 bg-secondary/40 p-8 text-center">
        <p className="signature-text text-3xl">Still have questions?</p>
        <p className="mt-2 text-sm text-muted-foreground">
          Our team is always happy to help with anything not covered here.
        </p>
        <Link href="/contact" className={cn(buttonVariants({ variant: "default" }), " mt-5")}>
          Contact us
        </Link>

      </div>
    </div>
  )
}
