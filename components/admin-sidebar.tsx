"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Package,
    ShoppingCart,
    Users,
    Settings,
    Store,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const sidebarLinks = [
    {
        title: "Overview",
        href: "/admin",
        icon: LayoutDashboard,
    },
    {
        title: "Products",
        href: "/admin/products",
        icon: Package,
    },
    {
        title: "Orders",
        href: "/admin/orders",
        icon: ShoppingCart,
    },
    {
        title: "Customers",
        href: "/admin/customers",
        icon: Users,
    },
    {
        title: "Settings",
        href: "/admin/settings",
        icon: Settings,
    },
];

export function AdminSidebar() {
    const pathname = usePathname();

    return (
        <div className="hidden border-r bg-card md:block w-64 min-h-screen fixed left-0 top-0 overflow-y-auto">
            <div className="flex h-16 items-center border-b px-6">
                <Link href="/" className="flex items-center gap-2 font-bold text-lg">
                    <Store className="h-6 w-6 text-primary" />
                    <span>Salla Admin</span>
                </Link>
            </div>
            <div className="flex flex-col gap-1 p-4">
                {sidebarLinks.map((link) => {
                    const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
                    return (
                        <Button
                            key={link.title}
                            variant={isActive ? "secondary" : "ghost"}
                            className={cn(
                                "w-full justify-start gap-3",
                                isActive && "bg-secondary font-medium text-primary"
                            )}
                            asChild
                        >
                            <Link href={link.href}>
                                <link.icon className="h-5 w-5" />
                                {link.title}
                            </Link>
                        </Button>
                    );
                })}
            </div>
        </div>
    );
}
