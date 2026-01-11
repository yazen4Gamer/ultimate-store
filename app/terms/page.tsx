import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Terms of Service</h1>
          <p className="text-muted-foreground mb-8">
            By using our website and purchasing products, you agree to the terms below.
          </p>

          <Card>
            <CardHeader>
              <CardTitle>Terms of Service</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <section className="space-y-2">
                <h2 className="text-lg font-semibold">1. Use of Service</h2>
                <p className="text-muted-foreground">
                  You agree to use the service lawfully and not misuse or attempt to disrupt the platform.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-lg font-semibold">2. Digital Purchases</h2>
                <p className="text-muted-foreground">
                  Purchased items are digital products (game keys). Delivery is typically instant after successful payment.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-lg font-semibold">3. Pricing & Payments</h2>
                <p className="text-muted-foreground">
                  Prices may change at any time. Payments are handled via the available checkout methods.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-lg font-semibold">4. Refunds</h2>
                <p className="text-muted-foreground">
                  Refunds are subject to our Refund Policy. Some digital purchases may be non-refundable once delivered or redeemed.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-lg font-semibold">5. Limitation of Liability</h2>
                <p className="text-muted-foreground">
                  We are not liable for indirect or consequential damages. Maximum liability is limited to the amount paid for the product.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-lg font-semibold">6. Changes</h2>
                <p className="text-muted-foreground">
                  We may update these terms from time to time. Continued use of the service indicates acceptance of the updated terms.
                </p>
              </section>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
