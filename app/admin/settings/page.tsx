import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Store, CreditCard, Download, Bell, Shield } from "lucide-react"

export default function SettingsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-2xl font-semibold tracking-tight">Settings</h3>
                <p className="text-sm text-muted-foreground">
                    Manage your store preferences and configuration.
                </p>
            </div>
            <Separator />

            <Tabs defaultValue="general" className="space-y-6">
                <TabsList>
                    <TabsTrigger value="general" className="gap-1.5">
                        <Store className="h-3.5 w-3.5" /> General
                    </TabsTrigger>
                    <TabsTrigger value="payments" className="gap-1.5">
                        <CreditCard className="h-3.5 w-3.5" /> Payments
                    </TabsTrigger>
                    <TabsTrigger value="digital" className="gap-1.5">
                        <Download className="h-3.5 w-3.5" /> Digital
                    </TabsTrigger>
                    <TabsTrigger value="notifications" className="gap-1.5">
                        <Bell className="h-3.5 w-3.5" /> Notifications
                    </TabsTrigger>
                </TabsList>

                {/* General Tab */}
                <TabsContent value="general">
                    <div className="grid gap-6 lg:max-w-2xl">
                        <Card>
                            <CardHeader>
                                <CardTitle>Store Information</CardTitle>
                                <CardDescription>Basic information about your store.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="store-name">Store Name</Label>
                                    <Input id="store-name" defaultValue="Salla Store" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="store-url">Store URL</Label>
                                    <Input id="store-url" defaultValue="https://salla.store" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="store-description">Description</Label>
                                    <Textarea
                                        id="store-description"
                                        defaultValue="Premium digital assets and templates marketplace."
                                        rows={3}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="support-email">Support Email</Label>
                                    <Input id="support-email" type="email" defaultValue="support@salla.store" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="timezone">Timezone</Label>
                                    <Select defaultValue="utc-8">
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="utc-8">Pacific Time (UTC-8)</SelectItem>
                                            <SelectItem value="utc-5">Eastern Time (UTC-5)</SelectItem>
                                            <SelectItem value="utc+0">UTC</SelectItem>
                                            <SelectItem value="utc+1">Central European (UTC+1)</SelectItem>
                                            <SelectItem value="utc+8">China Standard (UTC+8)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <Button>Save Changes</Button>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <div className="flex items-center gap-2">
                                    <Shield className="h-5 w-5 text-muted-foreground" />
                                    <div>
                                        <CardTitle>Security</CardTitle>
                                        <CardDescription>Security and access settings.</CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <Label>Two-Factor Authentication</Label>
                                        <p className="text-xs text-muted-foreground">
                                            Add an extra layer of security to your account.
                                        </p>
                                    </div>
                                    <Switch defaultChecked />
                                </div>
                                <Separator />
                                <div className="flex items-center justify-between">
                                    <div>
                                        <Label>Login Notifications</Label>
                                        <p className="text-xs text-muted-foreground">
                                            Get notified of new login attempts.
                                        </p>
                                    </div>
                                    <Switch defaultChecked />
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                {/* Payments Tab */}
                <TabsContent value="payments">
                    <div className="grid gap-6 lg:max-w-2xl">
                        <Card>
                            <CardHeader>
                                <CardTitle>Payment Gateway</CardTitle>
                                <CardDescription>Configure payment processing.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="gateway">Payment Provider</Label>
                                    <Select defaultValue="stripe">
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="stripe">Stripe</SelectItem>
                                            <SelectItem value="paypal">PayPal</SelectItem>
                                            <SelectItem value="square">Square</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="api-key">API Key</Label>
                                    <Input id="api-key" type="password" defaultValue="sk_test_••••••••••••••••" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="currency">Currency</Label>
                                    <Select defaultValue="usd">
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="usd">USD ($)</SelectItem>
                                            <SelectItem value="eur">EUR (€)</SelectItem>
                                            <SelectItem value="gbp">GBP (£)</SelectItem>
                                            <SelectItem value="jpy">JPY (¥)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <Label>Test Mode</Label>
                                        <p className="text-xs text-muted-foreground">
                                            Process payments in test mode.
                                        </p>
                                    </div>
                                    <Switch defaultChecked />
                                </div>
                                <Button>Save Payment Settings</Button>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                {/* Digital Tab */}
                <TabsContent value="digital">
                    <div className="grid gap-6 lg:max-w-2xl">
                        <Card>
                            <CardHeader>
                                <CardTitle>Digital Product Settings</CardTitle>
                                <CardDescription>Configure delivery for digital products, downloads, and license keys.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="download-limit">Download Limit per Purchase</Label>
                                    <Input id="download-limit" type="number" defaultValue="5" />
                                    <p className="text-xs text-muted-foreground">
                                        Maximum number of times a customer can download a purchased file.
                                    </p>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="link-expiry">Download Link Expiry (hours)</Label>
                                    <Input id="link-expiry" type="number" defaultValue="72" />
                                </div>
                                <Separator />
                                <div className="flex items-center justify-between">
                                    <div>
                                        <Label>Auto-Deliver License Keys</Label>
                                        <p className="text-xs text-muted-foreground">
                                            Automatically email license keys after payment.
                                        </p>
                                    </div>
                                    <Switch defaultChecked />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <Label>Instant Download</Label>
                                        <p className="text-xs text-muted-foreground">
                                            Allow downloads immediately after payment confirmation.
                                        </p>
                                    </div>
                                    <Switch defaultChecked />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <Label>Watermark Downloads</Label>
                                        <p className="text-xs text-muted-foreground">
                                            Add customer email watermark to downloadable files.
                                        </p>
                                    </div>
                                    <Switch />
                                </div>
                                <Button variant="secondary">Update Digital Settings</Button>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                {/* Notifications Tab */}
                <TabsContent value="notifications">
                    <div className="grid gap-6 lg:max-w-2xl">
                        <Card>
                            <CardHeader>
                                <CardTitle>Email Notifications</CardTitle>
                                <CardDescription>Configure which email notifications you receive.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <Label>New Order</Label>
                                        <p className="text-xs text-muted-foreground">Receive email for every new order.</p>
                                    </div>
                                    <Switch defaultChecked />
                                </div>
                                <Separator />
                                <div className="flex items-center justify-between">
                                    <div>
                                        <Label>New Customer</Label>
                                        <p className="text-xs text-muted-foreground">Receive email when a new customer signs up.</p>
                                    </div>
                                    <Switch defaultChecked />
                                </div>
                                <Separator />
                                <div className="flex items-center justify-between">
                                    <div>
                                        <Label>Refund Requests</Label>
                                        <p className="text-xs text-muted-foreground">Receive email for refund requests.</p>
                                    </div>
                                    <Switch defaultChecked />
                                </div>
                                <Separator />
                                <div className="flex items-center justify-between">
                                    <div>
                                        <Label>Download Limit Alerts</Label>
                                        <p className="text-xs text-muted-foreground">
                                            Get notified when product download limits are reached.
                                        </p>
                                    </div>
                                    <Switch defaultChecked />
                                </div>
                                <Separator />
                                <div className="flex items-center justify-between">
                                    <div>
                                        <Label>Download Activity</Label>
                                        <p className="text-xs text-muted-foreground">
                                            Receive digest of digital product download activity.
                                        </p>
                                    </div>
                                    <Switch />
                                </div>
                                <Separator />
                                <div className="flex items-center justify-between">
                                    <div>
                                        <Label>Weekly Summary</Label>
                                        <p className="text-xs text-muted-foreground">
                                            Receive a weekly summary of store performance.
                                        </p>
                                    </div>
                                    <Switch defaultChecked />
                                </div>
                                <Button>Save Notification Preferences</Button>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}
