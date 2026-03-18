"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
    ArrowLeft,
    Upload,
    ImagePlus,
    X,
    Plus,
    Bold,
    Italic,
    Underline,
    Heading1,
    Heading2,
    Heading3,
    List,
    ListOrdered,
    LinkIcon,
    Table,
    Code,
    Omega,
    Flag,
} from "lucide-react";

const categories = [
    "Design Assets",
    "Software",
    "Creative Tools",
    "Productivity",
    "Templates",
    "Development",
];

export default function AddProductPage() {
    const [tags, setTags] = useState<string[]>(["digital", "template"]);
    const [tagInput, setTagInput] = useState("");
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [catInput, setCatInput] = useState("");

    const addTag = () => {
        if (tagInput.trim() && !tags.includes(tagInput.trim())) {
            setTags([...tags, tagInput.trim()]);
            setTagInput("");
        }
    };

    const removeTag = (tag: string) => {
        setTags(tags.filter((t) => t !== tag));
    };

    const addCategory = () => {
        if (catInput.trim() && !selectedCategories.includes(catInput.trim())) {
            setSelectedCategories([...selectedCategories, catInput.trim()]);
            setCatInput("");
        }
    };

    const removeCategory = (cat: string) => {
        setSelectedCategories(selectedCategories.filter((c) => c !== cat));
    };

    return (
        <div className="flex flex-col gap-6">
            {/* Top Bar */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/admin/products">
                        <Button variant="ghost" size="icon" className="rounded-full">
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                    </Link>
                    <h1 className="text-xl font-semibold tracking-tight">Add Product</h1>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="rounded-full">
                        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="12" y1="16" x2="12" y2="12" />
                            <line x1="12" y1="8" x2="12.01" y2="8" />
                        </svg>
                    </Button>
                    <Button className="rounded-lg bg-sky-500 hover:bg-sky-600 text-white px-6">
                        Add Product
                    </Button>
                </div>
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column — 2/3 */}
                <div className="lg:col-span-2 flex flex-col gap-6">
                    {/* General */}
                    <Card className="rounded-2xl">
                        <CardHeader>
                            <CardTitle className="text-lg">General</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-5">
                            <div className="space-y-2">
                                <Label htmlFor="product-name">
                                    Product Name <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="product-name"
                                    placeholder="Product Name"
                                    className="h-11"
                                />
                                <p className="text-xs text-muted-foreground">
                                    A product name is required and recommended to be unique.
                                </p>
                            </div>

                            <div className="space-y-2">
                                <Label>Description</Label>
                                {/* Toolbar */}
                                <div className="rounded-lg border bg-muted/30 p-1 flex items-center gap-0.5 flex-wrap">
                                    <ToolbarButton><Bold className="h-4 w-4" /></ToolbarButton>
                                    <ToolbarButton><Italic className="h-4 w-4" /></ToolbarButton>
                                    <ToolbarButton><Underline className="h-4 w-4" /></ToolbarButton>
                                    <ToolbarDivider />
                                    <ToolbarButton>
                                        <span className="text-xs font-bold">H1</span>
                                    </ToolbarButton>
                                    <ToolbarButton>
                                        <span className="text-xs font-bold">H2</span>
                                    </ToolbarButton>
                                    <ToolbarButton>
                                        <span className="text-xs font-bold">H3</span>
                                    </ToolbarButton>
                                    <ToolbarDivider />
                                    <ToolbarButton><List className="h-4 w-4" /></ToolbarButton>
                                    <ToolbarButton><ListOrdered className="h-4 w-4" /></ToolbarButton>
                                    <ToolbarButton><LinkIcon className="h-4 w-4" /></ToolbarButton>
                                    <ToolbarButton><Table className="h-4 w-4" /></ToolbarButton>
                                    <ToolbarButton><Code className="h-4 w-4" /></ToolbarButton>
                                    <ToolbarButton><Omega className="h-4 w-4" /></ToolbarButton>
                                    <ToolbarButton><Flag className="h-4 w-4" /></ToolbarButton>
                                </div>
                                <Textarea
                                    placeholder="Start typing..."
                                    rows={6}
                                    className="resize-none"
                                />
                                <p className="text-xs text-muted-foreground">
                                    <strong>Output</strong>
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    Set a description to the product for better visibility.
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Media */}
                    <Card className="rounded-2xl">
                        <CardHeader>
                            <CardTitle className="text-lg">Media</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="border-2 border-dashed border-border rounded-xl p-10 flex flex-col items-center justify-center gap-3 bg-muted/20 hover:bg-muted/40 transition-colors cursor-pointer">
                                <div className="h-12 w-12 rounded-xl bg-muted/60 flex items-center justify-center">
                                    <Upload className="h-6 w-6 text-muted-foreground" />
                                </div>
                                <div className="text-center">
                                    <p className="font-semibold">Upload file</p>
                                    <p className="text-sm text-muted-foreground">
                                        Drag or drop your files here or click to upload
                                    </p>
                                </div>
                            </div>

                            {/* Mock uploaded files */}
                            <div className="mt-4 flex gap-3">
                                <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-100 border flex items-center justify-center relative group">
                                    <span className="text-[10px] text-muted-foreground">.fig</span>
                                    <button className="absolute -top-1.5 -right-1.5 h-5 w-5 rounded-full bg-red-500 text-white items-center justify-center text-xs hidden group-hover:flex">
                                        <X className="h-3 w-3" />
                                    </button>
                                </div>
                                <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-purple-50 to-violet-100 border flex items-center justify-center relative group">
                                    <span className="text-[10px] text-muted-foreground">.zip</span>
                                    <button className="absolute -top-1.5 -right-1.5 h-5 w-5 rounded-full bg-red-500 text-white items-center justify-center text-xs hidden group-hover:flex">
                                        <X className="h-3 w-3" />
                                    </button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Pricing */}
                    <Card className="rounded-2xl">
                        <CardHeader>
                            <CardTitle className="text-lg">Pricing</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="price">
                                        Base Price <span className="text-red-500">*</span>
                                    </Label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">$</span>
                                        <Input
                                            id="price"
                                            type="number"
                                            placeholder="0.00"
                                            className="pl-7 h-11"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="compare-price">Compare-at Price</Label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">$</span>
                                        <Input
                                            id="compare-price"
                                            type="number"
                                            placeholder="0.00"
                                            className="pl-7 h-11"
                                        />
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        Set a compare-at price to show a sale badge.
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Digital Delivery */}
                    <Card className="rounded-2xl">
                        <CardHeader>
                            <CardTitle className="text-lg">Digital Delivery</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label>Digital Product Type</Label>
                                <Select defaultValue="download">
                                    <SelectTrigger className="h-11">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="download">Downloadable File</SelectItem>
                                        <SelectItem value="license_key">License Key</SelectItem>
                                        <SelectItem value="code">Source Code</SelectItem>
                                        <SelectItem value="file">Digital File</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="file-size">File Size</Label>
                                    <Input id="file-size" placeholder="e.g. 285 MB" className="h-11" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="file-format">File Format</Label>
                                    <Input id="file-format" placeholder="e.g. .fig, .sketch" className="h-11" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="license-type">License Type</Label>
                                <Input id="license-type" placeholder="e.g. Single Developer, Commercial" className="h-11" />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column — 1/3 */}
                <div className="flex flex-col gap-6">
                    {/* Thumbnail */}
                    <Card className="rounded-2xl">
                        <CardHeader>
                            <CardTitle className="text-lg">Thumbnail</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="border-2 border-dashed border-sky-300 rounded-xl p-8 flex flex-col items-center justify-center gap-3 bg-sky-50/50 hover:bg-sky-50 transition-colors cursor-pointer">
                                <div className="h-10 w-10 rounded-full flex items-center justify-center">
                                    <ImagePlus className="h-6 w-6 text-sky-500" />
                                </div>
                                <p className="text-sm font-medium text-sky-700 text-center">
                                    Drop Thumbnail here to upload
                                </p>
                            </div>
                            <p className="text-xs text-muted-foreground mt-3">
                                Set the product thumbnail image. Only *.png, *.jpg and *.jpeg image files are accepted.
                            </p>
                        </CardContent>
                    </Card>

                    {/* Status */}
                    <Card className="rounded-2xl">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-lg">Status</CardTitle>
                                <div className="h-3 w-3 rounded-full bg-emerald-400" />
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label>
                                    Tax Class <span className="text-red-500">*</span>
                                </Label>
                                <Select defaultValue="publish">
                                    <SelectTrigger className="h-11">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="publish">Publish</SelectItem>
                                        <SelectItem value="draft">Draft</SelectItem>
                                        <SelectItem value="archived">Archived</SelectItem>
                                    </SelectContent>
                                </Select>
                                <p className="text-xs text-muted-foreground">
                                    Set the product status.
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Product Details */}
                    <Card className="rounded-2xl">
                        <CardHeader>
                            <CardTitle className="text-lg">Product Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-5">
                            {/* Categories */}
                            <div className="space-y-2">
                                <Label>
                                    Categories <span className="text-red-500">*</span>
                                </Label>
                                <div className="flex gap-2">
                                    <Select
                                        value={catInput}
                                        onValueChange={(v) => {
                                            if (!selectedCategories.includes(v)) {
                                                setSelectedCategories([...selectedCategories, v]);
                                            }
                                        }}
                                    >
                                        <SelectTrigger className="h-11">
                                            <SelectValue placeholder="Select a category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {categories.map((cat) => (
                                                <SelectItem key={cat} value={cat}>
                                                    {cat}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    Add product to a category.
                                </p>
                                {selectedCategories.length > 0 && (
                                    <div className="flex flex-wrap gap-2">
                                        {selectedCategories.map((cat) => (
                                            <Badge
                                                key={cat}
                                                variant="secondary"
                                                className="rounded-full gap-1 pr-1.5"
                                            >
                                                {cat}
                                                <button
                                                    onClick={() => removeCategory(cat)}
                                                    className="ml-0.5 h-4 w-4 rounded-full hover:bg-muted flex items-center justify-center"
                                                >
                                                    <X className="h-3 w-3" />
                                                </button>
                                            </Badge>
                                        ))}
                                    </div>
                                )}
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-sky-600 hover:text-sky-700 hover:bg-sky-50 gap-1 px-2 h-8"
                                    onClick={() => {
                                        const next = categories.find(
                                            (c) => !selectedCategories.includes(c)
                                        );
                                        if (next) setSelectedCategories([...selectedCategories, next]);
                                    }}
                                >
                                    <Plus className="h-3.5 w-3.5" />
                                    Add selected category
                                </Button>
                            </div>

                            <Separator />

                            {/* Tags */}
                            <div className="space-y-2">
                                <Label>Tags</Label>
                                <div className="flex gap-2">
                                    <Input
                                        placeholder="Add a tag"
                                        value={tagInput}
                                        onChange={(e) => setTagInput(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                e.preventDefault();
                                                addTag();
                                            }
                                        }}
                                        className="h-9"
                                    />
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={addTag}
                                        className="h-9 px-3"
                                    >
                                        Add
                                    </Button>
                                </div>
                                {tags.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {tags.map((tag) => (
                                            <Badge
                                                key={tag}
                                                variant="outline"
                                                className="rounded-full gap-1 pr-1.5"
                                            >
                                                {tag}
                                                <button
                                                    onClick={() => removeTag(tag)}
                                                    className="ml-0.5 h-4 w-4 rounded-full hover:bg-muted flex items-center justify-center"
                                                >
                                                    <X className="h-3 w-3" />
                                                </button>
                                            </Badge>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Features */}
                    <Card className="rounded-2xl">
                        <CardHeader>
                            <CardTitle className="text-lg">Features</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                {[1, 2, 3].map((i) => (
                                    <Input
                                        key={i}
                                        placeholder={`Feature ${i}`}
                                        className="h-10"
                                    />
                                ))}
                                <Button variant="ghost" size="sm" className="text-sky-600 hover:text-sky-700 hover:bg-sky-50 gap-1 px-2 h-8 mt-1">
                                    <Plus className="h-3.5 w-3.5" />
                                    Add feature
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

/* ─── tiny helpers ─── */

function ToolbarButton({ children }: { children: React.ReactNode }) {
    return (
        <button
            type="button"
            className="h-8 w-8 rounded-md flex items-center justify-center text-muted-foreground hover:bg-background hover:text-foreground transition-colors"
        >
            {children}
        </button>
    );
}

function ToolbarDivider() {
    return <div className="w-px h-5 bg-border mx-0.5" />;
}
