"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import {
  LayoutDashboard,
  LogOut,
  User,
} from "lucide-react"

import { authClient } from "@/lib/auth-client"

import {
  Avatar,
  AvatarFallback,
} from "@deeliciousbakes/ui/components/avatar"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@deeliciousbakes/ui/components/dropdown-menu"

type Props = {
  trigger: React.ReactNode
  variant?: "header" | "sidebar"
}

export function UserMenuBase({ trigger }: Props) {
  const router = useRouter()
  const { data: session, isPending } = authClient.useSession()

  if (isPending) return null
  if (!session) return null

  const initials = session.user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()

  async function handleSignOut() {
    const toastId = toast.loading("Signing out...")

    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("Signed out.", { id: toastId })
          router.push("/")
          router.refresh()
        },
        onError: ({ error }) => {
          toast.error(error.message, { id: toastId })
        },
      },
    })
  }

  return (
    <DropdownMenu>
      {trigger}

      <DropdownMenuContent align="end" className="w-56">

        {/* user header */}
        <div className="px-2 py-2 space-y-1">
          <p className="text-sm font-medium">{session.user.name}</p>
          <p className="text-xs text-muted-foreground">
            {session.user.email}
          </p>
        </div>

        <DropdownMenuSeparator />

        {session.user.role === "admin" && (
          <DropdownMenuItem >
            <Link href="/admin" className="flex items-center gap-2">
              <LayoutDashboard className="h-4 w-4" />
              Admin Dashboard
            </Link>
          </DropdownMenuItem>
        )}

        <DropdownMenuItem >
          <Link href="/account" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            My Account
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={handleSignOut}
          className="text-red-500"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Sign out
        </DropdownMenuItem>

      </DropdownMenuContent>
    </DropdownMenu>
  )
}