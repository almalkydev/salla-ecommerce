"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";

// ============================================================================
// Types
// ============================================================================

export type Language = "en" | "ar";
export type Currency = "USD" | "OMR";

interface LocaleContextType {
  language: Language;
  currency: Currency;
  setLanguage: (lang: Language) => void;
  setCurrency: (cur: Currency) => void;
  dir: "ltr" | "rtl";
  t: (key: string) => string;
  formatPrice: (price: number) => string;
}

// ============================================================================
// Exchange rate
// ============================================================================

const OMR_RATE = 0.385; // 1 USD ≈ 0.385 OMR

// ============================================================================
// Translations
// ============================================================================

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Header
    "nav.products": "Products",
    "nav.categories": "Categories",
    "nav.dashboard": "Dashboard",

    // Hero
    "hero.badge": "New templates, kits & licenses added weekly",
    "hero.title.1": "Digital Assets for",
    "hero.title.2": "Modern Creators",
    "hero.subtitle":
      "UI kits, starter code, license keys, templates & more — delivered instantly to your inbox after purchase.",
    "hero.browse": "Browse Products",
    "hero.digital": "Digital Store",

    // Stats
    "stats.products": "Total Products",
    "stats.assets": "Digital Assets",
    "stats.delivery": "Delivery",
    "stats.delivery.value": "Instant",
    "stats.customers": "Happy Customers",

    // Features
    "feat.downloads": "Instant Downloads",
    "feat.downloads.desc":
      "Get your files immediately after payment — no waiting, no delays.",
    "feat.licenses": "License Keys",
    "feat.licenses.desc":
      "Software licenses and activation codes delivered to your email.",
    "feat.secure": "Secure & Reliable",
    "feat.secure.desc":
      "Secure checkout, watermarked downloads, and lifetime updates.",

    // Featured Products
    "featured.title": "Featured Products",
    "featured.subtitle": "Our most popular digital downloads and templates.",
    "featured.viewAll": "View All",

    // Categories
    "cat.title": "Browse by Type",
    "cat.downloads": "Downloads",
    "cat.downloads.desc": "UI kits, icons, presets & design files",
    "cat.licenses": "License Keys",
    "cat.licenses.desc": "Software subscriptions & activation codes",
    "cat.code": "Source Code",
    "cat.code.desc": "Starter kits, boilerplates & templates",
    "cat.all": "All Products",
    "cat.all.desc": "Browse our full digital catalog",

    // CTA
    "cta.title": "Start Selling Digital Products",
    "cta.subtitle":
      "Join thousands of creators selling templates, code, and digital assets. Set up your store in minutes.",
    "cta.button": "View Admin Dashboard",

    // Product Card
    "card.add": "Add",
    "card.sale": "Sale",
    "card.download": "Download",
    "card.license": "License",
    "card.code": "Code",
    "card.file": "File",

    // Cart
    "cart.title": "Your Cart",
    "cart.empty": "Your cart is empty",
    "cart.empty.desc": "Add some products to get started.",
    "cart.remove": "Remove",
    "cart.total": "Total",
    "cart.checkout": "Checkout",
    "cart.browse": "Browse Products",

    // Footer
    "footer.shop": "Shop",
    "footer.allProducts": "All Products",
    "footer.digitalDownloads": "Digital Downloads",
    "footer.checkout": "Checkout",
    "footer.support": "Support",
    "footer.helpCenter": "Help Center",
    "footer.contactUs": "Contact Us",
    "footer.returns": "Returns & Refunds",
    "footer.company": "Company",
    "footer.aboutUs": "About Us",
    "footer.careers": "Careers",
    "footer.adminDashboard": "Admin Dashboard",
    "footer.newsletter": "Newsletter",
    "footer.newsletter.desc": "Get updates on new products and deals.",
    "footer.subscribe": "Subscribe",
    "footer.copyright": "© 2026 Salla Store. Built with Next.js & Tailwind CSS.",
    "footer.terms": "Terms",
    "footer.privacy": "Privacy",
    "footer.cookies": "Cookies",

    // Products page
    "products.title": "All Digital Products",
    "products.subtitle": "Browse our complete collection of templates, source code, license keys, and design assets.",
    "products.search": "Search products...",
    "products.showing": "products",
    "products.all": "All",
    "products.noResults": "No products found",

    // Checkout
    "checkout.title": "Checkout",
    "checkout.back": "Continue Shopping",
    "checkout.empty": "Your cart is empty",
    "checkout.empty.desc": "Add some products to your cart before checking out.",
    "checkout.browse": "Browse Products",
    "checkout.email": "Contact Information",
    "checkout.email.label": "Email Address",
    "checkout.digital.notice": "Digital Delivery",
    "checkout.digital.desc": "All digital products will be delivered to your email address instantly after purchase.",
    "checkout.payment": "Payment Method",
    "checkout.summary": "Order Summary",
    "checkout.subtotal": "Subtotal",
    "checkout.tax": "Tax (8%)",
    "checkout.total": "Total",
    "checkout.pay": "Pay",
    "checkout.secure": "Secure checkout powered by Stripe",
    "checkout.success.title": "Order Confirmed!",
    "checkout.success.subtitle": "Thank you for your purchase. Your digital products are ready.",
    "checkout.success.digital": "Digital products will be delivered to your email instantly.",

    // Language
    "lang.english": "English",
    "lang.arabic": "العربية",
    "currency.usd": "USD",
    "currency.omr": "OMR",
  },
  ar: {
    // Header
    "nav.products": "المنتجات",
    "nav.categories": "الفئات",
    "nav.dashboard": "لوحة التحكم",

    // Hero
    "hero.badge": "قوالب وأدوات وتراخيص جديدة تُضاف أسبوعياً",
    "hero.title.1": "أصول رقمية",
    "hero.title.2": "للمبدعين العصريين",
    "hero.subtitle":
      "حزم واجهات، أكواد جاهزة، مفاتيح تراخيص، قوالب والمزيد — تُسلّم فوراً إلى بريدك بعد الشراء.",
    "hero.browse": "تصفّح المنتجات",
    "hero.digital": "المتجر الرقمي",

    // Stats
    "stats.products": "إجمالي المنتجات",
    "stats.assets": "أصول رقمية",
    "stats.delivery": "التوصيل",
    "stats.delivery.value": "فوري",
    "stats.customers": "عملاء سعداء",

    // Features
    "feat.downloads": "تحميل فوري",
    "feat.downloads.desc":
      "احصل على ملفاتك فوراً بعد الدفع — بدون انتظار أو تأخير.",
    "feat.licenses": "مفاتيح التراخيص",
    "feat.licenses.desc":
      "تراخيص البرمجيات وأكواد التفعيل تُرسل إلى بريدك الإلكتروني.",
    "feat.secure": "آمن وموثوق",
    "feat.secure.desc":
      "دفع آمن، تنزيلات محمية بعلامة مائية، وتحديثات مدى الحياة.",

    // Featured Products
    "featured.title": "المنتجات المميزة",
    "featured.subtitle": "أكثر التنزيلات والقوالب الرقمية شعبية.",
    "featured.viewAll": "عرض الكل",

    // Categories
    "cat.title": "تصفّح حسب النوع",
    "cat.downloads": "التنزيلات",
    "cat.downloads.desc": "حزم واجهات، أيقونات، إعدادات مسبقة وملفات تصميم",
    "cat.licenses": "مفاتيح التراخيص",
    "cat.licenses.desc": "اشتراكات برمجية وأكواد تفعيل",
    "cat.code": "الكود المصدري",
    "cat.code.desc": "حزم بداية، قوالب أساسية ونماذج",
    "cat.all": "جميع المنتجات",
    "cat.all.desc": "تصفّح كتالوجنا الرقمي الكامل",

    // CTA
    "cta.title": "ابدأ ببيع المنتجات الرقمية",
    "cta.subtitle":
      "انضم لآلاف المبدعين الذين يبيعون القوالب والأكواد والأصول الرقمية. أنشئ متجرك في دقائق.",
    "cta.button": "عرض لوحة التحكم",

    // Product Card
    "card.add": "أضف",
    "card.sale": "تخفيض",
    "card.download": "تحميل",
    "card.license": "ترخيص",
    "card.code": "كود",
    "card.file": "ملف",

    // Cart
    "cart.title": "سلة التسوق",
    "cart.empty": "سلتك فارغة",
    "cart.empty.desc": "أضف بعض المنتجات للبدء.",
    "cart.remove": "إزالة",
    "cart.total": "المجموع",
    "cart.checkout": "الدفع",
    "cart.browse": "تصفّح المنتجات",

    // Footer
    "footer.shop": "المتجر",
    "footer.allProducts": "جميع المنتجات",
    "footer.digitalDownloads": "التنزيلات الرقمية",
    "footer.checkout": "الدفع",
    "footer.support": "الدعم",
    "footer.helpCenter": "مركز المساعدة",
    "footer.contactUs": "تواصل معنا",
    "footer.returns": "الإرجاع والاسترداد",
    "footer.company": "الشركة",
    "footer.aboutUs": "من نحن",
    "footer.careers": "الوظائف",
    "footer.adminDashboard": "لوحة التحكم",
    "footer.newsletter": "النشرة الإخبارية",
    "footer.newsletter.desc": "احصل على تحديثات المنتجات الجديدة والعروض.",
    "footer.subscribe": "اشترك",
    "footer.copyright": "© 2026 متجر سلّة. مبني بواسطة Next.js و Tailwind CSS.",
    "footer.terms": "الشروط",
    "footer.privacy": "الخصوصية",
    "footer.cookies": "ملفات تعريف الارتباط",

    // Products page
    "products.title": "جميع المنتجات الرقمية",
    "products.subtitle": "تصفّح مجموعتنا الكاملة من القوالب، الأكواد المصدرية، مفاتيح التراخيص، وأصول التصميم.",
    "products.search": "ابحث عن المنتجات...",
    "products.showing": "منتجات",
    "products.all": "الكل",
    "products.noResults": "لم يتم العثور على منتجات",

    // Checkout
    "checkout.title": "إتمام الشراء",
    "checkout.back": "متابعة التسوق",
    "checkout.empty": "سلتك فارغة",
    "checkout.empty.desc": "أضف منتجات إلى سلتك قبل إتمام الشراء.",
    "checkout.browse": "تصفّح المنتجات",
    "checkout.email": "معلومات الاتصال",
    "checkout.email.label": "البريد الإلكتروني",
    "checkout.digital.notice": "التوصيل الرقمي",
    "checkout.digital.desc": "سيتم توصيل جميع المنتجات الرقمية إلى بريدك الإلكتروني فوراً بعد الشراء.",
    "checkout.payment": "طريقة الدفع",
    "checkout.summary": "ملخص الطلب",
    "checkout.subtotal": "المجموع الفرعي",
    "checkout.tax": "الضريبة (٨٪)",
    "checkout.total": "الإجمالي",
    "checkout.pay": "ادفع",
    "checkout.secure": "دفع آمن مدعوم بواسطة Stripe",
    "checkout.success.title": "تم تأكيد الطلب!",
    "checkout.success.subtitle": "شكراً لشرائك. منتجاتك الرقمية جاهزة.",
    "checkout.success.digital": "سيتم توصيل المنتجات الرقمية إلى بريدك فوراً.",

    // Language
    "lang.english": "English",
    "lang.arabic": "العربية",
    "currency.usd": "USD",
    "currency.omr": "ر.ع",
  },
};

// ============================================================================
// Context
// ============================================================================

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

// ============================================================================
// OMR Icon Component
// ============================================================================

export function OmrIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1168 912"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g transform="translate(0,912) scale(0.1,-0.1)">
        <path d="M5815 7494 c-11 -2 -45 -9 -75 -15 -212 -43 -411 -225 -605 -554
-211 -358 -314 -701 -333 -1105 l-7 -155 -671 -3 c-589 -2 -673 -4 -684 -17
-7 -9 -45 -71 -85 -138 -39 -67 -133 -226 -208 -354 -75 -128 -137 -235 -137
-238 0 -3 463 -5 1028 -5 l1028 0 59 -82 c33 -45 103 -133 157 -195 54 -62 98
-115 98 -118 0 -3 -607 -5 -1350 -5 l-1349 0 -16 -30 c-9 -17 -64 -112 -124
-213 -59 -100 -147 -248 -194 -328 -48 -81 -87 -154 -87 -163 0 -15 248 -16
2992 -14 l2992 3 45 75 c24 41 111 190 193 330 82 140 160 272 174 292 13 21
24 40 24 43 0 3 -312 5 -693 5 l-693 0 -120 34 c-138 38 -314 106 -435 166
-124 62 -338 181 -345 191 -3 5 534 9 1303 9 l1308 0 71 123 c39 67 134 231
212 363 78 133 142 246 142 253 0 8 -518 11 -2008 11 l-2009 0 -54 58 c-185
195 -282 368 -265 475 30 186 265 321 528 302 123 -8 225 -37 353 -99 192 -92
368 -228 582 -450 73 -75 137 -136 142 -136 6 0 16 19 22 43 19 69 185 708
231 889 l43 167 -40 42 c-22 23 -89 84 -150 136 -287 247 -602 393 -880 407
-49 3 -99 3 -110 0z" />
      </g>
    </svg>
  );
}

// ============================================================================
// PriceTag Component — renders OMR icon inline instead of ر.ع text
// ============================================================================

export function PriceTag({
  value,
  className = "",
  iconClass,
}: {
  value: number;
  className?: string;
  iconClass?: string;
}) {
  const { currency } = useLocale();

  if (currency === "OMR") {
    const omrPrice = (value * OMR_RATE).toFixed(3);
    return (
      <span className={`inline-flex items-center gap-[0.25em] whitespace-nowrap ${className}`}>
        <OmrIcon className={iconClass ?? "h-[0.55em] w-auto shrink-0"} />
        <span>{omrPrice}</span>
      </span>
    );
  }

  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);

  return <span className={className}>{formatted}</span>;
}

// ============================================================================
// Provider
// ============================================================================

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");
  const [currency, setCurrencyState] = useState<Currency>("USD");

  const dir = language === "ar" ? "rtl" : "ltr";

  // Sync dir and lang to <html> element
  useEffect(() => {
    document.documentElement.dir = dir;
    document.documentElement.lang = language;
    // Add/remove Arabic font class
    if (language === "ar") {
      document.body.classList.add("font-arabic");
    } else {
      document.body.classList.remove("font-arabic");
    }
  }, [language, dir]);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
  }, []);

  const setCurrency = useCallback((cur: Currency) => {
    setCurrencyState(cur);
  }, []);

  const t = useCallback(
    (key: string): string => {
      return translations[language][key] || translations["en"][key] || key;
    },
    [language]
  );

  const formatPrice = useCallback(
    (price: number): string => {
      if (currency === "OMR") {
        const omrPrice = price * OMR_RATE;
        return `${omrPrice.toFixed(3)}`;
      }
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(price);
    },
    [currency]
  );

  return (
    <LocaleContext.Provider
      value={{
        language,
        currency,
        setLanguage,
        setCurrency,
        dir,
        t,
        formatPrice,
      }}
    >
      {children}
    </LocaleContext.Provider>
  );
}

// ============================================================================
// Hook
// ============================================================================

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }
  return context;
}
