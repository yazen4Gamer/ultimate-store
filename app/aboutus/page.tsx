import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Clock, Gamepad2 } from "lucide-react";

export default function AboutUsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold">About Us</h1>
            <Badge variant="outline" className="gap-2">
              <Gamepad2 className="h-4 w-4" />
              Digital Games Store
            </Badge>
          </div>

          <p className="text-muted-foreground mb-8">
            We’re a digital gaming marketplace focused on fast delivery, secure checkout, and great deals on top titles.
          </p>

          <Card>
            <CardHeader>
              <CardTitle>Who we are</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <section className="space-y-2">
                <h2 className="text-lg font-semibold">Our Mission</h2>
                <p className="text-muted-foreground">
                  Make buying games simple and reliable. We aim to deliver your game keys instantly, provide clear pricing,
                  and offer support when you need it.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-lg font-semibold">What we do</h2>
                <p className="text-muted-foreground">
                  We sell digital game keys across popular platforms. After purchase, you’ll receive your key on screen and via
                  email so you can start playing quickly.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-lg font-semibold">Why players choose us</h2>

                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="rounded-lg border p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Shield className="h-4 w-4" />
                      <p className="font-medium">Secure</p>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Safe checkout experience with trusted payment options.
                    </p>
                  </div>

                  <div className="rounded-lg border p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="h-4 w-4" />
                      <p className="font-medium">Fast Delivery</p>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Instant key delivery after purchase in most cases.
                    </p>
                  </div>

                  <div className="rounded-lg border p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Gamepad2 className="h-4 w-4" />
                      <p className="font-medium">Great Games</p>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      A curated selection of popular and trending titles.
                    </p>
                  </div>
                </div>
              </section>

              <section className="space-y-2">
                <h2 className="text-lg font-semibold">Need help?</h2>
                <p className="text-muted-foreground">
                  If you have any questions about your order, keys, or billing, visit the Contact Us page and our team will help you.
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
