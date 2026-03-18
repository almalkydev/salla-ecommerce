"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Star,
  ShieldCheck,
  Truck,
  Zap,
  Download,
  Key,
  FileCode,
  ArrowLeft,
  Check,
} from "lucide-react";
import { FadeIn, SlideUp, StaggerContainer, StaggerItem } from "@/components/animations";
import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { getProduct, getActiveProducts } from "@/lib/data";
import { ProductCard } from "@/components/product-card";
import { useCart } from "@/lib/cart-context";
import { PriceTag } from "@/lib/locale-context";

export default function ProductPage() {
    const params = useParams();
    const product = getProduct(params.id as string);
    const { addItem } = useCart();
    const [selectedImage, setSelectedImage] = useState(0);

    if (!product) {
        return (
            <div className="container px-4 py-20 text-center">
                <h1 className="text-2xl font-bold mb-2">Product Not Found</h1>
                <p className="text-muted-foreground mb-6">
                    The product you&apos;re looking for doesn&apos;t exist.
                </p>
                <Link href="/products">
                    <Button className="rounded-full">Browse Products</Button>
                </Link>
            </div>
        );
    }

    const relatedProducts = getActiveProducts()
        .filter((p) => p.id !== product.id && (p.category === product.category || p.type === product.type))
        .slice(0, 4);

    const isDigital = product.type === "digital";

    return (
        <div className="container px-4 md:px-6 py-10">
            {/* Breadcrumb */}
            <FadeIn>
                <Link
                    href="/products"
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Products
                </Link>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
                {/* Product Images */}
                <FadeIn className="flex flex-col gap-4">
                    <div className={`aspect-square rounded-2xl overflow-hidden relative ${product.imageBg}`}>
                        {product.images?.[0]?.startsWith("/") ? (
                            <img
                                src={product.images[0]}
                                alt={product.name}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-muted-foreground">
                                <div className="h-16 w-16 rounded-2xl bg-white/80 flex items-center justify-center shadow-sm">
                                    {product.digitalSubtype === "license_key" ? (
                                        <Key className="h-7 w-7" />
                                    ) : product.digitalSubtype === "code" ? (
                                        <FileCode className="h-7 w-7" />
                                    ) : (
                                        <Download className="h-7 w-7" />
                                    )}
                                </div>
                                <span className="font-medium text-lg">{product.name}</span>
                            </div>
                        )}
                        <div className="absolute top-4 left-4 flex gap-2">
                            {product.digitalSubtype && (
                                <Badge className="rounded-full bg-foreground/80 text-background border-none text-xs backdrop-blur-sm">
                                    {product.digitalSubtype === "download" ? "Download" : product.digitalSubtype === "license_key" ? "License" : product.digitalSubtype === "code" ? "Code" : "File"}
                                </Badge>
                            )}
                            {product.compareAtPrice && (
                                <Badge className="rounded-full bg-red-500/90 text-white border-none text-xs">Sale</Badge>
                            )}
                        </div>
                    </div>
                    <div className="flex gap-4 overflow-x-auto pb-2">
                        {product.images.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setSelectedImage(idx)}
                                className={cn(
                                    "relative flex-none w-24 aspect-square rounded-lg overflow-hidden border-2 transition-all",
                                    product.imageBg,
                                    selectedImage === idx ? "border-primary" : "border-transparent hover:border-muted-foreground/25"
                                )}
                            >
                                <div className="absolute inset-0 flex items-center justify-center text-xs text-muted-foreground">
                                    View {idx + 1}
                                </div>
                            </button>
                        ))}
                    </div>
                </FadeIn>

                {/* Product Details */}
                <div className="flex flex-col gap-6">
                    <SlideUp delay={0.1}>
                        <div className="flex items-center gap-2 mb-2">
                            <Badge variant="secondary" className="rounded-full">{product.category}</Badge>
                            {product.rating > 0 && (
                                <div className="flex items-center gap-1 text-sm text-yellow-500">
                                    <Star className="h-4 w-4 fill-current" />
                                    <span className="font-medium text-foreground">{product.rating}</span>
                                    <span className="text-muted-foreground">({product.reviewCount} reviews)</span>
                                </div>
                            )}
                        </div>
                        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{product.name}</h1>
                        <div className="flex items-center gap-3 mt-4">
                            <PriceTag value={product.price} className="text-3xl font-bold" iconClass="h-5 w-auto shrink-0" />
                            {product.compareAtPrice && (
                                <PriceTag value={product.compareAtPrice} className="text-lg text-muted-foreground line-through" iconClass="h-3 w-auto shrink-0" />
                            )}
                        </div>
                    </SlideUp>

                    <SlideUp delay={0.2}>
                        <p className="text-muted-foreground leading-relaxed">{product.longDescription}</p>
                    </SlideUp>

                    {/* Digital-specific info */}
                    {isDigital && (
                        <SlideUp delay={0.25}>
                            <div className="rounded-xl bg-blue-50/50 border border-blue-200 p-4 space-y-2">
                                <p className="text-sm font-medium flex items-center gap-2">
                                    <Download className="h-4 w-4 text-blue-600" />
                                    Digital Product Details
                                </p>
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                    {product.fileSize && (
                                        <div>
                                            <span className="text-muted-foreground">File Size:</span>{" "}
                                            <span className="font-medium">{product.fileSize}</span>
                                        </div>
                                    )}
                                    {product.fileFormat && (
                                        <div>
                                            <span className="text-muted-foreground">Format:</span>{" "}
                                            <span className="font-medium">{product.fileFormat}</span>
                                        </div>
                                    )}
                                    {product.licenseType && (
                                        <div>
                                            <span className="text-muted-foreground">License:</span>{" "}
                                            <span className="font-medium">{product.licenseType}</span>
                                        </div>
                                    )}
                                    {product.digitalSubtype === "license_key" && (
                                        <div>
                                            <span className="text-muted-foreground">Delivery:</span>{" "}
                                            <span className="font-medium">Instant via Email</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </SlideUp>
                    )}

                    {/* Features */}
                    <SlideUp delay={0.3}>
                        <Separator />
                        <div className="py-4 space-y-3">
                            <p className="text-sm font-medium">Key Features</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {product.features.map((feat) => (
                                    <div key={feat} className="flex items-center gap-2 text-sm text-foreground/80">
                                        <Check className="h-4 w-4 text-green-600 flex-shrink-0" />
                                        <span>{feat}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </SlideUp>

                    <SlideUp delay={0.35}>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <div className="flex items-center gap-2 text-sm text-foreground/80 p-3 rounded-xl bg-muted/50">
                                <ShieldCheck className="h-4 w-4 text-primary flex-shrink-0" />
                                <span>Money-Back Guarantee</span>
                            </div>
                            {!isDigital && (
                                <div className="flex items-center gap-2 text-sm text-foreground/80 p-3 rounded-xl bg-muted/50">
                                    <Zap className="h-4 w-4 text-primary flex-shrink-0" />
                                    <span>Instant Delivery</span>
                                </div>
                            )}
                            {isDigital && (
                                <div className="flex items-center gap-2 text-sm text-foreground/80 p-3 rounded-xl bg-muted/50">
                                    <Zap className="h-4 w-4 text-primary flex-shrink-0" />
                                    <span>Instant Delivery</span>
                                </div>
                            )}
                        </div>
                        <Separator className="mt-4" />
                    </SlideUp>

                    <SlideUp delay={0.4} className="mt-2 flex flex-col gap-4 sm:flex-row">
                        <Button size="lg" className="flex-1 rounded-full text-base h-12 inline-flex items-center gap-1" onClick={() => addItem(product)}>
                            Buy Now —{" "}<PriceTag value={product.price} />
                        </Button>
                        <Link href="/checkout" className="flex-1">
                            <Button size="lg" variant="secondary" className="w-full rounded-full text-base h-12" onClick={() => addItem(product)}>
                                Download
                            </Button>
                        </Link>
                    </SlideUp>
                </div>
            </div>

            {/* Related Products */}
            {relatedProducts.length > 0 && (
                <div className="mt-20">
                    <FadeIn>
                        <h2 className="text-2xl font-bold tracking-tight mb-8">Related Products</h2>
                    </FadeIn>
                    <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                        {relatedProducts.map((p) => (
                            <StaggerItem key={p.id}>
                                <ProductCard product={p} />
                            </StaggerItem>
                        ))}
                    </StaggerContainer>
                </div>
            )}
        </div>
    );
}
