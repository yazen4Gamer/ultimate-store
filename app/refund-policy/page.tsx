import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Refund Policy</h1>
          <p className="text-muted-foreground mb-8">
            Please read this policy carefully before purchasing digital products.
          </p>

          <Card>
            <CardHeader>
              <CardTitle>Refund Policy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <section className="space-y-2">
                <h2 className="text-lg font-semibold">1. Digital Products</h2>
                <p className="text-muted-foreground">
                  Digital goods (game keys) are typically delivered instantly. Once a key is delivered, refunds may be limited.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-lg font-semibold">2. Eligible Refund Cases</h2>
                <ul className="list-disc pl-5 text-muted-foreground space-y-1">
                  <li>Duplicate charge or billing error</li>
                  <li>Key not delivered (after verification)</li>
                  <li>Key is invalid (after troubleshooting/verification)</li>
                </ul>
              </section>

              <section className="space-y-2">
                <h2 className="text-lg font-semibold">3. Non-Refundable Cases</h2>
                <ul className="list-disc pl-5 text-muted-foreground space-y-1">
                  <li>Key has been redeemed or used</li>
                  <li>Wrong platform/region selected by customer</li>
                  <li>Change of mind after delivery</li>
                </ul>
              </section>

              <section className="space-y-2">
                <h2 className="text-lg font-semibold">4. How to Request a Refund</h2>
                <p className="text-muted-foreground">
                  Contact us from the Contact Us page with your order email, game title, and issue details. Our team may request
                  additional information to verify the request.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-lg font-semibold">5. Processing Time</h2>
                <p className="text-muted-foreground">
                  If approved, refunds are processed back to the original payment method. Processing times can vary by provider.
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
