"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, ShoppingCart, Eye, Trash2, Gamepad2, Tag, AlertCircle } from "lucide-react";
import { toast } from "sonner";

interface WishlistItem {
  id: number;
  title: string;
  category: string;
  price: number;
  discount: number;
  image: string;
  platform: string;
  rating: number;
  isOnSale: boolean;
  addedDate: string;
}

const initialWishlist: WishlistItem[] = [
  {
    id: 1,
    title: "God of War: Ragnarok",
    category: "Action Adventure",
    price: 69.99,
    discount: 0,
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=300&fit=crop",
    platform: "PlayStation 5",
    rating: 4.8,
    isOnSale: false,
    addedDate: "2024-01-15",
  },
  {
    id: 2,
    title: "Starfield",
    category: "Space RPG",
    price: 59.99,
    discount: 15,
    image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=400&h=300&fit=crop",
    platform: "PC",
    rating: 4.5,
    isOnSale: true,
    addedDate: "2024-01-10",
  },
  {
    id: 3,
    title: "The Legend of Zelda: Tears of the Kingdom",
    category: "Action Adventure",
    price: 69.99,
    discount: 0,
    image: "https://images.unsplash.com/photo-1551103782-8ab07afd45c1?w=400&h=300&fit=crop",
    platform: "Nintendo Switch",
    rating: 4.9,
    isOnSale: false,
    addedDate: "2024-01-05",
  },
  {
    id: 4,
    title: "Final Fantasy VII Rebirth",
    category: "JRPG",
    price: 69.99,
    discount: 10,
    image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=400&h=300&fit=crop",
    platform: "PlayStation 5",
    rating: 4.7,
    isOnSale: true,
    addedDate: "2023-12-20",
  },
];

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState<WishlistItem[]>(initialWishlist);
  const [sortBy, setSortBy] = useState<string>("recent");

  const removeFromWishlist = (id: number) => {
    setWishlist(prev => prev.filter(item => item.id !== id));
    toast.success("Removed from wishlist", {
      description: "Game has been removed from your wishlist.",
    });
  };

  const addToCart = (item: WishlistItem) => {
    toast.success("Added to cart", {
      description: `${item.title} has been added to your cart.`,
    });
    // In a real app, you would add to cart context/state
  };

  const moveAllToCart = () => {
    toast.success("Added all to cart", {
      description: "All games have been added to your cart.",
    });
    // In a real app, you would add all to cart
  };

  const getSortedWishlist = () => {
    const sorted = [...wishlist];
    switch (sortBy) {
      case "price-low":
        return sorted.sort((a, b) => {
          const priceA = a.price * (1 - a.discount / 100);
          const priceB = b.price * (1 - b.discount / 100);
          return priceA - priceB;
        });
      case "price-high":
        return sorted.sort((a, b) => {
          const priceA = a.price * (1 - a.discount / 100);
          const priceB = b.price * (1 - b.discount / 100);
          return priceB - priceA;
        });
      case "rating":
        return sorted.sort((a, b) => b.rating - a.rating);
      case "recent":
      default:
        return sorted.sort((a, b) => new Date(b.addedDate).getTime() - new Date(a.addedDate).getTime());
    }
  };

  const sortedWishlist = getSortedWishlist();

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-12">
          <div className="max-w-md mx-auto text-center">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
              <Heart className="h-12 w-12 text-muted-foreground" />
            </div>
            <h1 className="text-3xl font-bold mb-4">Your wishlist is empty</h1>
            <p className="text-muted-foreground mb-8">
              Save games you&apos;re interested in for later.
            </p>
            <Link href="/">
              <Button size="lg" className="gap-2">
                <Gamepad2 className="h-5 w-5" />
                Browse Games
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">My Wishlist</h1>
            <p className="text-muted-foreground mt-2">
              {wishlist.length} {wishlist.length === 1 ? 'game' : 'games'} saved for later
            </p>
          </div>

          <div className="flex items-center gap-3 mt-4 md:mt-0">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border rounded-md text-sm"
            >
              <option value="recent">Recently Added</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>

            <Button onClick={moveAllToCart} className="gap-2">
              <ShoppingCart className="h-4 w-4" />
              Add All to Cart
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedWishlist.map((item) => (
            <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48 overflow-hidden">
                <div
                  className="h-full w-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${item.image})` }}
                />
                {item.isOnSale && (
                  <Badge className="absolute top-3 left-3 bg-red-500 hover:bg-red-600">
                    ON SALE
                  </Badge>
                )}
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm"
                  onClick={() => removeFromWishlist(item.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg line-clamp-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.category}</p>
                  </div>
                </div>
                <Badge variant="outline" className="w-fit mt-2">{item.platform}</Badge>
              </CardHeader>
              
              <CardContent className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                      <span className="ml-1 text-sm">{item.rating}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      Added {item.addedDate}
                    </span>
                  </div>
                  
                  <div className="text-right">
                    {item.discount > 0 && (
                      <span className="text-sm text-muted-foreground line-through mr-2">
                        ${item.price.toFixed(2)}
                      </span>
                    )}
                    <span className="text-lg font-bold">
                      ${(item.price * (1 - item.discount / 100)).toFixed(2)}
                    </span>
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="pt-0 flex gap-2">
                <Button 
                  variant="outline" 
                  className="flex-1 gap-2"
                  onClick={() => addToCart(item)}
                >
                  <ShoppingCart className="h-4 w-4" />
                  Add to Cart
                </Button>
                <Link href={`/game/${item.id}`} className="flex-1">
                  <Button variant="secondary" className="w-full gap-2">
                    <Eye className="h-4 w-4" />
                    View
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Wishlist Stats */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Wishlist Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Tag className="h-5 w-5 text-green-600" />
                  <h4 className="font-semibold">Games on Sale</h4>
                </div>
                <p className="text-2xl font-bold">
                  {wishlist.filter(item => item.isOnSale).length}
                </p>
                <p className="text-sm text-muted-foreground">
                  Save on these games now!
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-blue-600" />
                  <h4 className="font-semibold">Total Value</h4>
                </div>
                <p className="text-2xl font-bold">
                  ${wishlist.reduce((total, item) => total + item.price, 0).toFixed(2)}
                </p>
                <p className="text-sm text-muted-foreground">
                  ${wishlist.reduce((total, item) => total + (item.price * item.discount / 100), 0).toFixed(2)} potential savings
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Gamepad2 className="h-5 w-5 text-purple-600" />
                  <h4 className="font-semibold">Most Common Genre</h4>
                </div>
                <p className="text-2xl font-bold">Action</p>
                <p className="text-sm text-muted-foreground">
                  Based on your wishlist preferences
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/">
                Continue Shopping
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </main>
      <Footer />
    </div>
  );
}