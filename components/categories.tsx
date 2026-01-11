"use client";

import { useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Swords, Mountain, Shield, Target, Trophy, Car, ChessKing, Puzzle } from "lucide-react";

const categories = [
  { name: "Action", icon: Swords, color: "bg-red-500", count: 245 },
  { name: "Adventure", icon: Mountain, color: "bg-green-500", count: 189 },
  { name: "RPG", icon: Shield, color: "bg-blue-500", count: 156 },
  { name: "Shooter", icon: Target, color: "bg-orange-500", count: 278 },
  { name: "Sports", icon: Trophy, color: "bg-purple-500", count: 134 },
  { name: "Racing", icon: Car, color: "bg-yellow-500", count: 98 },
  { name: "Strategy", icon: ChessKing, color: "bg-indigo-500", count: 87 },
  { name: "Puzzle", icon: Puzzle, color: "bg-pink-500", count: 112 },
];

export default function Categories() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-12 bg-muted/30" id="categories">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Browse by Category</h2>
            <p className="text-muted-foreground mt-2">Explore games by genre</p>
          </div>
          <Link href="/categories">
            <Button variant="outline" className="gap-2">
              Show All
            </Button>
          </Link>
        </div>

        <div className="relative">
          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-background shadow-lg"
            onClick={() => scroll("left")}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <div
            ref={scrollContainerRef}
            className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {categories.map((category) => (
              <Link
                key={category.name}
                href={`/products?category=${category.name.toLowerCase()}`}
                className="flex-shrink-0"
              >
                <Card className="w-40 hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center space-y-4">
                      <div className={`${category.color} p-3 rounded-full`}>
                        <category.icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{category.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {category.count} games
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          
          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-background shadow-lg"
            onClick={() => scroll("right")}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}