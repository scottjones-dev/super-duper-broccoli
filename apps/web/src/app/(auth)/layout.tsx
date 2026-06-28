import type { ReactNode } from "react"
import Link from "next/link"
import { ModeToggle } from "@/components/mode-toggle"

export default function AuthLayout({ children }: { children: ReactNode }) {

  return (
    <div className="flex min-h-screen flex-col bg-secondary/30 py-6">
      <header className="container mx-auto flex items-center justify-between px-4 py-5 sm:px-6">
        <Link href="/" className="flex items-baseline gap-1">
          <span className="signature-text text-3xl leading-none">
            Deelicious
          </span>
          <span className="font-heading text-sm font-semibold tracking-[0.2em] text-foreground/80 uppercase">
            Bakes
          </span>
        </Link>
        <ModeToggle />
      </header>
      <main className="flex flex-1 items-center justify-center px-4 py-10 sm:px-6">
        <div className="w-full max-w-md">{children}</div>
      </main>
    </div>
  )
}
