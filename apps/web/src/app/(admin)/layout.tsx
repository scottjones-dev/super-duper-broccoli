import type { ReactNode } from "react"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@deeliciousbakes/ui/components/sidebar"
import { AdminSidebar } from "@/components/admin-sidebar"
import { ModeToggle } from "@/components/mode-toggle"
import { Separator } from "@deeliciousbakes/ui/components/separator"

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarInset>
        <div className="flex flex-col">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 md:px-6">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-full" />
            <h1 className="font-serif text-lg font-semibold">Dashboard</h1>
            <div className="ml-auto">
              <ModeToggle />
            </div>
          </header>
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
