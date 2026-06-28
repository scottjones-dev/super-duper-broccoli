const sections = [
  {
    title: "Information we collect",
    body: "We collect the details you provide when placing an order or creating an account, such as your name, email, delivery address and phone number. We also collect limited technical data to keep our site secure and running smoothly.",
  },
  {
    title: "How we use your information",
    body: "Your information is used to process orders, arrange delivery, respond to enquiries and — only with your consent — send occasional updates about new bakes and seasonal offers.",
  },
  {
    title: "Sharing your information",
    body: "We never sell your data. We share information only with trusted partners who help us operate, such as our payment processor and delivery couriers, and only to the extent required to fulfil your order.",
  },
  {
    title: "Cookies",
    body: "We use essential cookies to remember your cart and preferences, and optional analytics cookies to understand how our site is used. You can manage cookies at any time in your browser settings.",
  },
  {
    title: "Your rights",
    body: "You may request access to, correction of, or deletion of your personal data at any time. To make a request, contact us at hello@deeliciousbakes.com.",
  },
]

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <p className="badge-caption">Last updated June 2026</p>
      <h1 className="mt-2 font-heading text-4xl">Privacy Policy</h1>
      <p className="mt-4 leading-relaxed text-muted-foreground">
        Your trust matters to us. This policy explains what information we
        collect, how we use it and the choices you have.
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
