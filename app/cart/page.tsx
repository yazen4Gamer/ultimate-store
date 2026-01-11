"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Minus, Plus, Trash2, ShoppingCart, Gamepad2, ArrowRight, Tag, Shield, Clock, Mail } from "lucide-react";
import { toast } from "sonner";

// ✅ added
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface CartItem {
  id: number;
  title: string;
  category: string;
  price: number;
  discount: number;
  quantity: number;
  image: string;
  platform: string;
}

const initialCartItems: CartItem[] = [
  {
    id: 1,
    title: "Cyberpunk 2077",
    category: "Action RPG",
    price: 49.99,
    discount: 20,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=400&h=300&fit=crop",
    platform: "PC",
  },
  {
    id: 2,
    title: "Elden Ring",
    category: "Action Adventure",
    price: 59.99,
    discount: 0,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?w=400&h=300&fit=crop",
    platform: "PlayStation 5",
  },
  {
    id: 3,
    title: "The Witcher 3: Wild Hunt",
    category: "RPG",
    price: 39.99,
    discount: 50,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=300&fit=crop",
    platform: "PC",
  },
];

type LastOrder = {
  key: string;
  invoiceUrl: string;
  email: string;
  paymentMethod: string;
  total: number;
};

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);
  const [promoCode, setPromoCode] = useState("");

  // ✅ added checkout dialog + invoice
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [checkoutEmail, setCheckoutEmail] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [orderKey, setOrderKey] = useState<string | null>(null);
  const [invoiceUrl, setInvoiceUrl] = useState<string | null>(null);
  const [lastOrder, setLastOrder] = useState<LastOrder | null>(null);

  const calculateItemTotal = (item: CartItem) => {
    const discountedPrice = item.price * (1 - item.discount / 100);
    return discountedPrice * item.quantity;
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + calculateItemTotal(item), 0);
  };

  const calculateDiscounts = () => {
    return cartItems.reduce((total, item) => {
      const itemDiscount = item.price * (item.discount / 100) * item.quantity;
      return total + itemDiscount;
    }, 0);
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const shipping = subtotal > 100 ? 0 : 4.99;
    const tax = subtotal * 0.08;
    return subtotal + shipping + tax;
  };

  // ✅ promo discount (kept simple, doesn’t change UI structure)
  const promoPercent = useMemo(() => (promoCode.toUpperCase() === "GAMER10" ? 10 : 0), [promoCode]);

  const calculatePromoDiscount = () => {
    if (promoPercent === 0) return 0;
    const subtotal = calculateSubtotal();
    return subtotal * (promoPercent / 100);
  };

  const calculateTotalWithPromo = () => {
    const subtotal = calculateSubtotal();
    const shipping = subtotal > 100 ? 0 : 4.99;
    const tax = subtotal * 0.08;
    const promo = calculatePromoDiscount();
    return subtotal - promo + shipping + tax;
  };

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) {
      removeItem(id);
      return;
    }

    setCartItems((prev) => prev.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)));

    toast.success("Cart updated", {
      description: "Quantity has been updated.",
    });
  };

  const removeItem = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    toast.success("Item removed", {
      description: "Item has been removed from your cart.",
    });
  };

  const applyPromoCode = () => {
    if (!promoCode.trim()) {
      toast.error("Please enter a promo code");
      return;
    }

    if (promoCode.toUpperCase() === "GAMER10") {
      toast.success("Promo code applied!", {
        description: "You got 10% off your order!",
      });
    } else {
      toast.error("Invalid promo code", {
        description: "The promo code you entered is not valid.",
      });
    }
  };

  // ✅ helper: generate a readable key
  const generateKey = () => {
    const part = () => Math.random().toString(36).slice(2, 6).toUpperCase();
    return `${part()}-${part()}-${part()}-${part()}`;
  };

  // ✅ helper: create invoice (txt) and return blob url
  const createInvoiceUrl = (key: string, email: string, method: string) => {
    const subtotal = calculateSubtotal();
    const itemDiscounts = calculateDiscounts();
    const promoDiscount = calculatePromoDiscount();
    const shipping = subtotal > 100 ? 0 : 4.99;
    const tax = subtotal * 0.08;
    const total = calculateTotalWithPromo();

    const lines: string[] = [];
    lines.push("INVOICE");
    lines.push(`Date: ${new Date().toLocaleString()}`);
    lines.push(`Email: ${email}`);
    lines.push(`Payment Method: ${method}`);
    lines.push("");
    lines.push("Items:");
    cartItems.forEach((it) => {
      const unit = it.price * (1 - it.discount / 100);
      lines.push(`- ${it.title} (${it.platform}) x${it.quantity}  @ $${unit.toFixed(2)}  = $${(unit * it.quantity).toFixed(2)}`);
    });
    lines.push("");
    lines.push(`Subtotal: $${subtotal.toFixed(2)}`);
    lines.push(`Item Discounts: -$${itemDiscounts.toFixed(2)}`);
    if (promoDiscount > 0) lines.push(`Promo (GAMER10): -$${promoDiscount.toFixed(2)}`);
    lines.push(`Shipping: $${shipping.toFixed(2)}`);
    lines.push(`Tax (8%): $${tax.toFixed(2)}`);
    lines.push("-----------------------------");
    lines.push(`TOTAL: $${total.toFixed(2)}`);
    lines.push("");
    lines.push(`GAME KEY: ${key}`);
    lines.push("");
    lines.push("Thank you for your purchase!");

    const blob = new Blob([lines.join("\n")], { type: "text/plain;charset=utf-8" });
    return URL.createObjectURL(blob);
  };

  // ✅ now checkout opens dialog (confirmed + key + email + payment + invoice)
  const handleCheckout = () => {
    setCheckoutOpen(true);
  };

  const confirmCheckout = () => {
    if (!checkoutEmail.trim()) {
      toast.error("Please enter your email");
      return;
    }
    // simple email check
    if (!/^\S+@\S+\.\S+$/.test(checkoutEmail.trim())) {
      toast.error("Please enter a valid email");
      return;
    }

    setIsProcessing(true);
    toast.loading("Processing your order...");

    setTimeout(() => {
      const key = generateKey();
      const invoice = createInvoiceUrl(key, checkoutEmail.trim(), paymentMethod);

      // cleanup old invoice url
      if (invoiceUrl) URL.revokeObjectURL(invoiceUrl);

      setOrderKey(key);
      setInvoiceUrl(invoice);
      setLastOrder({
        key,
        invoiceUrl: invoice,
        email: checkoutEmail.trim(),
        paymentMethod,
        total: calculateTotalWithPromo(),
      });

      toast.success("Order placed successfully!", {
        description: `Key generated and sent to ${checkoutEmail.trim()}`,
      });

      // (simulation) “send email”
      toast.success("Email sent", {
        description: "Your key has been sent to your email address.",
      });

      // Clear cart after successful order
      setCartItems([]);

      setIsProcessing(false);
    }, 1200);
  };

  const downloadInvoice = () => {
    const url = invoiceUrl || lastOrder?.invoiceUrl;
    if (!url) {
      toast.error("No invoice available yet");
      return;
    }
    const a = document.createElement("a");
    a.href = url;
    a.download = "invoice.txt";
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  // ✅ After checkout (cart empty), show same empty layout but with key + invoice download
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-12">
          <div className="max-w-md mx-auto text-center">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
              <ShoppingCart className="h-12 w-12 text-muted-foreground" />
            </div>

            {lastOrder ? (
              <>
                <h1 className="text-3xl font-bold mb-4">Order confirmed ✅</h1>
                <p className="text-muted-foreground mb-6">
                  Your key was sent to <span className="font-medium">{lastOrder.email}</span>
                </p>

                <Card className="text-left mb-6">
                  <CardHeader>
                    <CardTitle className="text-base">Your Game Key</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-mono text-sm">{lastOrder.key}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          navigator.clipboard?.writeText(lastOrder.key);
                          toast.success("Copied", { description: "Key copied to clipboard." });
                        }}
                      >
                        Copy
                      </Button>
                    </div>
                    <div className="mt-4">
                      <Button className="w-full" onClick={downloadInvoice}>
                        Download Invoice
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Link href="/">
                  <Button size="lg" className="gap-2 w-full">
                    <Gamepad2 className="h-5 w-5" />
                    Continue Shopping
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
                <p className="text-muted-foreground mb-8">Looks like you haven&apos;t added any games to your cart yet.</p>
                <Link href="/">
                  <Button size="lg" className="gap-2">
                    <Gamepad2 className="h-5 w-5" />
                    Browse Games
                  </Button>
                </Link>
              </>
            )}
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* ✅ Checkout Dialog */}
      <Dialog open={checkoutOpen} onOpenChange={setCheckoutOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Checkout</DialogTitle>
            <DialogDescription>
              Confirm your email, choose a payment method, and complete your purchase.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email
              </Label>
              <Input
                placeholder="you@example.com"
                value={checkoutEmail}
                onChange={(e) => setCheckoutEmail(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">We will send your game key to this email.</p>
            </div>

            <div className="space-y-2">
              <Label>Payment Method</Label>
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="grid gap-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="card" id="pm-card" />
                  <Label htmlFor="pm-card">Credit / Debit Card</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="paypal" id="pm-paypal" />
                  <Label htmlFor="pm-paypal">PayPal</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="applepay" id="pm-applepay" />
                  <Label htmlFor="pm-applepay">Apple Pay</Label>
                </div>
              </RadioGroup>
            </div>

            {/* ✅ show key after confirm */}
            {orderKey && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Your Key</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-mono text-sm">{orderKey}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        navigator.clipboard?.writeText(orderKey);
                        toast.success("Copied", { description: "Key copied to clipboard." });
                      }}
                    >
                      Copy
                    </Button>
                  </div>
                  <Button className="w-full" onClick={downloadInvoice}>
                    Download Invoice
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setCheckoutOpen(false)} disabled={isProcessing}>
              Cancel
            </Button>
            <Button onClick={confirmCheckout} disabled={isProcessing || !!orderKey}>
              {orderKey ? "Completed" : "Confirm & Pay"}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <main className="flex-1 container mx-auto px-4 py-8">
        {/* ✅ Header (Continue Shopping moved to top) */}
        <div className="mb-8 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Shopping Cart</h1>
            <p className="text-muted-foreground mt-2">
              {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in your cart
            </p>
          </div>

          <Link href="/" className="shrink-0">
            <Button variant="outline">Continue Shopping</Button>
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Cart Items</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-4 pb-6 border-b last:border-0 last:pb-0">
                      <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                        <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${item.image})` }} />
                      </div>

                      <div className="flex-1">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="font-semibold text-lg">{item.title}</h3>
                            <p className="text-sm text-muted-foreground">{item.category}</p>
                            <Badge variant="outline" className="mt-2">
                              {item.platform}
                            </Badge>
                          </div>
                          <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="icon" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-12 text-center">{item.quantity}</span>
                            <Button variant="outline" size="icon" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>

                          <div className="text-right">
                            {item.discount > 0 && (
                              <span className="text-sm text-muted-foreground line-through mr-2">${item.price.toFixed(2)}</span>
                            )}
                            <span className="text-lg font-bold">
                              ${(item.price * (1 - item.discount / 100)).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${calculateSubtotal().toFixed(2)}</span>
                  </div>

                  {/* ✅ Discounts inside a Card (as requested) */}
                  <Card>
                    <CardContent className="p-3 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Item Discounts</span>
                        <span className="text-green-600">-${calculateDiscounts().toFixed(2)}</span>
                      </div>
                      {promoPercent > 0 && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Promo (GAMER10)</span>
                          <span className="text-green-600">-${calculatePromoDiscount().toFixed(2)}</span>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>{calculateSubtotal() > 100 ? "FREE" : "$4.99"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax</span>
                    <span>${(calculateSubtotal() * 0.08).toFixed(2)}</span>
                  </div>
                </div>
                {/* Promo Code */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Tag className="h-4 w-4" />
                      Promo Code
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Enter promo code"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        className="flex-1"
                      />
                      <Button size="sm" onClick={applyPromoCode}>
                        Apply
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Try <span className="font-medium">GAMER10</span> for 10% off
                    </p>
                  </CardContent>
                </Card>

                <Separator />

                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>${calculateTotalWithPromo().toFixed(2)}</span>
                </div>

                <div className="space-y-3 pt-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Shield className="h-4 w-4" />
                    <span>Secure checkout</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>Instant delivery after purchase</span>
                  </div>
                </div>
              </CardContent>

              <CardFooter>
                <Button className="w-full" size="lg" onClick={handleCheckout}>
                  Proceed to Checkout
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
