"use client";

import { StoreHeader } from "@/components/store-header";
import Link from "next/link";
import { useLocale } from "@/lib/locale-context";

export default function StoreLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const { t } = useLocale();

    return (
        <div className="flex flex-col min-h-screen bg-background relative selection:bg-primary/20 text-foreground">
            <StoreHeader />
            <main className="flex-1 pt-24">
                {children}
            </main>
            <footer className="border-t bg-muted/30 backdrop-blur-sm">
                <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
                        <div className="text-start">
                            <h4 className="font-semibold mb-3 text-sm">{t("footer.shop")}</h4>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li><Link href="/products" className="hover:text-foreground transition-colors">{t("footer.allProducts")}</Link></li>
                                <li><Link href="/digital" className="hover:text-foreground transition-colors">{t("footer.digitalDownloads")}</Link></li>
                                <li><Link href="/checkout" className="hover:text-foreground transition-colors">{t("footer.checkout")}</Link></li>
                            </ul>
                        </div>
                        <div className="text-start">
                            <h4 className="font-semibold mb-3 text-sm">{t("footer.support")}</h4>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li><a href="#" className="hover:text-foreground transition-colors">{t("footer.helpCenter")}</a></li>
                                <li><a href="#" className="hover:text-foreground transition-colors">{t("footer.contactUs")}</a></li>
                                <li><a href="#" className="hover:text-foreground transition-colors">{t("footer.returns")}</a></li>
                            </ul>
                        </div>
                        <div className="text-start">
                            <h4 className="font-semibold mb-3 text-sm">{t("footer.company")}</h4>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li><a href="#" className="hover:text-foreground transition-colors">{t("footer.aboutUs")}</a></li>
                                <li><a href="#" className="hover:text-foreground transition-colors">{t("footer.careers")}</a></li>
                                <li><Link href="/admin" className="hover:text-foreground transition-colors">{t("footer.adminDashboard")}</Link></li>
                            </ul>
                        </div>
                        <div className="text-start">
                            <h4 className="font-semibold mb-3 text-sm">{t("footer.newsletter")}</h4>
                            <p className="text-sm text-muted-foreground mb-3">{t("footer.newsletter.desc")}</p>
                            <div className="flex gap-2">
                                <input
                                    type="email"
                                    placeholder="your@email.com"
                                    className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="border-t pt-8 flex flex-col items-center justify-between gap-4 md:flex-row">
                        <p className="text-center text-sm text-muted-foreground md:text-start">
                            {t("footer.copyright")}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <a href="#" className="hover:text-foreground transition-colors">{t("footer.terms")}</a>
                            <a href="#" className="hover:text-foreground transition-colors">{t("footer.privacy")}</a>
                            <a href="#" className="hover:text-foreground transition-colors">{t("footer.cookies")}</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}
