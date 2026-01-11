import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function FAQPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">FAQ</h1>
          <p className="text-muted-foreground mb-8">
            Quick answers to common questions about purchases, keys, and delivery.
          </p>

          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>How do I receive my game key?</AccordionTrigger>
                  <AccordionContent>
                    After checkout, your key will be shown on screen and sent to your email. Delivery is usually instant.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger>Can I refund a digital game?</AccordionTrigger>
                  <AccordionContent>
                    Refund eligibility depends on whether the key was delivered/redeemed. Please review our Refund Policy page for details.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger>What payment methods do you support?</AccordionTrigger>
                  <AccordionContent>
                    We support multiple payment methods during checkout such as card payments and other options depending on availability.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                  <AccordionTrigger>My key doesn’t work. What should I do?</AccordionTrigger>
                  <AccordionContent>
                    Contact support with your order email and key. We’ll help verify the platform/region and resolve it.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5">
                  <AccordionTrigger>Do you offer discounts or promo codes?</AccordionTrigger>
                  <AccordionContent>
                    Yes. Promo codes may be available during promotions. You can apply them in the Order Summary section at checkout.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
