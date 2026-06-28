const sections = [
  {
    title: "Orders and acceptance",
    body: "An order is confirmed once you receive an order confirmation from us. We reserve the right to decline or cancel an order, in which case any payment taken will be refunded in full.",
  },
  {
    title: "Pricing and payment",
    body: "All prices are listed in US dollars and include applicable taxes unless stated otherwise. Payment is taken in full at checkout through our secure payment provider.",
  },
  {
    title: "Cancellations and refunds",
    body: "Orders may be amended or cancelled up to 72 hours before the collection or delivery date for a full refund. Within 72 hours a 50% charge applies to cover ingredient preparation.",
  },
  {
    title: "Allergens",
    body: "Our kitchen handles nuts, dairy, eggs, gluten and other allergens. While we take care to avoid cross-contamination, we cannot guarantee a fully allergen-free product.",
  },
  {
    title: "Delivery",
    body: "We deliver within a defined radius of our kitchen. While we aim to meet all delivery windows, we are not liable for delays caused by circumstances beyond our reasonable control.",
  },
  {
    title: "Limitation of liability",
    body: "To the fullest extent permitted by law, our liability for any claim relating to an order is limited to the value of that order.",
  },
]

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <p className="badge-caption">Last updated June 2026</p>
      <h1 className="mt-2 font-heading text-4xl">Terms of Service</h1>
      <p className="mt-4 leading-relaxed text-muted-foreground">
        These terms govern your use of Deelicious Bakes and any orders placed
        with us. By using our site you agree to the terms below.
      </p>

      <div className="mt-10 space-y-8">
        {sections.map((section) => (
          <section key={section.title} className="space-y-2">
            <h2 className="font-heading text-xl">{section.title}</h2>
            <p className="leading-relaxed text-muted-foreground">
              {section.body}
            </p>
          </section>
        ))}
      </div>
    </div>
  )
}
