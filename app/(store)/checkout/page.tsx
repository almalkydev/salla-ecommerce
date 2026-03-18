"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/lib/cart-context";
import { useLocale, PriceTag } from "@/lib/locale-context";
import { FadeIn, SlideUp } from "@/components/animations";
import {
  CreditCard,
  Lock,
  ShieldCheck,
  ArrowLeft,
  Download,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function CheckoutPage() {
  const { items, total, formattedTotal, clearCart } = useCart();
  const { t } = useLocale();
  const [submitted, setSubmitted] = useState(false);

  const hasDigital = items.some((item) => item.product.type === "digital");
  const shipping = 0;
  const tax = total * 0.08;
  const grandTotal = total + tax;

  if (submitted) {
    return (
      <div className="mx-auto w-full max-w-xl px-4 py-10 min-h-[70vh] flex items-center justify-center text-center">
        <FadeIn className="w-full">
          <div className="flex justify-center mb-6">
            <div className="h-20 w-20 rounded-full bg-green-100 flex items-center justify-center mx-auto">
              <CheckCircle2 className="h-10 w-10 text-green-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-2">{t("checkout.success.title")}</h1>
          <p className="text-muted-foreground mb-4">
            {t("checkout.success.subtitle")}
          </p>
          {hasDigital && (
            <p className="text-sm text-muted-foreground mb-6">
              {t("checkout.success.digital")}
            </p>
          )}
          <Link href="/products">
            <Button className="rounded-full">{t("checkout.back")}</Button>
          </Link>
        </FadeIn>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container max-w-xl px-4 py-20 text-center">
        <FadeIn>
          <h1 className="text-2xl font-bold mb-2">{t("checkout.empty")}</h1>
          <p className="text-muted-foreground mb-6">{t("checkout.empty.desc")}</p>
          <Link href="/products">
            <Button className="rounded-full">{t("checkout.browse")}</Button>
          </Link>
        </FadeIn>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-5xl px-4 md:px-6 py-10">
      <FadeIn>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          {t("checkout.back")}
        </Link>
        <h1 className="text-3xl font-bold tracking-tight mb-8">{t("checkout.title")}</h1>
      </FadeIn>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Contact */}
          <SlideUp delay={0.1}>
            <Card className="rounded-2xl">
              <CardHeader>
                <CardTitle className="text-lg">{t("checkout.email")}</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="first-name">First Name</Label>
                    <Input id="first-name" placeholder="John" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last-name">Last Name</Label>
                    <Input id="last-name" placeholder="Doe" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="john@example.com" />
                </div>
              </CardContent>
            </Card>
          </SlideUp>

          {/* Digital notice */}
          <SlideUp delay={0.2}>
              <Card className="rounded-2xl border-blue-200 bg-blue-50/50">
                <CardContent className="flex items-start gap-3 pt-6">
                  <Download className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">Instant Digital Delivery</p>
                    <p className="text-sm text-muted-foreground">
                      Your digital products will be available for download immediately after payment.
                      License keys will be sent to your email.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </SlideUp>

          {/* Payment */}
          <SlideUp delay={0.3}>
            <Card className="rounded-2xl">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-muted-foreground" />
                  <CardTitle className="text-lg">Payment</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="card">Card Number</Label>
                  <Input id="card" placeholder="4242 4242 4242 4242" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input id="expiry" placeholder="MM/YY" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvc">CVC</Label>
                    <Input id="cvc" placeholder="123" />
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Lock className="h-3 w-3" />
                  <span>Your payment information is encrypted and secure.</span>
                </div>
              </CardContent>
            </Card>
          </SlideUp>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1 w-full max-w-md mx-auto lg:max-w-none">
          <SlideUp delay={0.15}>
            <Card className="rounded-2xl sticky top-28">
              <CardHeader>
                <CardTitle className="text-lg">{t("checkout.summary")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {items.map((item) => (
                  <div key={item.product.id} className="flex items-start gap-3">
                    <div
                      className={`h-12 w-12 rounded-lg flex items-center justify-center text-[10px] text-muted-foreground ${item.product.imageBg}`}
                    >
                      DIG
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium line-clamp-1">{item.product.name}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">Qty: {item.quantity}</span>
                        {item.product.type === "digital" && (
                          <Badge variant="secondary" className="text-[10px] px-1.5 py-0 rounded-full">
                            Digital
                          </Badge>
                        )}
                      </div>
                    </div>
                    <PriceTag
                      value={item.product.price * item.quantity}
                      className="min-w-[7.5rem] justify-end text-end text-sm font-medium tabular-nums shrink-0"
                      iconClass="h-3 w-auto shrink-0"
                    />
                  </div>
                ))}

                <Separator />

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between items-center gap-3">
                    <span className="text-muted-foreground">{t("checkout.subtotal")}</span>
                    <PriceTag value={total} className="min-w-[7.5rem] justify-end text-end tabular-nums shrink-0" iconClass="h-3 w-auto shrink-0" />
                  </div>
                  <div className="flex justify-between items-center gap-3">
                    <span className="text-muted-foreground">{t("checkout.tax")}</span>
                    <PriceTag value={tax} className="min-w-[7.5rem] justify-end text-end tabular-nums shrink-0" iconClass="h-3 w-auto shrink-0" />
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between items-center gap-3 font-bold text-lg">
                  <span>{t("checkout.total")}</span>
                  <PriceTag value={grandTotal} className="min-w-[7.5rem] justify-end text-end tabular-nums shrink-0" iconClass="h-3.5 w-auto shrink-0" />
                </div>

                <Button
                  className="w-full rounded-full min-h-12 h-auto py-2 text-sm sm:text-base inline-flex items-center justify-center gap-1.5"
                  size="lg"
                  onClick={() => {
                    setSubmitted(true);
                    clearCart();
                  }}
                >
                  <ShieldCheck className="h-4 w-4 me-2" />
                  {t("checkout.pay")} {" "}<PriceTag value={grandTotal} className="tabular-nums" iconClass="h-3 w-auto shrink-0" />
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  30-day money-back guarantee
                </p>
              </CardContent>
            </Card>
          </SlideUp>
        </div>
      </div>
    </div>
  );
}
