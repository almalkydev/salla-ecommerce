"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { FadeIn, SlideUp, FloatIn, ScaleIn, StaggerContainer, StaggerItem } from "@/components/animations";
import { ProductCard } from "@/components/product-card";
import { getActiveProducts } from "@/lib/data";
import { ArrowRight, Download, Key, FileCode, Sparkles, Shield, Package } from "lucide-react";
import { motion } from "framer-motion";
import { useLocale } from "@/lib/locale-context";

export default function Home() {
  const allProducts = getActiveProducts();
  const featuredProducts = allProducts.slice(0, 6);
  const { t, language } = useLocale();

  return (
    <div className="flex flex-col gap-0 pb-16 overflow-x-hidden">
      {/* Hero */}
      <section className="relative isolate overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 pt-14">
          <div className="mx-auto max-w-3xl py-20 sm:py-28 lg:py-36 text-center relative z-10">
            <FadeIn delay={0.1}>
              <div className="hidden sm:mb-8 sm:flex sm:justify-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Badge
                    variant="secondary"
                    className="rounded-full px-5 py-2 text-sm leading-6 liquid-glass-card gap-2 border-white/30 cursor-default"
                  >
                    <Sparkles className="h-3.5 w-3.5 text-foreground" />
                    {t("hero.badge")}
                  </Badge>
                </motion.div>
              </div>
            </FadeIn>
            <SlideUp delay={0.2}>
              <h1
                className={`text-4xl font-bold sm:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-gray-900 via-gray-800 to-gray-500 dark:from-white dark:to-gray-400 py-2 sm:py-3 ${
                  language === "ar" ? "leading-[1.45] tracking-normal" : "leading-[1.15] tracking-tight"
                }`}
              >
                {t("hero.title.1")}<br />{t("hero.title.2")}
              </h1>
            </SlideUp>
            <SlideUp delay={0.3}>
              <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-xl mx-auto">
                {t("hero.subtitle")}
              </p>
            </SlideUp>
            <SlideUp delay={0.4} className="mt-10 flex items-center justify-center gap-x-4">
              <Link href="/products">
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }}>
                  <Button size="lg" className="rounded-full px-8 h-12 text-base shadow-lg shadow-primary/20">
                    {t("hero.browse")}
                    <ArrowRight className="h-4 w-4 ms-2" />
                  </Button>
                </motion.div>
              </Link>
              <Link href="/digital">
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }}>
                  <Button variant="outline" size="lg" className="rounded-full px-8 h-12 text-base liquid-glass-card">
                    <Download className="h-4 w-4 me-2" />
                    {t("hero.digital")}
                  </Button>
                </motion.div>
              </Link>
            </SlideUp>
          </div>
        </div>

        {/* Background blobs */}
        <div className="absolute top-20 left-1/4 w-[500px] h-[500px] opacity-[0.07] bg-gradient-to-tr from-blue-600 to-purple-600 blur-[120px] rounded-full pointer-events-none -z-10 animate-blob" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] opacity-[0.05] bg-gradient-to-br from-emerald-500 to-cyan-500 blur-[100px] rounded-full pointer-events-none -z-10 animate-blob" style={{ animationDelay: "2s" }} />
      </section>

      {/* Stats strip - Liquid Glass */}
      <section className="relative py-6">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <FloatIn delay={0.2}>
            <div className="liquid-glass-strong rounded-3xl overflow-hidden">
              <div className="grid grid-cols-2 md:grid-cols-4">
                {[
                  { value: allProducts.length.toString(), label: t("stats.products"), delay: 0 },
                  { value: allProducts.length.toString(), label: t("stats.assets"), delay: 0.1 },
                  { value: t("stats.delivery.value"), label: t("stats.delivery"), delay: 0.2 },
                  { value: "14K+", label: t("stats.customers"), delay: 0.3 },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + stat.delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className={`flex flex-col items-center py-8 gap-1.5 relative ${i < 3 ? "md:border-r border-white/15" : ""} ${i < 2 ? "border-r border-white/15" : ""}`}
                  >
                    <motion.span
                      className="text-3xl font-bold tracking-tight"
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.7 + stat.delay, type: "spring", stiffness: 200, damping: 12 }}
                    >
                      {stat.value}
                    </motion.span>
                    <span className="text-sm text-muted-foreground font-medium">{stat.label}</span>
                    {/* Subtle shimmer */}
                    <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 animate-shimmer pointer-events-none" />
                  </motion.div>
                ))}
              </div>
            </div>
          </FloatIn>
        </div>
      </section>

      {/* Value Props - B&W Icons, Liquid Glass */}
      <section className="mx-auto w-full max-w-7xl px-6 lg:px-8 py-16">
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: <Download className="h-5 w-5" />,
              title: t("feat.downloads"),
              desc: t("feat.downloads.desc"),
            },
            {
              icon: <Key className="h-5 w-5" />,
              title: t("feat.licenses"),
              desc: t("feat.licenses.desc"),
            },
            {
              icon: <Shield className="h-5 w-5" />,
              title: t("feat.secure"),
              desc: t("feat.secure.desc"),
            },
          ].map((item) => (
            <StaggerItem key={item.title}>
              <motion.div
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="flex items-start gap-4 p-6 rounded-2xl liquid-glass-card"
              >
                <div className="h-11 w-11 rounded-xl bg-foreground/5 border border-foreground/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-foreground">{item.icon}</span>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* Featured Products */}
      <section className="mx-auto w-full max-w-7xl px-6 lg:px-8 pb-16">
        <FadeIn>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">{t("featured.title")}</h2>
              <p className="text-muted-foreground mt-1">
                {t("featured.subtitle")}
              </p>
            </div>
            <Link href="/products">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                <Button variant="outline" className="rounded-full liquid-glass-card border-white/30">
                  {t("featured.viewAll")}
                  <ArrowRight className="h-4 w-4 ms-2" />
                </Button>
              </motion.div>
            </Link>
          </div>
        </FadeIn>
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.map((product) => (
            <StaggerItem key={product.id}>
              <ProductCard product={product} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* Categories */}
      <section className="mx-auto w-full max-w-7xl px-6 lg:px-8 pb-16">
        <FadeIn>
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t("cat.title")}</h2>
        </FadeIn>
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { href: "/digital", icon: <Download className="h-5 w-5" />, title: t("cat.downloads"), desc: t("cat.downloads.desc") },
            { href: "/digital", icon: <Key className="h-5 w-5" />, title: t("cat.licenses"), desc: t("cat.licenses.desc") },
            { href: "/digital", icon: <FileCode className="h-5 w-5" />, title: t("cat.code"), desc: t("cat.code.desc") },
            { href: "/products", icon: <Package className="h-5 w-5" />, title: t("cat.all"), desc: t("cat.all.desc") },
          ].map((cat) => (
            <StaggerItem key={cat.title}>
              <Link href={cat.href} className="group block">
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="rounded-2xl liquid-glass-card p-6 h-full"
                >
                  <div className="h-10 w-10 rounded-xl bg-foreground/5 border border-foreground/10 flex items-center justify-center mb-4">
                    <span className="text-foreground">{cat.icon}</span>
                  </div>
                  <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">{cat.title}</h3>
                  <p className="text-sm text-muted-foreground">{cat.desc}</p>
                </motion.div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* CTA */}
      <section className="mx-auto w-full max-w-7xl px-6 lg:px-8 pb-16">
        <ScaleIn delay={0.1}>
          <div className="relative rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" />
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-white/10 blur-3xl animate-float" />
              <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full bg-white/5 blur-3xl animate-float-slow" />
            </div>
            <div className="relative p-10 md:p-16 text-center text-white">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold mb-4">{t("cta.title")}</h2>
                <p className="text-gray-400 max-w-lg mx-auto mb-8">
                  {t("cta.subtitle")}
                </p>
                <Link href="/admin">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} className="inline-block">
                    <Button size="lg" variant="secondary" className="rounded-full px-8 h-12 text-base">
                      {t("cta.button")}
                      <ArrowRight className="h-4 w-4 ms-2" />
                    </Button>
                  </motion.div>
                </Link>
              </motion.div>
            </div>
          </div>
        </ScaleIn>
      </section>
    </div>
  );
}
