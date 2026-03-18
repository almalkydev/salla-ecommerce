"use client";

import Link from "next/link";
import { Store, Globe, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CartSheet } from "@/components/cart-sheet";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale, OmrIcon, type Language, type Currency } from "@/lib/locale-context";
import { useState, useRef, useEffect } from "react";

function LocaleDropdown() {
    const { language, currency, setLanguage, setCurrency, t } = useLocale();
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    // Close on outside click
    useEffect(() => {
        function handleClick(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, []);

    return (
        <div className="relative" ref={ref}>
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setOpen(!open)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-full text-sm font-medium text-foreground/70 hover:text-foreground hover:bg-white/20 dark:hover:bg-white/10 transition-colors"
            >
                <Globe className="h-4 w-4" />
                <span className="hidden sm:inline">{language === "en" ? "EN" : "AR"}</span>
                <span className="text-[10px] text-muted-foreground hidden sm:inline">|</span>
                <span className="hidden sm:inline text-xs">{currency === "USD" ? "$" : "ر.ع"}</span>
                <ChevronDown className={cn("h-3 w-3 transition-transform", open && "rotate-180")} />
            </motion.button>
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: -8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full mt-2 end-0 w-56 rounded-2xl border border-white/20 bg-white/90 dark:bg-black/90 backdrop-blur-xl shadow-xl p-2 z-50"
                    >
                        {/* Language */}
                        <div className="px-2 py-1.5">
                            <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                                {language === "en" ? "Language" : "اللغة"}
                            </span>
                        </div>
                        {(["en", "ar"] as Language[]).map((lang) => (
                            <button
                                key={lang}
                                onClick={() => { setLanguage(lang); }}
                                className={cn(
                                    "w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-colors",
                                    language === lang
                                        ? "bg-primary/10 text-primary font-medium"
                                        : "hover:bg-muted/80 text-foreground/80"
                                )}
                            >
                                <span className="text-base">{lang === "en" ? "🇺🇸" : "🇴🇲"}</span>
                                <span>{lang === "en" ? "English" : "العربية"}</span>
                                {language === lang && (
                                    <span className="ms-auto text-primary text-xs">✓</span>
                                )}
                            </button>
                        ))}

                        <div className="my-1.5 border-t border-border/50" />

                        {/* Currency */}
                        <div className="px-2 py-1.5">
                            <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                                {language === "en" ? "Currency" : "العملة"}
                            </span>
                        </div>
                        {(["USD", "OMR"] as Currency[]).map((cur) => (
                            <button
                                key={cur}
                                onClick={() => { setCurrency(cur); }}
                                className={cn(
                                    "w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-colors",
                                    currency === cur
                                        ? "bg-primary/10 text-primary font-medium"
                                        : "hover:bg-muted/80 text-foreground/80"
                                )}
                            >
                                {cur === "USD" ? (
                                    <span className="text-base font-semibold w-5 text-center">$</span>
                                ) : (
                                    <OmrIcon className="h-5 w-5" />
                                )}
                                <span>{cur === "USD" ? "US Dollar" : (language === "en" ? "Omani Rial" : "الريال العُماني")}</span>
                                {currency === cur && (
                                    <span className="ms-auto text-primary text-xs">✓</span>
                                )}
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export function StoreHeader() {
    const pathname = usePathname();
    const { t } = useLocale();

    const navItems = [
        { href: "/products", label: t("nav.products") },
        { href: "/digital", label: t("nav.categories") },
    ];

    return (
        <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
            <motion.header
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="pointer-events-auto flex items-center justify-between gap-4 rounded-full border border-white/20 bg-white/10 px-3 py-2 shadow-xl backdrop-blur-xl supports-[backdrop-filter]:bg-white/10 dark:bg-black/10 dark:border-white/10"
            >
                {/* Logo */}
                <Link
                    className="flex items-center justify-center h-10 w-10 rounded-full bg-background/50 hover:bg-background/80 transition-colors border border-white/10 ms-1"
                    href="/"
                >
                    <Store className="h-5 w-5 text-primary" />
                    <span className="sr-only">Salla Store</span>
                </Link>

                {/* Navigation Pills */}
                <nav className="flex items-center gap-1">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "relative px-4 py-2 text-sm font-medium transition-all rounded-full hover:bg-white/20 dark:hover:bg-white/10",
                                    isActive
                                        ? "text-primary bg-white/30 shadow-sm dark:bg-white/5 dark:text-white"
                                        : "text-foreground/70 hover:text-foreground"
                                )}
                            >
                                {isActive && (
                                    <motion.span
                                        layoutId="bubble"
                                        className="absolute inset-0 z-[-1] rounded-full bg-white/40 dark:bg-white/10 mix-blend-difference"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                {/* Actions */}
                <div className="flex items-center gap-1 ps-2">
                    <LocaleDropdown />
                    <div className="rounded-full bg-transparent hover:bg-white/20 transition-colors">
                        <CartSheet />
                    </div>
                    <Link href="/admin">
                        <Button
                            variant="ghost"
                            size="sm"
                            className="hidden sm:flex rounded-full bg-primary/90 text-primary-foreground hover:bg-primary hover:text-primary-foreground px-4 h-9 shadow-lg shadow-primary/20"
                        >
                            {t("nav.dashboard")}
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="sm:hidden rounded-full bg-primary/90 text-primary-foreground hover:bg-primary h-9 w-9"
                        >
                            <span className="sr-only">{t("nav.dashboard")}</span>
                            <div className="h-4 w-4 rounded-sm border-2 border-current" />
                        </Button>
                    </Link>
                </div>
            </motion.header>
        </div>
    );
}
