// ============================================================================
// Types
// ============================================================================

export type ProductType = "digital";
export type DigitalSubtype = "download" | "license_key" | "code" | "file";
export type ProductStatus = "active" | "draft" | "archived";
export type OrderStatus = "pending" | "paid" | "fulfilled" | "refunded" | "cancelled";
export type DeliveryStatus = "pending" | "shipped" | "delivered" | "downloaded" | "emailed";

export interface Product {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  price: number;
  compareAtPrice?: number;
  type: ProductType;
  digitalSubtype?: DigitalSubtype;
  status: ProductStatus;
  category: string;
  images: string[];
  imageBg: string;
  stock: number;
  totalSales: number;
  rating: number;
  reviewCount: number;
  features: string[];
  fileSize?: string;
  fileFormat?: string;
  licenseType?: string;
  createdAt: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  type: ProductType;
}

export interface Order {
  id: string;
  customer: string;
  email: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  deliveryStatus: DeliveryStatus;
  date: string;
  downloadCount?: number;
  licenseKey?: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  avatar: string;
  initials: string;
  joinedAt: string;
  totalSpent: number;
  orderCount: number;
  lastOrder: string;
  status: "active" | "inactive";
}

// ============================================================================
// Products
// ============================================================================

export const products: Product[] = [
  {
    id: "prod_002",
    name: "Pro UI Kit Bundle",
    description: "Complete vector UI kit with 500+ components for designers.",
    longDescription:
      "The ultimate design toolkit. Over 500 hand-crafted UI components, 100+ page templates, and a fully documented design system. Built for Figma and compatible with Sketch. Regular updates and lifetime access included.",
    price: 49.0,
    compareAtPrice: 79.0,
    type: "digital",
    digitalSubtype: "download",
    status: "active",
    category: "Design Assets",
    images: ["/products/uikit-preview.svg"],
    imageBg: "bg-gradient-to-br from-blue-50 to-indigo-100",
    stock: 999,
    totalSales: 1850,
    rating: 4.9,
    reviewCount: 312,
    features: [
      "500+ Components",
      "100+ Templates",
      "Figma & Sketch",
      "Lifetime Updates",
      "Commercial License",
    ],
    fileSize: "285 MB",
    fileFormat: ".fig, .sketch",
    createdAt: "2025-03-20",
  },
  {
    id: "prod_003",
    name: "Annual Software License",
    description: "Premium subscription — all features unlocked for one year.",
    longDescription:
      "Unlock the full power of our platform with an annual Pro license. Includes priority support, advanced analytics, unlimited exports, team collaboration features, and early access to new tools. License key delivered instantly via email.",
    price: 199.0,
    type: "digital",
    digitalSubtype: "license_key",
    status: "active",
    category: "Software",
    images: ["/products/license-preview.svg"],
    imageBg: "bg-gradient-to-br from-purple-50 to-violet-100",
    stock: 999,
    totalSales: 756,
    rating: 4.7,
    reviewCount: 89,
    features: [
      "All Features Unlocked",
      "Priority Support",
      "Advanced Analytics",
      "Team Collaboration",
      "12 Months Access",
    ],
    licenseType: "Annual Subscription",
    createdAt: "2025-01-15",
  },
  {
    id: "prod_005",
    name: "Developer Icons Pack",
    description: "1,200+ hand-crafted SVG icons for web and mobile apps.",
    longDescription:
      "A comprehensive collection of pixel-perfect icons designed for developers and designers. Every icon comes in SVG, PNG, and React component formats. Includes categories for UI, social, commerce, media, and more. Regular updates add new icons monthly.",
    price: 29.0,
    type: "digital",
    digitalSubtype: "download",
    status: "active",
    category: "Design Assets",
    images: ["/products/icons-preview.svg"],
    imageBg: "bg-gradient-to-br from-emerald-50 to-teal-100",
    stock: 999,
    totalSales: 3210,
    rating: 4.9,
    reviewCount: 445,
    features: [
      "1,200+ Icons",
      "SVG, PNG, React",
      "Monthly Updates",
      "Commercial License",
      "Figma Plugin",
    ],
    fileSize: "48 MB",
    fileFormat: ".svg, .png, .tsx",
    createdAt: "2025-02-14",
  },
  {
    id: "prod_007",
    name: "SaaS Starter Kit",
    description: "Production-ready Next.js boilerplate with auth, billing, and admin.",
    longDescription:
      "Ship your SaaS faster. This starter kit includes authentication (NextAuth), Stripe billing integration, admin dashboard, email templates, database setup (Prisma), and deployment configs. Built with Next.js 14, TypeScript, and Tailwind CSS.",
    price: 149.0,
    type: "digital",
    digitalSubtype: "code",
    status: "active",
    category: "Software",
    images: ["/products/saas-preview.svg"],
    imageBg: "bg-gradient-to-br from-sky-50 to-cyan-100",
    stock: 999,
    totalSales: 924,
    rating: 4.8,
    reviewCount: 156,
    features: [
      "NextAuth Integration",
      "Stripe Billing",
      "Admin Dashboard",
      "Email Templates",
      "Prisma ORM",
    ],
    fileSize: "12 MB",
    fileFormat: ".zip (source code)",
    licenseType: "Single Developer",
    createdAt: "2025-04-02",
  },
  {
    id: "prod_009",
    name: "Photography Preset Pack",
    description: "50 professional Lightroom presets for landscape & portrait.",
    longDescription:
      "Transform your photos with 50 professionally crafted Lightroom presets. Includes categories for landscape, portrait, street, moody, and film-inspired looks. Compatible with Lightroom Classic, Lightroom CC, and Adobe Camera Raw. Detailed installation guide included.",
    price: 35.0,
    compareAtPrice: 59.0,
    type: "digital",
    digitalSubtype: "file",
    status: "active",
    category: "Creative Tools",
    images: ["/products/presets-preview.svg"],
    imageBg: "bg-gradient-to-br from-rose-50 to-pink-100",
    stock: 999,
    totalSales: 2100,
    rating: 4.6,
    reviewCount: 203,
    features: [
      "50 Presets",
      "Lightroom Compatible",
      "5 Categories",
      "One-Click Apply",
      "RAW Support",
    ],
    fileSize: "15 MB",
    fileFormat: ".xmp, .lrtemplate",
    createdAt: "2025-09-05",
  },
  {
    id: "prod_011",
    name: "Notion Template Bundle",
    description: "All-in-one Notion workspace: CRM, projects, habits, finance.",
    longDescription:
      "Supercharge your Notion with this all-in-one template bundle. Includes a full CRM system, project management board, habit tracker, finance dashboard, content calendar, and reading list. Duplicate into your workspace with one click. Lifetime updates included.",
    price: 19.0,
    type: "digital",
    digitalSubtype: "file",
    status: "active",
    category: "Productivity",
    images: ["/products/notion-preview.svg"],
    imageBg: "bg-gradient-to-br from-orange-50 to-amber-100",
    stock: 999,
    totalSales: 4500,
    rating: 4.8,
    reviewCount: 534,
    features: [
      "6 Template Systems",
      "One-Click Duplicate",
      "Lifetime Updates",
      "Mobile Friendly",
      "Video Tutorials",
    ],
    fileSize: "Notion Link",
    fileFormat: "Notion Template",
    createdAt: "2025-01-08",
  },
];

// ============================================================================
// Orders
// ============================================================================

export const orders: Order[] = [
  {
    id: "ORD-7291",
    customer: "Olivia Martin",
    email: "olivia.martin@email.com",
    items: [
      { productId: "prod_002", productName: "Pro UI Kit Bundle", quantity: 1, price: 49.0, type: "digital" },
      { productId: "prod_005", productName: "Developer Icons Pack", quantity: 1, price: 29.0, type: "digital" },
    ],
    total: 78.0,
    status: "paid",
    deliveryStatus: "downloaded",
    date: "2026-01-28",
    downloadCount: 4,
  },
  {
    id: "ORD-7292",
    customer: "Jackson Lee",
    email: "jackson.lee@email.com",
    items: [
      { productId: "prod_002", productName: "Pro UI Kit Bundle", quantity: 1, price: 49.0, type: "digital" },
    ],
    total: 49.0,
    status: "paid",
    deliveryStatus: "downloaded",
    date: "2026-01-27",
    downloadCount: 3,
  },
  {
    id: "ORD-7293",
    customer: "Isabella Nguyen",
    email: "isabella.nguyen@email.com",
    items: [
      { productId: "prod_003", productName: "Annual Software License", quantity: 1, price: 199.0, type: "digital" },
    ],
    total: 199.0,
    status: "paid",
    deliveryStatus: "emailed",
    date: "2026-01-26",
    licenseKey: "XXXX-XXXX-XXXX-9A3F",
  },
  {
    id: "ORD-7294",
    customer: "Liam Johnson",
    email: "liam@example.com",
    items: [
      { productId: "prod_007", productName: "SaaS Starter Kit", quantity: 1, price: 149.0, type: "digital" },
      { productId: "prod_011", productName: "Notion Template Bundle", quantity: 1, price: 19.0, type: "digital" },
    ],
    total: 168.0,
    status: "paid",
    deliveryStatus: "downloaded",
    date: "2026-01-25",
    downloadCount: 2,
  },
  {
    id: "ORD-7295",
    customer: "Emma Brown",
    email: "emma@example.com",
    items: [
      { productId: "prod_007", productName: "SaaS Starter Kit", quantity: 1, price: 149.0, type: "digital" },
    ],
    total: 149.0,
    status: "paid",
    deliveryStatus: "downloaded",
    date: "2026-01-24",
    downloadCount: 1,
  },
  {
    id: "ORD-7296",
    customer: "Noah Williams",
    email: "noah.w@example.com",
    items: [
      { productId: "prod_009", productName: "Photography Preset Pack", quantity: 1, price: 35.0, type: "digital" },
      { productId: "prod_003", productName: "Annual Software License", quantity: 1, price: 199.0, type: "digital" },
    ],
    total: 234.0,
    status: "paid",
    deliveryStatus: "downloaded",
    date: "2026-01-23",
    downloadCount: 3,
  },
  {
    id: "ORD-7297",
    customer: "Sophia Garcia",
    email: "sophia.g@example.com",
    items: [
      { productId: "prod_005", productName: "Developer Icons Pack", quantity: 1, price: 29.0, type: "digital" },
      { productId: "prod_011", productName: "Notion Template Bundle", quantity: 1, price: 19.0, type: "digital" },
    ],
    total: 48.0,
    status: "paid",
    deliveryStatus: "downloaded",
    date: "2026-01-22",
    downloadCount: 5,
  },
  {
    id: "ORD-7298",
    customer: "Ethan Davis",
    email: "ethan.d@example.com",
    items: [
      { productId: "prod_002", productName: "Pro UI Kit Bundle", quantity: 1, price: 49.0, type: "digital" },
    ],
    total: 49.0,
    status: "paid",
    deliveryStatus: "downloaded",
    date: "2026-01-21",
    downloadCount: 2,
  },
  {
    id: "ORD-7299",
    customer: "Ava Martinez",
    email: "ava.m@example.com",
    items: [
      { productId: "prod_009", productName: "Photography Preset Pack", quantity: 1, price: 35.0, type: "digital" },
    ],
    total: 35.0,
    status: "refunded",
    deliveryStatus: "downloaded",
    date: "2026-01-20",
    downloadCount: 2,
  },
  {
    id: "ORD-7300",
    customer: "Mason Rodriguez",
    email: "mason.r@example.com",
    items: [
      { productId: "prod_003", productName: "Annual Software License", quantity: 1, price: 199.0, type: "digital" },
      { productId: "prod_002", productName: "Pro UI Kit Bundle", quantity: 1, price: 49.0, type: "digital" },
    ],
    total: 248.0,
    status: "paid",
    deliveryStatus: "downloaded",
    date: "2026-01-19",
    downloadCount: 1,
  },
];

// ============================================================================
// Customers
// ============================================================================

export const customers: Customer[] = [
  {
    id: "cust_001",
    name: "Olivia Martin",
    email: "olivia.martin@email.com",
    avatar: "/avatars/01.png",
    initials: "OM",
    joinedAt: "2024-01-15",
    totalSpent: 2400.0,
    orderCount: 8,
    lastOrder: "2026-01-28",
    status: "active",
  },
  {
    id: "cust_002",
    name: "Jackson Lee",
    email: "jackson.lee@email.com",
    avatar: "/avatars/02.png",
    initials: "JL",
    joinedAt: "2024-02-10",
    totalSpent: 1250.0,
    orderCount: 5,
    lastOrder: "2026-01-27",
    status: "active",
  },
  {
    id: "cust_003",
    name: "Isabella Nguyen",
    email: "isabella.nguyen@email.com",
    avatar: "/avatars/03.png",
    initials: "IN",
    joinedAt: "2024-03-22",
    totalSpent: 450.0,
    orderCount: 3,
    lastOrder: "2026-01-26",
    status: "active",
  },
  {
    id: "cust_004",
    name: "Liam Johnson",
    email: "liam@example.com",
    avatar: "/avatars/04.png",
    initials: "LJ",
    joinedAt: "2024-04-05",
    totalSpent: 1890.0,
    orderCount: 12,
    lastOrder: "2026-01-25",
    status: "active",
  },
  {
    id: "cust_005",
    name: "Emma Brown",
    email: "emma@example.com",
    avatar: "/avatars/05.png",
    initials: "EB",
    joinedAt: "2024-05-18",
    totalSpent: 780.0,
    orderCount: 4,
    lastOrder: "2026-01-24",
    status: "active",
  },
  {
    id: "cust_006",
    name: "Noah Williams",
    email: "noah.w@example.com",
    avatar: "/avatars/06.png",
    initials: "NW",
    joinedAt: "2024-06-01",
    totalSpent: 356.0,
    orderCount: 2,
    lastOrder: "2026-01-23",
    status: "active",
  },
  {
    id: "cust_007",
    name: "Sophia Garcia",
    email: "sophia.g@example.com",
    avatar: "/avatars/07.png",
    initials: "SG",
    joinedAt: "2024-07-14",
    totalSpent: 1240.0,
    orderCount: 7,
    lastOrder: "2026-01-22",
    status: "active",
  },
  {
    id: "cust_008",
    name: "Ethan Davis",
    email: "ethan.d@example.com",
    avatar: "/avatars/08.png",
    initials: "ED",
    joinedAt: "2024-08-20",
    totalSpent: 520.0,
    orderCount: 3,
    lastOrder: "2026-01-21",
    status: "inactive",
  },
  {
    id: "cust_009",
    name: "Ava Martinez",
    email: "ava.m@example.com",
    avatar: "/avatars/09.png",
    initials: "AM",
    joinedAt: "2024-09-10",
    totalSpent: 185.0,
    orderCount: 2,
    lastOrder: "2026-01-20",
    status: "active",
  },
  {
    id: "cust_010",
    name: "Mason Rodriguez",
    email: "mason.r@example.com",
    avatar: "/avatars/10.png",
    initials: "MR",
    joinedAt: "2024-10-03",
    totalSpent: 697.0,
    orderCount: 4,
    lastOrder: "2026-01-19",
    status: "active",
  },
];

// ============================================================================
// Helpers
// ============================================================================

export function getProduct(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductsByType(type: ProductType): Product[] {
  return products.filter((p) => p.type === type);
}

export function getActiveProducts(): Product[] {
  return products.filter((p) => p.status === "active");
}

export function getDigitalProducts(): Product[] {
  return products.filter((p) => p.type === "digital" && p.status === "active");
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}

export function getOrderStatusColor(status: OrderStatus): string {
  const map: Record<OrderStatus, string> = {
    pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
    paid: "bg-blue-100 text-blue-800 border-blue-200",
    fulfilled: "bg-green-100 text-green-800 border-green-200",
    refunded: "bg-red-100 text-red-800 border-red-200",
    cancelled: "bg-gray-100 text-gray-800 border-gray-200",
  };
  return map[status];
}

export function getDeliveryStatusColor(status: DeliveryStatus): string {
  const map: Record<DeliveryStatus, string> = {
    pending: "bg-yellow-100 text-yellow-800",
    shipped: "bg-blue-100 text-blue-800",
    delivered: "bg-green-100 text-green-800",
    downloaded: "bg-emerald-100 text-emerald-800",
    emailed: "bg-purple-100 text-purple-800",
  };
  return map[status];
}

// ============================================================================
// Chart Data
// ============================================================================

export const revenueChartData = [
  { name: "Jan", downloads: 2400, licenses: 1200, total: 3600 },
  { name: "Feb", downloads: 3100, licenses: 1800, total: 4900 },
  { name: "Mar", downloads: 3800, licenses: 2100, total: 5900 },
  { name: "Apr", downloads: 4200, licenses: 2500, total: 6700 },
  { name: "May", downloads: 4800, licenses: 3200, total: 8000 },
  { name: "Jun", downloads: 5500, licenses: 3800, total: 9300 },
  { name: "Jul", downloads: 6100, licenses: 4200, total: 10300 },
  { name: "Aug", downloads: 6800, licenses: 4600, total: 11400 },
  { name: "Sep", downloads: 7200, licenses: 5100, total: 12300 },
  { name: "Oct", downloads: 8100, licenses: 5800, total: 13900 },
  { name: "Nov", downloads: 9200, licenses: 6500, total: 15700 },
  { name: "Dec", downloads: 10400, licenses: 7100, total: 17500 },
];

export const categoryChartData = [
  { name: "Electronics", value: 1246, fill: "hsl(var(--chart-1))" },
  { name: "Design Assets", value: 5060, fill: "hsl(var(--chart-2))" },
  { name: "Software", value: 1680, fill: "hsl(var(--chart-3))" },
  { name: "Home Office", value: 979, fill: "hsl(var(--chart-4))" },
  { name: "Other", value: 6600, fill: "hsl(var(--chart-5))" },
];
