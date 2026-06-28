"use client"
import { Package, CreditCard, Bell, LogOut } from "lucide-react"
import { Button } from "@deeliciousbakes/ui/components/button"
import { Input } from "@deeliciousbakes/ui/components/input"
import { Label } from "@deeliciousbakes/ui/components/label"
import { Switch } from "@deeliciousbakes/ui/components/switch"
import { Separator } from "@deeliciousbakes/ui/components/separator"
import { Badge } from "@deeliciousbakes/ui/components/badge"
import { Avatar, AvatarFallback } from "@deeliciousbakes/ui/components/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@deeliciousbakes/ui/components/card"
import { Tabs, TabsContent, TabsList, TabsTrigger, } from "@deeliciousbakes/ui/components/tabs"
import { formatPrice } from "@/lib/products"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"

const orders = [
  {
    id: "DB-10472",
    date: "Jun 12, 2026",
    items: "Vanilla Bean Celebration Cake",
    total: 58,
    status: "Delivered",
  },
  {
    id: "DB-10391",
    date: "May 28, 2026",
    items: "French Macaron Box, Salted Caramel Drip Cake",
    total: 94,
    status: "Delivered",
  },
  {
    id: "DB-10318",
    date: "May 04, 2026",
    items: "Red Velvet Layer Cake",
    total: 60,
    status: "Cancelled",
  },
]

export default function AccountPage() {
  const router = useRouter()
  const {
    data: session,
    isPending,
    error,
    refetch
  } = authClient.useSession()

  if (isPending) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
        <p>Loading...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
        <p>Error: {error.message}</p>
      </div>
    )
  }

  if (!session) {
    router.push("/sign-in")
    return (
      <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
        <p>You must be logged in to view this page.</p>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
      <div className="flex items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarFallback className="bg-primary/10 font-heading text-xl text-primary">
            {session.user.name?.[0] ?? "?"}
          </AvatarFallback>
        </Avatar>
        <div>
          <h1 className="font-heading text-3xl">{session.user.name}</h1>
          <p className="text-sm text-muted-foreground">{session.user.email}</p>
        </div>
      </div>

      <Tabs defaultValue="profile" className="mt-10">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="mt-6">
          <Card className="border-border/60">
            <CardHeader>
              <CardTitle className="font-heading text-xl">
                Profile details
              </CardTitle>
              <CardDescription>
                Update your personal information and delivery address.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="first">Full name</Label>
                  <Input id="first" defaultValue={session.user.name} />
                </div>
              </div>
              {/* TODO: Add to schema and additional fields in auth for phone and address */}
              {/* <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" defaultValue={session.user.phone} />
              </div> */}
              {/* <div className="space-y-2">
                <Label htmlFor="address">Delivery address</Label>
                <Input id="address" defaultValue={session.user.address} />
              </div> */}
              <Button>Save changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orders" className="mt-6">
          <Card className="border-border/60">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-heading text-xl">
                <Package className="h-5 w-5 text-primary" />
                Order history
              </CardTitle>
              <CardDescription>
                A record of your recent orders with Deelicious Bakes.
              </CardDescription>
            </CardHeader>
            <CardContent className="divide-y divide-border/60">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="flex flex-col gap-2 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="font-medium">{order.id}</p>
                    <p className="text-sm text-muted-foreground">
                      {order.items}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {order.date}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge
                      variant={
                        order.status === "Delivered" ? "secondary" : "outline"
                      }
                    >
                      {order.status}
                    </Badge>
                    <span className="font-heading text-base text-primary">
                      {formatPrice(order.total)}
                    </span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="mt-6">
          <Card className="border-border/60">
            <CardHeader>
              <CardTitle className="font-heading text-xl">
                Account settings
              </CardTitle>
              <CardDescription>
                Manage notifications and payment preferences.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <Bell className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Order updates</p>
                    <p className="text-xs text-muted-foreground">
                      Email me about the status of my orders.
                    </p>
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <Bell className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Marketing emails</p>
                    <p className="text-xs text-muted-foreground">
                      New bakes and seasonal offers.
                    </p>
                  </div>
                </div>
                <Switch />
              </div>
              <Separator />
              <div className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <CreditCard className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Payment method</p>
                    <p className="text-xs text-muted-foreground">
                      Visa ending in 4242
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Update
                </Button>
              </div>
              <Separator />
              <Button
                variant="ghost"
                className="mt-2 gap-2 text-destructive hover:text-destructive"
              >
                <LogOut className="h-4 w-4" />
                Sign out
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
