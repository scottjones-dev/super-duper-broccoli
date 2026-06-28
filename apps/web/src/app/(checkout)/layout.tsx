import type { ReactNode } from "react"
import Link from "next/link"
import { Lock } from "lucide-react"
import { ModeToggle } from "@/components/mode-toggle"

export default function CheckoutLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-border/60">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex items-baseline gap-1">
            <span className="signature-text text-3xl leading-none">
              Deelicious
            </span>
            <span className="font-heading text-sm font-semibold tracking-[0.2em] text-foreground/80 uppercase">
              Bakes
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Lock className="h-3.5 w-3.5" />
              Secure checkout
            </span>
            <ModeToggle />
          </div>
        </div>
      </header>
      <main className="flex-1 bg-secondary/20">{children}</main>
    </div>
  )
}
