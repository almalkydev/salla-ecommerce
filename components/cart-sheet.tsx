"use client";

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Trash2, Download, Package } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/lib/cart-context";
import { useLocale, PriceTag } from "@/lib/locale-context";
import Link from "next/link";

export function CartSheet() {
    const { items, itemCount, formattedTotal, removeItem, updateQuantity, isOpen, setIsOpen } = useCart();
    const { t } = useLocale();

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                    <ShoppingCart className="h-5 w-5" />
                    <span className="sr-only">{t("cart.title")}</span>
                    {itemCount > 0 && (
                        <span className="absolute -top-1 -end-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                            {itemCount}
                        </span>
                    )}
                </Button>
            </SheetTrigger>
            <SheetContent className="flex w-full flex-col pe-0 sm:max-w-lg">
                <SheetHeader className="px-1">
                    <SheetTitle>{t("cart.title")} ({itemCount})</SheetTitle>
                    <SheetDescription>
                        {itemCount === 0
                            ? t("cart.empty")
                            : t("cart.empty.desc")}
                    </SheetDescription>
                </SheetHeader>
                <Separator className="my-4" />

                {items.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center gap-4 pe-6">
                        <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center">
                            <ShoppingCart className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <p className="text-muted-foreground text-sm">{t("cart.empty")}</p>
                        <Button variant="outline" className="rounded-full" onClick={() => setIsOpen(false)} asChild>
                            <Link href="/products">{t("cart.browse")}</Link>
                        </Button>
                    </div>
                ) : (
                    <>
                        <ScrollArea className="flex-1 pe-6">
                            <div className="flex flex-col gap-6">
                                {items.map((item) => (
                                    <div key={item.product.id} className="flex items-start gap-4">
                                        <div className={`h-20 w-20 rounded-md flex items-center justify-center text-xs text-muted-foreground flex-shrink-0 ${item.product.imageBg}`}>
                                            {item.product.type === "digital" ? (
                                                <Download className="h-5 w-5" />
                                            ) : (
                                                <Package className="h-5 w-5" />
                                            )}
                                        </div>
                                        <div className="flex flex-1 flex-col gap-1 min-w-0">
                                            <div className="flex items-start justify-between gap-2">
                                                <span className="font-semibold text-sm line-clamp-1">{item.product.name}</span>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-7 w-7 text-destructive flex-shrink-0"
                                                    onClick={() => removeItem(item.product.id)}
                                                >
                                                    <Trash2 className="h-3.5 w-3.5" />
                                                </Button>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs text-muted-foreground">{item.product.category}</span>
                                            </div>
                                            <div className="flex items-center justify-between mt-2">
                                                <PriceTag value={item.product.price * item.quantity} className="font-medium text-sm" />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>
                        <div className="pe-6 pt-6">
                            <Separator className="mb-4" />
                            <div className="flex items-center justify-between py-2 text-lg font-semibold">
                                <span>{t("cart.total")}</span>
                                <PriceTag value={items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)} />
                            </div>
                            <Link href="/checkout" onClick={() => setIsOpen(false)}>
                                <Button className="w-full rounded-full" size="lg">
                                    {t("cart.checkout")}
                                </Button>
                            </Link>
                        </div>
                    </>
                )}
            </SheetContent>
        </Sheet>
    );
}
