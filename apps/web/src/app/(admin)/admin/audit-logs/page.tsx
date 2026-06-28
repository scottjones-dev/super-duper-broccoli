import type { Metadata } from "next"
import { SidebarTrigger } from "@deeliciousbakes/ui/components/sidebar"
import { Separator } from "@deeliciousbakes/ui/components/separator"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@deeliciousbakes/ui/components/card"
import { Badge } from "@deeliciousbakes/ui/components/badge"
import { AdminSalesChart } from "@/components/admin-sales-chart"
import { ModeToggle } from "@/components/mode-toggle"
import { products } from "@/lib/products"
import { DollarSign, ShoppingBag, Users, TrendingUp } from "lucide-react"

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Manage orders, products, and customers for Maison Douce.",
}

const stats = [
  {
    label: "Total Revenue",
    value: "$48,290",
    change: "+12.5%",
    icon: DollarSign,
  },
  { label: "Orders", value: "1,284", change: "+8.2%", icon: ShoppingBag },
  { label: "Customers", value: "942", change: "+5.1%", icon: Users },
  {
    label: "Avg. Order Value",
    value: "$37.60",
    change: "+3.4%",
    icon: TrendingUp,
  },
]

const recentOrders = [
  {
    id: "#3201",
    customer: "Amelia Hart",
    item: "Strawberries & Cream Gâteau",
    total: "$52.00",
    status: "Preparing",
  },
  {
    id: "#3200",
    customer: "Noah Bennett",
    item: "Belgian Chocolate Fudge",
    total: "$48.00",
    status: "Out for delivery",
  },
  {
    id: "#3199",
    customer: "Olivia Reed",
    item: "French Macaron Box",
    total: "$28.00",
    status: "Delivered",
  },
  {
    id: "#3198",
    customer: "Liam Carter",
    item: "Salted Caramel Drip",
    total: "$54.00",
    status: "Delivered",
  },
  {
    id: "#3197",
    customer: "Emma Foster",
    item: "Vanilla Bean Celebration",
    total: "$46.00",
    status: "Cancelled",
  },
]

const statusVariant: Record<
  string,
  "default" | "secondary" | "outline" | "destructive"
> = {
  Preparing: "secondary",
  "Out for delivery": "default",
  Delivered: "outline",
  Cancelled: "destructive",
}

export default function AdminDashboardPage() {
  return (
    <div className="flex flex-col">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 md:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <h1 className="font-serif text-lg font-semibold">Dashboard</h1>
        <div className="ml-auto">
          <ModeToggle/>
        </div>
      </header>

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
                  {stat.value}
                </div>
                <p className="mt-1 text-xs text-primary">
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
                    <p className="truncate text-sm font-medium">
                      {product.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      ${product.price.toFixed(2)}
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
          <CardContent className="px-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left text-muted-foreground">
                    <th className="px-6 py-3 font-medium">Order</th>
                    <th className="px-6 py-3 font-medium">Customer</th>
                    <th className="hidden px-6 py-3 font-medium md:table-cell">
                      Item
                    </th>
                    <th className="px-6 py-3 font-medium">Total</th>
                    <th className="px-6 py-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="border-b last:border-0">
                      <td className="px-6 py-3 font-medium">{order.id}</td>
                      <td className="px-6 py-3">{order.customer}</td>
                      <td className="hidden px-6 py-3 text-muted-foreground md:table-cell">
                        {order.item}
                      </td>
                      <td className="px-6 py-3">{order.total}</td>
                      <td className="px-6 py-3">
                        <Badge variant={statusVariant[order.status]}>
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
    </div>
  )
}
