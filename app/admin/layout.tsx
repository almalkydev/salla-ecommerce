import type { Metadata } from "next";
import { AdminHeader } from "@/components/admin-header";
import { AdminSidebar } from "@/components/admin-sidebar";

export const metadata: Metadata = {
    title: "Admin Dashboard | Salla",
    description: "Manage your store",
};

export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="min-h-screen bg-muted/40">
            <AdminSidebar />
            <div className="flex flex-col md:pl-64 min-h-screen transition-all">
                <AdminHeader />
                <main className="flex-1 p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
