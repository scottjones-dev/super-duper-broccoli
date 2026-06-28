"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  LayoutDashboard,
  ShoppingBag,
  Wheat,
  Settings,
  ScrollText,
  ChevronUp,
} from "lucide-react"
import { toast } from "sonner"
import { authClient } from "@/lib/auth-client"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@deeliciousbakes/ui/components/sidebar"
import { Avatar, AvatarFallback } from "@deeliciousbakes/ui/components/avatar"
import {
  DropdownMenuTrigger,
} from "@deeliciousbakes/ui/components/dropdown-menu"
import type { Route } from "next"
import { UserMenuBase } from "./user-menu"

const items: {
  title: string
  href: Route
  label: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
}[] = [
    { title: "Dashboard", icon: LayoutDashboard, href: "/admin", label: "Dashboard" },
    { title: "Orders", icon: ShoppingBag, href: "/admin/orders", label: "Orders" },
    { title: "Ingredients", icon: Wheat, href: "/admin/ingredients", label: "Ingredients" },
    { title: "Settings", icon: Settings, href: "/admin/settings", label: "Settings" },
    { title: "Audit Log", icon: ScrollText, href: "/admin/audit-logs", label: "Audit Log" },
  ]

export function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { data: session, error } = authClient.useSession()

  async function handleSignOut() {
    const toastId = toast.loading("Signing out…")
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("Signed out.", { id: toastId })
          router.push("/sign-in")
        },
        onError: (ctx) => {
          toast.error(ctx.error.message, { id: toastId })
        },
      },
    })
  }

  if (error) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-sm text-destructive">Error: {error.message}</p>
      </div>
    )
  }

  if (!session) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-sm text-muted-foreground">Loading…</p>
      </div>
    )
  }

  const initials = session.user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)

  return (
    <Sidebar>
      <SidebarHeader className="h-16 border-b border-sidebar-border">
        <Link href="/" className="flex items-baseline gap-1 px-2 py-1.5">
          <span className="signature-text pr-2 text-4xl leading-none">Deelicious</span>
          <span className="font-heading text-xs font-semibold tracking-[0.2em] text-sidebar-foreground/70 uppercase">
            Admin
          </span>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    isActive={item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href)}                  >
                    <Link href={item.href} className="flex items-center gap-2">
                      <item.icon className="h-4 w-4 text-xl" />
                      <span className="text-xl signature-text">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border">
        <UserMenuBase
          trigger={
            <DropdownMenuTrigger>
              <SidebarMenuButton size="lg">
                <Avatar className="h-7 w-7">
                  <AvatarFallback className="bg-primary/10 text-xs text-primary">
                    {initials}
                  </AvatarFallback>
                </Avatar>

                <div className="flex flex-col text-left">
                  <span className="text-sm font-medium">
                    {session.user.name}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {session.user.role}
                  </span>
                </div>

                <ChevronUp className="ml-auto h-4 w-4" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
          }
        />
      </SidebarFooter>
    </Sidebar>
  )
}