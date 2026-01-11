import { Gamepad2, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function HeroBanner() {
  return (
    <section className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Column: Logo Image */}
          <div className="order-2 md:order-1">
            <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
              <CardContent className="p-12">
                <div className="flex flex-col items-center justify-center space-y-6">
                  <div className="relative">
                    <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl" />
                    <div className="relative bg-primary text-primary-foreground rounded-full p-8">
                      <Gamepad2 className="h-16 w-16" />
                    </div>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                    Ultimate Store
                  </h2>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Right Column: Content */}
          <div className="order-1 md:order-2 space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Welcome to <span className="text-primary">Ultimate Store</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Your premier destination for digital games. Discover the latest titles, 
              timeless classics, and exclusive deals all in one place.
            </p>
            
            <div className="space-y-3 pt-4">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="text-muted-foreground">50,000+ Happy Gamers</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="text-muted-foreground">5,000+ Games Available</span>
              </div>
            </div>
            
            <div className="pt-6">
              <button className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors">
                Browse Games
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}