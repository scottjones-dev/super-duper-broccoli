"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronDown, Menu, ShoppingBag } from "lucide-react"

import { Button } from "@deeliciousbakes/ui/components/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@deeliciousbakes/ui/components/sheet"

import { ModeToggle } from "@/components/mode-toggle"
import { UserMenuBase } from "./user-menu"
import { cn } from "@deeliciousbakes/ui/lib/utils"
import { DropdownMenuTrigger } from "@deeliciousbakes/ui/components/dropdown-menu"
import { Avatar, AvatarFallback } from "@deeliciousbakes/ui/components/avatar"
import { authClient } from "@/lib/auth-client"

const navLinks = [
  { href: "/store", label: "Store" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/faqs", label: "FAQs" },
] as const

export function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = React.useState(false)
  const { data: session } = authClient.useSession()
  const initials = session?.user.name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl shadow-sm">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Mobile left: menu */}
        <div className="flex items-center gap-2 md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>

            <SheetContent side="left" className="w-72">
              <SheetHeader>
                <SheetTitle className="text-left">
                  <span className="signature-text text-3xl">
                    Deelicious Bakes
                  </span>
                </SheetTitle>
              </SheetHeader>

              <nav className="mt-6 flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "px-2 py-2 text-sm transition-colors",
                      "text-muted-foreground hover:text-foreground",
                      pathname === link.href && "text-foreground font-medium"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        {/* Logo */}
        <Link href="/" className="flex flex-col leading-none">
          <span className="signature-text text-3xl sm:text-4xl">
            Deelicious
          </span>
          <span className="text-[10px] tracking-[0.35em] uppercase text-muted-foreground">
            Bakes
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "relative text-md transition-colors",
                "text-muted-foreground hover:text-foreground",
                pathname === link.href && "text-foreground font-medium"
              )}
            >
              {link.label}

              {pathname === link.href && (
                <span className="absolute -bottom-2 left-0 right-0 h-0.5 bg-primary" />
              )}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">

          <ModeToggle />

          {/* Cart */}
          <Link
            href="/cart"
            className="relative inline-flex items-center justify-center gap-2 rounded-md border border-border bg-background px-3 h-9 text-sm hover:bg-muted transition"
          >
            <ShoppingBag className="h-4 w-4" />
            <span className="hidden sm:inline">Cart</span>

            <span className="ml-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground px-1">
              3
            </span>
          </Link>

          {/* User */}
          <UserMenuBase
            trigger={
              <DropdownMenuTrigger>
                <Button
                  variant="ghost"
                  className="hidden h-9 items-center gap-2 px-2 sm:inline-flex"
                >
                  <Avatar className="h-7 w-7">
                    <AvatarFallback className="bg-primary/10 text-xs text-primary">
                      {initials}
                    </AvatarFallback>
                  </Avatar>

                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
            }
          />
        </div>
      </div>
    </header>
  )
}