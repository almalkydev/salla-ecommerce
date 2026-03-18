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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { customers, formatPrice } from "@/lib/data"
import { MoreHorizontal, Users, UserPlus, TrendingUp, Download } from "lucide-react"

export default function CustomersPage() {
    const activeCount = customers.filter((c) => c.status === "active").length;
    const totalSpent = customers.reduce((sum, c) => sum + c.totalSpent, 0);
    const avgSpend = totalSpent / customers.length;

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">Customers</h1>
                    <p className="text-sm text-muted-foreground">View and manage your customer base.</p>
                </div>
                <Button size="sm" variant="outline" className="h-8 gap-1">
                    <Download className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Export</span>
                </Button>
            </div>

            {/* Stats */}
            <div className="grid gap-4 md:grid-cols-4">
                <Card>
                    <CardContent className="flex items-center gap-4 pt-6">
                        <div className="h-10 w-10 rounded-xl bg-blue-100 flex items-center justify-center">
                            <Users className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                            <div className="text-2xl font-bold">{customers.length}</div>
                            <p className="text-xs text-muted-foreground">Total Customers</p>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="flex items-center gap-4 pt-6">
                        <div className="h-10 w-10 rounded-xl bg-green-100 flex items-center justify-center">
                            <UserPlus className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                            <div className="text-2xl font-bold">{activeCount}</div>
                            <p className="text-xs text-muted-foreground">Active</p>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="flex items-center gap-4 pt-6">
                        <div className="h-10 w-10 rounded-xl bg-purple-100 flex items-center justify-center">
                            <TrendingUp className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                            <div className="text-2xl font-bold">{formatPrice(totalSpent)}</div>
                            <p className="text-xs text-muted-foreground">Total Revenue</p>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="flex items-center gap-4 pt-6">
                        <div className="h-10 w-10 rounded-xl bg-amber-100 flex items-center justify-center">
                            <TrendingUp className="h-5 w-5 text-amber-600" />
                        </div>
                        <div>
                            <div className="text-2xl font-bold">{formatPrice(avgSpend)}</div>
                            <p className="text-xs text-muted-foreground">Avg. Spend</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>All Customers</CardTitle>
                    <CardDescription>
                        {customers.length} customers · {activeCount} active
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[60px]">Avatar</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead className="hidden sm:table-cell">Email</TableHead>
                                <TableHead className="hidden md:table-cell">Status</TableHead>
                                <TableHead className="hidden md:table-cell">Orders</TableHead>
                                <TableHead className="hidden lg:table-cell">Joined</TableHead>
                                <TableHead className="hidden lg:table-cell">Last Order</TableHead>
                                <TableHead className="text-right">Total Spent</TableHead>
                                <TableHead><span className="sr-only">Actions</span></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {customers.map((customer) => (
                                <TableRow key={customer.id}>
                                    <TableCell>
                                        <Avatar className="h-9 w-9">
                                            <AvatarImage src={customer.avatar} />
                                            <AvatarFallback>{customer.initials}</AvatarFallback>
                                        </Avatar>
                                    </TableCell>
                                    <TableCell className="font-medium">{customer.name}</TableCell>
                                    <TableCell className="hidden sm:table-cell text-sm text-muted-foreground">
                                        {customer.email}
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">
                                        <Badge
                                            variant="secondary"
                                            className={`rounded-full capitalize text-[10px] ${
                                                customer.status === "active"
                                                    ? "bg-green-100 text-green-800"
                                                    : "bg-gray-100 text-gray-600"
                                            }`}
                                        >
                                            {customer.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">{customer.orderCount}</TableCell>
                                    <TableCell className="hidden lg:table-cell text-sm">{customer.joinedAt}</TableCell>
                                    <TableCell className="hidden lg:table-cell text-sm">{customer.lastOrder}</TableCell>
                                    <TableCell className="text-right font-medium">
                                        {formatPrice(customer.totalSpent)}
                                    </TableCell>
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
                                                <DropdownMenuItem>View Profile</DropdownMenuItem>
                                                <DropdownMenuItem>View Orders</DropdownMenuItem>
                                                <DropdownMenuItem>Send Email</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}
