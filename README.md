# Salla Store

A modern **digital-products e-commerce app** with a full **admin dashboard**, built with Next.js App Router, React, TypeScript, Tailwind CSS, and shadcn/ui.

## What this app includes

### Storefront
- Animated homepage with hero, featured products, categories, and CTA sections
- Product listing and product detail pages
- Digital-only catalog (downloads, license keys, source code, files)
- Cart sheet (drawer) with live totals and checkout flow
- Checkout success and empty states

### Localization & Currency
- Language switcher: **English / Arabic**
- Direction switch: **LTR / RTL**
- Currency switcher: **USD / OMR**
- OMR symbol rendered using custom SVG icon
- Shared `PriceTag` renderer for consistent pricing UI

### Admin Dashboard
- Overview page with KPI cards and charts
- Products management table + add product page
- Orders management with status/delivery indicators
- Customers management table and stats
- Settings sections (General, Payments, Digital, Notifications)

## Tech stack

- Next.js `16.1.6` (App Router)
- React `19.2.3`
- TypeScript
- Tailwind CSS + shadcn/ui
- Framer Motion
- Recharts
- Lucide icons

## Project routes

### Store routes
- `/`
- `/products`
- `/digital`
- `/product/[id]`
- `/checkout`

### Admin routes
- `/admin`
- `/admin/products`
- `/admin/products/new`
- `/admin/orders`
- `/admin/customers`
- `/admin/settings`

## How to run locally

### 1) Prerequisites
- Node.js (recommended: **20+**)
- npm

### 2) Install dependencies
```bash
npm install
```

### 3) Start development server
```bash
npm run dev
```

Open:
- http://localhost:3000 (store)
- http://localhost:3000/admin (dashboard)

### 4) Production build
```bash
npm run build
npm run start
```

### 5) Lint
```bash
npm run lint
```

## Notes

- Current data is mock/in-memory (no database required).
- No required `.env` variables for the current setup.

