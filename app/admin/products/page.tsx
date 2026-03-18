import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
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
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import Link from "next/link"
import { PlusCircle, MoreHorizontal, Download, Key, FileCode } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { products, formatPrice } from "@/lib/data"

function ProductTable({ items }: { items: typeof products }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Products</CardTitle>
                <CardDescription>
                    Manage your products and view their sales performance.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="hidden w-[80px] sm:table-cell">
                                <span className="sr-only">Image</span>
                            </TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="hidden md:table-cell">Price</TableHead>
                            <TableHead className="hidden md:table-cell">Sales</TableHead>
                            <TableHead className="hidden lg:table-cell">Details</TableHead>
                            <TableHead className="hidden md:table-cell">Created</TableHead>
                            <TableHead>
                                <span className="sr-only">Actions</span>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {items.map((product) => (
                            <TableRow key={product.id}>
                                <TableCell className="hidden sm:table-cell">
                                    <div className={`rounded-md aspect-square w-14 h-14 flex items-center justify-center text-muted-foreground ${product.imageBg}`}>
                                        {product.digitalSubtype === "license_key" ? (
                                            <Key className="h-5 w-5" />
                                        ) : product.digitalSubtype === "code" ? (
                                            <FileCode className="h-5 w-5" />
                                        ) : (
                                            <Download className="h-5 w-5" />
                                        )}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="font-medium">{product.name}</div>
                                    <div className="text-xs text-muted-foreground">{product.category}</div>
                                </TableCell>
                                <TableCell>
                                    <Badge variant="outline" className="rounded-full text-[10px] gap-1 capitalize">
                                        <Download className="h-2.5 w-2.5" />
                                        {product.digitalSubtype?.replace("_", " ") || "digital"}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <Badge
                                        variant={product.status === "active" ? "default" : "secondary"}
                                        className="capitalize rounded-full"
                                    >
                                        {product.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="hidden md:table-cell">
                                    <div>{formatPrice(product.price)}</div>
                                    {product.compareAtPrice && (
                                        <div className="text-xs text-muted-foreground line-through">
                                            {formatPrice(product.compareAtPrice)}
                                        </div>
                                    )}
                                </TableCell>
                                <TableCell className="hidden md:table-cell">{product.totalSales}</TableCell>
                                <TableCell className="hidden lg:table-cell">
                                    <div className="text-xs text-muted-foreground space-y-0.5">
                                        {product.fileSize && <div>Size: {product.fileSize}</div>}
                                        {product.fileFormat && <div>Format: {product.fileFormat}</div>}
                                    </div>
                                </TableCell>
                                <TableCell className="hidden md:table-cell">{product.createdAt}</TableCell>
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
                                            <DropdownMenuItem>Edit</DropdownMenuItem>
                                            <DropdownMenuItem>Duplicate</DropdownMenuItem>
                                            <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
            <CardFooter>
                <div className="text-xs text-muted-foreground">
                    Showing <strong>{items.length}</strong> of <strong>{products.length}</strong> products
                </div>
            </CardFooter>
        </Card>
    );
}

export default function ProductsPage() {
    const digitalProducts = products;

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">Products</h1>
                    <p className="text-sm text-muted-foreground">Manage your digital products and assets.</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button size="sm" variant="outline" className="h-8 gap-1">
                        <Download className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Export</span>
                    </Button>
                    <Link href="/admin/products/new">
                        <Button size="sm" className="h-8 gap-1">
                            <PlusCircle className="h-3.5 w-3.5" />
                            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Add Product</span>
                        </Button>
                    </Link>
                </div>
            </div>
            <Tabs defaultValue="all">
                <div className="flex items-center">
                    <TabsList>
                        <TabsTrigger value="all">All ({products.length})</TabsTrigger>
                        <TabsTrigger value="digital">Digital ({digitalProducts.length})</TabsTrigger>
                    </TabsList>
                </div>
                <TabsContent value="all" className="mt-4">
                    <ProductTable items={products} />
                </TabsContent>
                <TabsContent value="digital" className="mt-4">
                    <ProductTable items={digitalProducts} />
                </TabsContent>
            </Tabs>
        </div>
    )
}
