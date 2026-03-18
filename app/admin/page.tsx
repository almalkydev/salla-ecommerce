import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, CreditCard, DollarSign, Users, TrendingUp, Download, ArrowUpRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { OverviewChart, SalesBarChart } from "@/components/admin-chart";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations";
import { orders, customers, products, formatPrice } from "@/lib/data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Dashboard() {
    const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
    const totalOrders = orders.length;
    const totalCustomers = customers.length;
    const activeProducts = products.filter((p) => p.status === "active").length;
    const recentOrders = orders.slice(0, 5);
    const recentCustomers = customers.slice(0, 5);

    return (
        <FadeIn className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
                    <p className="text-muted-foreground">Welcome back! Here&apos;s your store overview.</p>
                </div>
            </div>

            {/* Stats Grid */}
            <StaggerContainer className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StaggerItem>
                    <Card className="transition-all hover:shadow-md">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{formatPrice(totalRevenue)}</div>
                            <div className="flex items-center gap-1 text-xs text-green-600 mt-1">
                                <TrendingUp className="h-3 w-3" />
                                +20.1% from last month
                            </div>
                        </CardContent>
                    </Card>
                </StaggerItem>
                <StaggerItem>
                    <Card className="transition-all hover:shadow-md">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Orders</CardTitle>
                            <CreditCard className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">+{totalOrders}</div>
                            <div className="flex items-center gap-1 text-xs text-green-600 mt-1">
                                <TrendingUp className="h-3 w-3" />
                                +19% from last month
                            </div>
                        </CardContent>
                    </Card>
                </StaggerItem>
                <StaggerItem>
                    <Card className="transition-all hover:shadow-md">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Customers</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">+{totalCustomers}</div>
                            <div className="flex items-center gap-1 text-xs text-green-600 mt-1">
                                <TrendingUp className="h-3 w-3" />
                                +12 this week
                            </div>
                        </CardContent>
                    </Card>
                </StaggerItem>
                <StaggerItem>
                    <Card className="transition-all hover:shadow-md">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Active Products</CardTitle>
                            <Activity className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{activeProducts}</div>
                            <div className="flex items-center gap-1 text-xs text-green-600 mt-1">
                                <TrendingUp className="h-3 w-3" />
                                All digital products
                            </div>
                        </CardContent>
                    </Card>
                </StaggerItem>
            </StaggerContainer>

            {/* Revenue Card */}
            <Card className="transition-all hover:shadow-md">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <div>
                        <CardTitle className="text-sm font-medium">Digital Revenue</CardTitle>
                        <CardDescription>All revenue from digital products</CardDescription>
                    </div>
                    <Download className="h-5 w-5 text-purple-600" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{formatPrice(totalRevenue)}</div>
                    <div className="w-full bg-muted rounded-full h-2 mt-3">
                        <div className="bg-purple-600 h-2 rounded-full w-full" />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">100% digital products</p>
                </CardContent>
            </Card>

            {/* Charts */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4 transition-all hover:shadow-md">
                    <CardHeader>
                        <CardTitle>Revenue Overview</CardTitle>
                        <CardDescription>Downloads & Licenses revenue over 12 months</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Tabs defaultValue="area">
                            <TabsList className="mb-4">
                                <TabsTrigger value="area">Area</TabsTrigger>
                                <TabsTrigger value="bar">Bar</TabsTrigger>
                            </TabsList>
                            <TabsContent value="area">
                                <OverviewChart />
                            </TabsContent>
                            <TabsContent value="bar">
                                <SalesBarChart />
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>
                <Card className="col-span-3 transition-all hover:shadow-md">
                    <CardHeader>
                        <CardTitle>Recent Sales</CardTitle>
                        <CardDescription>You made {totalOrders} sales this month.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            {recentCustomers.map((customer) => (
                                <div key={customer.id} className="flex items-center">
                                    <Avatar className="h-9 w-9">
                                        <AvatarImage src={customer.avatar} alt={customer.name} />
                                        <AvatarFallback>{customer.initials}</AvatarFallback>
                                    </Avatar>
                                    <div className="ml-4 space-y-1 flex-1 min-w-0">
                                        <p className="text-sm font-medium leading-none truncate">{customer.name}</p>
                                        <p className="text-sm text-muted-foreground truncate">{customer.email}</p>
                                    </div>
                                    <div className="ml-auto font-medium text-sm">
                                        +{formatPrice(customer.totalSpent / customer.orderCount)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Recent Orders */}
            <Card className="transition-all hover:shadow-md">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle>Recent Orders</CardTitle>
                            <CardDescription>Latest orders from your store</CardDescription>
                        </div>
                        <Badge variant="secondary" className="rounded-full">
                            {totalOrders} total
                        </Badge>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {recentOrders.map((order) => (
                            <div key={order.id} className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="flex flex-col">
                                        <span className="font-medium text-sm">{order.customer}</span>
                                        <span className="text-xs text-muted-foreground">{order.id} · {order.date}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Badge variant="outline" className="text-[10px] px-1.5 py-0 rounded-full gap-1">
                                        <Download className="h-2.5 w-2.5" /> Digital
                                    </Badge>
                                    <Badge
                                        variant="secondary"
                                        className={`text-xs capitalize rounded-full ${
                                            order.status === "fulfilled"
                                                ? "bg-green-100 text-green-800"
                                                : order.status === "paid"
                                                ? "bg-blue-100 text-blue-800"
                                                : order.status === "pending"
                                                ? "bg-yellow-100 text-yellow-800"
                                                : order.status === "refunded"
                                                ? "bg-red-100 text-red-800"
                                                : ""
                                        }`}
                                    >
                                        {order.status}
                                    </Badge>
                                    <span className="font-medium text-sm w-20 text-right">
                                        {formatPrice(order.total)}
                                    </span>
                                    <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </FadeIn>
    )
}
