"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { Download, Key, FileCode, ShoppingCart } from "lucide-react";
import { type Product } from "@/lib/data";
import { useCart } from "@/lib/cart-context";
import { useLocale, PriceTag } from "@/lib/locale-context";
import Image from "next/image";

const digitalIcons: Record<string, React.ReactNode> = {
  download: <Download className="h-5 w-5" />,
  license_key: <Key className="h-5 w-5" />,
  code: <FileCode className="h-5 w-5" />,
  file: <Download className="h-5 w-5" />,
};

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const { t } = useLocale();
  const hasPreviewImage = product.images?.[0]?.startsWith("/");

  return (
    <Link href={`/product/${product.id}`}>
      <motion.div
        whileHover={{ y: -6, scale: 1.01 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="group rounded-2xl overflow-hidden liquid-glass-card h-full flex flex-col"
      >
        <div className={`aspect-[4/3] relative overflow-hidden ${product.imageBg}`}>
          {hasPreviewImage ? (
            <motion.div
              className="absolute inset-0"
              whileHover={{ scale: 1.06 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </motion.div>
          ) : (
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-muted-foreground font-medium"
            >
              {product.digitalSubtype && (
                <div className="h-12 w-12 rounded-xl bg-white/80 flex items-center justify-center shadow-sm">
                  {digitalIcons[product.digitalSubtype] || <Download className="h-5 w-5" />}
                </div>
              )}
              <span className="text-sm">{product.name}</span>
            </motion.div>
          )}

          {/* Badges */}
          <div className="absolute top-3 left-3 flex gap-2">
            {product.digitalSubtype && (
              <Badge className="rounded-full bg-foreground/80 text-background border-none text-[10px] uppercase tracking-wide px-2.5 py-0.5 backdrop-blur-sm">
                {product.digitalSubtype === "download" ? t("card.download") : product.digitalSubtype === "license_key" ? t("card.license") : product.digitalSubtype === "code" ? t("card.code") : t("card.file")}
              </Badge>
            )}
            {product.compareAtPrice && (
              <Badge className="rounded-full bg-red-500/90 text-white border-none text-[10px] uppercase tracking-wide px-2.5 py-0.5">
                {t("card.sale")}
              </Badge>
            )}
          </div>

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
        </div>
        <div className="p-4 flex-1 flex flex-col">
          <div className="flex-1">
            <p className="text-xs text-muted-foreground mb-1 font-medium">{product.category}</p>
            <h3 className="font-semibold text-sm group-hover:text-primary transition-colors line-clamp-1">
              {product.name}
            </h3>
            <p className="text-xs text-muted-foreground line-clamp-2 mt-1 leading-relaxed">
              {product.description}
            </p>
          </div>
          <div className="mt-3 pt-3 border-t border-border/50 flex items-center justify-between">
            <div className="flex items-center gap-2 min-w-0">
              <PriceTag value={product.price} className="font-bold text-base" iconClass="h-3 w-auto shrink-0" />
              {product.compareAtPrice && (
                <PriceTag value={product.compareAtPrice} className="text-xs text-muted-foreground line-through" iconClass="h-2 w-auto shrink-0" />
              )}
            </div>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                size="sm"
                variant="secondary"
                className="rounded-full h-8 w-8 p-0"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  addItem(product);
                }}
              >
                <ShoppingCart className="h-3.5 w-3.5" />
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
