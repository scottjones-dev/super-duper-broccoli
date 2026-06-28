import { Mail, MapPin, Phone, Clock } from "lucide-react"
import { Button } from "@deeliciousbakes/ui/components/button"
import { Input } from "@deeliciousbakes/ui/components/input"
import { Textarea } from "@deeliciousbakes/ui/components/textarea"
import { Label } from "@deeliciousbakes/ui/components/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@deeliciousbakes/ui/components/select"
import { Card, CardContent } from "@deeliciousbakes/ui/components/card"

const details = [
  { icon: MapPin, label: "Visit", value: "14 Honeywell Lane, Riverside" },
  { icon: Phone, label: "Call", value: "(555) 012-3489" },
  { icon: Mail, label: "Email", value: "hello@deeliciousbakes.com" },
  { icon: Clock, label: "Hours", value: "Tue–Sun, 8am – 6pm" },
]

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <div className="space-y-3 text-center">
        <p className="badge-caption">Get in touch</p>
        <h1 className="font-heading text-4xl">
          We would love to hear from you
        </h1>
        <p className="mx-auto max-w-xl leading-relaxed text-pretty text-muted-foreground">
          Questions about a custom order, allergens or large events? Send us a
          note and we will reply within one business day.
        </p>
      </div>

      <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1.4fr]">
        <div className="space-y-4">
          {details.map((item) => (
            <div key={item.label} className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <item.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="badge-caption">{item.label}</p>
                <p className="text-sm text-foreground">{item.value}</p>
              </div>
            </div>
          ))}
        </div>

        <Card className="border-border/60">
          <CardContent className="pt-6">
            <form className="grid gap-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full name</Label>
                  <Input id="name" placeholder="Jane Baker" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="you@email.com" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="topic">Topic</Label>
                <Select>
                  <SelectTrigger id="topic">
                    <SelectValue placeholder="Select a topic" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="custom">Custom order</SelectItem>
                    <SelectItem value="event">Events & catering</SelectItem>
                    <SelectItem value="allergen">Allergen question</SelectItem>
                    <SelectItem value="other">Something else</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  rows={5}
                  placeholder="Tell us about your celebration..."
                />
              </div>
              <Button type="submit" size="lg" className="w-full sm:w-auto">
                Send message
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
