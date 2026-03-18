import { Badge } from "@/components/ui/badge"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { orders, formatPrice, getOrderStatusColor, getDeliveryStatusColor } from "@/lib/data"
import { Download, Key, MoreHorizontal, Eye } from "lucide-react"

export default function OrdersPage() {
    const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
    const fulfilledCount = orders.filter((o) => o.status === "fulfilled").length;
    const pendingCount = orders.filter((o) => o.status === "pending").length;
    const digitalOrders = orders.filter((o) => o.items.some((i) => i.type === "digital")).length;

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">Orders</h1>
                    <p className="text-sm text-muted-foreground">Manage orders, downloads, and license deliveries.</p>
                </div>
                <Button size="sm" variant="outline" className="h-8 gap-1">
                    <Download className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Export</span>
                </Button>
            </div>

            {/* Stats */}
            <div className="grid gap-4 md:grid-cols-4">
                <Card>
                    <CardContent className="pt-6">
                        <div className="text-2xl font-bold">{orders.length}</div>
                        <p className="text-xs text-muted-foreground">Total Orders</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="text-2xl font-bold">{formatPrice(totalRevenue)}</div>
                        <p className="text-xs text-muted-foreground">Total Revenue</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="text-2xl font-bold text-green-600">{fulfilledCount}</div>
                        <p className="text-xs text-muted-foreground">Fulfilled</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="text-2xl font-bold text-yellow-600">{pendingCount}</div>
                        <p className="text-xs text-muted-foreground">Pending</p>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader className="px-7">
                    <CardTitle>All Orders</CardTitle>
                    <CardDescription>
                        {orders.length} orders · {digitalOrders} include digital products
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Order</TableHead>
                                <TableHead>Customer</TableHead>
                                <TableHead className="hidden sm:table-cell">Items</TableHead>
                                <TableHead className="hidden sm:table-cell">Status</TableHead>
                                <TableHead className="hidden md:table-cell">Delivery</TableHead>
                                <TableHead className="hidden lg:table-cell">Digital Info</TableHead>
                                <TableHead className="hidden md:table-cell">Date</TableHead>
                                <TableHead className="text-right">Amount</TableHead>
                                <TableHead><span className="sr-only">Actions</span></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {orders.map((order) => {

                                return (
                                    <TableRow key={order.id}>
                                        <TableCell>
                                            <span className="font-mono text-xs font-medium">{order.id}</span>
                                        </TableCell>
                                        <TableCell>
                                            <div className="font-medium text-sm">{order.customer}</div>
                                            <div className="hidden text-xs text-muted-foreground md:inline">
                                                {order.email}
                                            </div>
                                        </TableCell>
                                        <TableCell className="hidden sm:table-cell">
                                            <div className="flex items-center gap-1.5">
                                                <Badge variant="outline" className="text-[10px] px-1.5 py-0 rounded-full gap-0.5">
                                                    <Download className="h-2.5 w-2.5" /> Digital
                                                </Badge>
                                            </div>
                                        </TableCell>
                                        <TableCell className="hidden sm:table-cell">
                                            <Badge className={`text-[10px] capitalize rounded-full border ${getOrderStatusColor(order.status)}`}>
                                                {order.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="hidden md:table-cell">
                                            <Badge variant="secondary" className={`text-[10px] capitalize rounded-full ${getDeliveryStatusColor(order.deliveryStatus)}`}>
                                                {order.deliveryStatus}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="hidden lg:table-cell">
                                            <div className="text-xs text-muted-foreground space-y-0.5">
                                                {order.downloadCount !== undefined && (
                                                    <div className="flex items-center gap-1">
                                                        <Download className="h-3 w-3" />
                                                        {order.downloadCount} downloads
                                                    </div>
                                                )}
                                                {order.licenseKey && (
                                                    <div className="flex items-center gap-1">
                                                        <Key className="h-3 w-3" />
                                                        {order.licenseKey}
                                                    </div>
                                                )}
                                                {!order.downloadCount && !order.licenseKey && (
                                                    <span className="text-muted-foreground/50">—</span>
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell className="hidden md:table-cell text-sm">{order.date}</TableCell>
                                        <TableCell className="text-right font-medium">{formatPrice(order.total)}</TableCell>
                                        <TableCell>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button aria-haspopup="true" size="icon" variant="ghost">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                        <span className="sr-only">Toggle menu</span>
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                    <DropdownMenuItem>
                                                        <Eye className="h-3.5 w-3.5 mr-2" /> View Details
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem>
                                                        <Download className="h-3.5 w-3.5 mr-2" /> Resend Download
                                                    </DropdownMenuItem>
                                                    {order.licenseKey && (
                                                        <DropdownMenuItem>
                                                            <Key className="h-3.5 w-3.5 mr-2" /> Resend License
                                                        </DropdownMenuItem>
                                                    )}
                                                    <DropdownMenuItem className="text-destructive">Refund</DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}
