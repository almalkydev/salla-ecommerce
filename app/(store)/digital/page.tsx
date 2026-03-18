"use client";

import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Download, Key, FileCode, FileText } from "lucide-react";
import { getDigitalProducts, type Product, type DigitalSubtype } from "@/lib/data";
import { ProductCard } from "@/components/product-card";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations";

const subtypeLabels: Record<DigitalSubtype, { label: string; icon: React.ReactNode }> = {
  download: { label: "Downloads", icon: <Download className="h-3.5 w-3.5" /> },
  license_key: { label: "License Keys", icon: <Key className="h-3.5 w-3.5" /> },
  code: { label: "Source Code", icon: <FileCode className="h-3.5 w-3.5" /> },
  file: { label: "Files", icon: <FileText className="h-3.5 w-3.5" /> },
};

export default function DigitalPage() {
  const [search, setSearch] = useState("");
  const [subtype, setSubtype] = useState("all");

  const allDigital = getDigitalProducts();

  const filtered = useMemo(() => {
    let result: Product[] = allDigital;

    if (subtype !== "all") {
      result = result.filter((p) => p.digitalSubtype === subtype);
    }

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
  }, [allDigital, subtype, search]);

  return (
    <div className="container px-4 md:px-6 py-10">
      <FadeIn>
        <div className="flex flex-col gap-1 mb-2">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold tracking-tight">Digital Products</h1>
            <Badge variant="secondary" className="rounded-full">
              {allDigital.length} items
            </Badge>
          </div>
          <p className="text-muted-foreground">
            Instant downloads, license keys, source code, and digital files.
          </p>
        </div>
      </FadeIn>

      {/* Stats */}
      <FadeIn delay={0.1}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-8">
          {(Object.entries(subtypeLabels) as [DigitalSubtype, { label: string; icon: React.ReactNode }][]).map(
            ([key, { label, icon }]) => {
              const count = allDigital.filter((p) => p.digitalSubtype === key).length;
              return (
                <button
                  key={key}
                  onClick={() => setSubtype(subtype === key ? "all" : key)}
                  className={`flex items-center gap-3 rounded-xl border p-4 transition-all hover:shadow-sm ${
                    subtype === key
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-card border-border"
                  }`}
                >
                  <div
                    className={`h-9 w-9 rounded-lg flex items-center justify-center ${
                      subtype === key
                        ? "bg-primary-foreground/20"
                        : "bg-foreground/5 border border-foreground/10"
                    }`}
                  >
                    {icon}
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium">{label}</p>
                    <p className={`text-xs ${subtype === key ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                      {count} {count === 1 ? "item" : "items"}
                    </p>
                  </div>
                </button>
              );
            }
          )}
        </div>
      </FadeIn>

      <FadeIn delay={0.15}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <Tabs value={subtype} onValueChange={setSubtype}>
            <TabsList>
              <TabsTrigger value="all">All Digital</TabsTrigger>
              <TabsTrigger value="download">Downloads</TabsTrigger>
              <TabsTrigger value="license_key">Licenses</TabsTrigger>
              <TabsTrigger value="code">Code</TabsTrigger>
              <TabsTrigger value="file">Files</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search digital products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>
      </FadeIn>

      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-muted-foreground text-lg">No digital products found.</p>
          <p className="text-sm text-muted-foreground mt-1">Try adjusting your filter or search.</p>
        </div>
      ) : (
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((product) => (
            <StaggerItem key={product.id}>
              <ProductCard product={product} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      )}
    </div>
  );
}
