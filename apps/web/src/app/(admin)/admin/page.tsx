"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@deeliciousbakes/ui/components/card"
import { Badge } from "@deeliciousbakes/ui/components/badge"
import { AdminSalesChart } from "@/components/admin-sales-chart"
import { formatPrice, products } from "@/lib/products"
import { DollarSign, ShoppingBag, Users, TrendingUp, type LucideIcon, } from "lucide-react"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"

type Stat = {
  label: string
  value: number
  format: "currency" | "number"
  change: string
  icon: LucideIcon
}

type OrderStatus = "Preparing" | "Out for delivery" | "Delivered" | "Cancelled"

type RecentOrder = {
  id: number
  customer: string
  item: string
  total: number
  status: OrderStatus
}

const stats: Stat[] = [
  {
    label: "Total Revenue",
    format: "currency",
    value: 48290,
    change: "+12.5%",
    icon: DollarSign,
  },
  {
    label: "Orders",
    format: "number",
    value: 1284,
    change: "+8.2%",
    icon: ShoppingBag,
  },
  {
    label: "Customers",
    format: "number",
    value: 942,
    change: "+5.1%",
    icon: Users,
  },
  {
    label: "Avg. Order Value",
    format: "currency",
    value: 37.6,
    change: "+3.4%",
    icon: TrendingUp,
  },
]

const recentOrders: RecentOrder[] = [
  {
    id: 3201,
    customer: "Amelia Hart",
    item: "Strawberries & Cream Gâteau",
    total: 52.0,
    status: "Preparing",
  },
  {
    id: 3200,
    customer: "Noah Bennett",
    item: "Belgian Chocolate Fudge",
    total: 48.0,
    status: "Out for delivery",
  },
  {
    id: 3199,
    customer: "Olivia Reed",
    item: "French Macaron Box",
    total: 28.0,
    status: "Delivered",
  },
  {
    id: 3198,
    customer: "Liam Carter",
    item: "Salted Caramel Drip",
    total: 54.0,
    status: "Delivered",
  },
  {
    id: 3197,
    customer: "Emma Foster",
    item: "Vanilla Bean Celebration",
    total: 46.0,
    status: "Cancelled",
  },
]

const statusVariant: Record<string, "default" | "secondary" | "outline" | "destructive"> = {
  Preparing: "secondary",
  "Out for delivery": "default",
  Delivered: "outline",
  Cancelled: "destructive",
}

export default function AdminDashboardPage() {
  const router = useRouter()
  const { data: session, isPending, error, } = authClient.useSession()

  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-lg font-medium text-muted-foreground">Loading...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-lg font-medium text-destructive">
          Error: {error.message}
        </p>
      </div>
    )
  }

  if (!session) {
    router.push("/sign-in")
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-lg font-medium text-muted-foreground">
          You must be logged in to access the admin dashboard.
        </p>
      </div>
    )
  }

  if (!session.user.role || session.user.role !== "admin") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-lg font-medium text-muted-foreground">
          You do not have permission to access the admin dashboard.
        </p>
      </div>
    )
  }

  return (
    <main className="flex flex-1 flex-col gap-6 p-4 md:p-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardDescription>{stat.label}</CardDescription>
              <stat.icon
                className="h-4 w-4 text-muted-foreground"
                aria-hidden="true"
              />
            </CardHeader>
            <CardContent>
              <div className="font-serif text-2xl font-semibold">
                {stat.format === "currency"
                  ? formatPrice(stat.value)
                  : stat.value.toLocaleString()}
              </div>
              <p
                className={`mt-1 text-xs ${stat.change.startsWith("+") ? "text-green-500" : "text-red-500"}`}
              >
                {stat.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="font-serif">Revenue overview</CardTitle>
            <CardDescription>
              Monthly revenue for the current year
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AdminSalesChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-serif">Top products</CardTitle>
            <CardDescription>Best sellers this month</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {products.slice(0, 5).map((product, i) => (
              <div key={product.id} className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-sm font-medium text-secondary-foreground">
                  {i + 1}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{product.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {" "}
                    {formatPrice(product.price)}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-serif">Recent orders</CardTitle>
          <CardDescription>Latest customer orders</CardDescription>
        </CardHeader>

        <CardContent className="py-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr className="border-b">
                  <th className="px-6 py-3 text-left text-xs font-medium tracking-wide text-muted-foreground uppercase">
                    Order
                  </th>

                  <th className="px-6 py-3 text-left text-xs font-medium tracking-wide text-muted-foreground uppercase">
                    Customer
                  </th>

                  <th className="px-6 py-3 text-right text-xs font-medium tracking-wide text-muted-foreground uppercase">
                    Total
                  </th>

                  <th className="px-6 py-3 text-center text-xs font-medium tracking-wide text-muted-foreground uppercase">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody>
                {recentOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b transition-colors last:border-0 hover:bg-muted/40"
                  >
                    <td className="px-6 py-4 font-medium text-muted-foreground">
                      #{order.id}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-sm font-semibold text-secondary-foreground">
                          {order.customer
                            .split(" ")
                            .map((name) => name[0])
                            .join("")}
                        </div>

                        <div className="min-w-0">
                          <p className="truncate font-medium">
                            {order.customer}
                          </p>

                          <p className="truncate text-sm text-muted-foreground">
                            {order.item}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-right font-medium">
                      {formatPrice(order.total)}
                    </td>

                    <td className="px-6 py-4 text-center">
                      <Badge
                        className="min-w-32 justify-center"
                        variant={statusVariant[order.status]}
                      >
                        {order.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}
