"use client";

import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, SlidersHorizontal } from "lucide-react";
import { getActiveProducts, type Product } from "@/lib/data";
import { ProductCard } from "@/components/product-card";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations";
import { motion } from "framer-motion";
import { useLocale } from "@/lib/locale-context";

export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const { t } = useLocale();

  const allProducts = getActiveProducts();

  const filteredProducts = useMemo(() => {
    let result: Product[] = allProducts;

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    return result;
  }, [allProducts, search]);

  const categories = useMemo(() => {
    const cats = new Set(allProducts.map((p) => p.category));
    return Array.from(cats);
  }, [allProducts]);

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const displayProducts = useMemo(() => {
    if (!selectedCategory) return filteredProducts;
    return filteredProducts.filter((p) => p.category === selectedCategory);
  }, [filteredProducts, selectedCategory]);

  return (
    <div className="container max-w-7xl px-4 md:px-6 py-10">
      <FadeIn>
        <div className="flex flex-col gap-1 mb-8">
          <h1 className="text-3xl font-bold tracking-tight">{t("products.title")}</h1>
          <p className="text-muted-foreground">
            {t("products.subtitle")}
          </p>
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div className="liquid-glass-card rounded-full px-4 py-2 text-sm font-medium">
            {allProducts.length} {t("products.showing")}
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={t("products.search")}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="ps-9 rounded-full"
            />
          </div>
        </div>
      </FadeIn>

      {/* Category Pills */}
      <FadeIn delay={0.15}>
        <div className="flex flex-wrap gap-2 mb-8">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
            <Button
              variant={selectedCategory === null ? "default" : "outline"}
              size="sm"
              className="rounded-full"
              onClick={() => setSelectedCategory(null)}
            >
              <SlidersHorizontal className="h-3 w-3 me-1" />
              {t("products.all")}
            </Button>
          </motion.div>
          {categories.map((cat) => (
            <motion.div key={cat} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Button
                variant={selectedCategory === cat ? "default" : "outline"}
                size="sm"
                className="rounded-full"
                onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
              >
                {cat}
              </Button>
            </motion.div>
          ))}
        </div>
      </FadeIn>

      {displayProducts.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-muted-foreground text-lg">{t("products.noResults")}</p>
          <p className="text-sm text-muted-foreground mt-1">Try adjusting your filters or search term.</p>
        </div>
      ) : (
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayProducts.map((product) => (
            <StaggerItem key={product.id}>
              <ProductCard product={product} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      )}
    </div>
  );
}
