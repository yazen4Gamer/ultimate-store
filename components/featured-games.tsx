"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingCart, Eye, Gamepad2 } from "lucide-react";
import { games } from "@/lib/data";
import { toast } from "sonner";

export default function FeaturedGames() {
  const [hoveredGame, setHoveredGame] = useState<number | null>(null);

  // Get featured games (with isFeatured flag or top rated)
  const featuredGames = games
    .filter(game => game.isFeatured)
    .slice(0, 4)
    .sort((a, b) => b.rating - a.rating);

  const handleAddToCart = (gameId: number, gameTitle: string) => {
    toast.success("Added to cart", {
      description: `${gameTitle} has been added to your cart.`,
    });
  };

  const handleAddToWishlist = (gameId: number, gameTitle: string) => {
    toast.success("Added to wishlist", {
      description: `${gameTitle} has been added to your wishlist.`,
    });
  };

  const handleQuickView = (gameId: number) => {
    // In a real app, this would open a quick view modal
    const game = games.find(g => g.id === gameId);
    if (game) {
      toast.info("Quick View", {
        description: `Viewing ${game.title} details.`,
      });
      // You could implement a modal here
    }
  };

  return (
    <section className="py-12" id="featured">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Best Seller Games</h2>
            <p className="text-muted-foreground mt-2">Most popular games this month</p>
          </div>
          <Link href="/products">
            <Button variant="outline" className="gap-2">
              Show All
            </Button>
          </Link>
        </div>

        {featuredGames.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredGames.map((game) => (
              <Card
                key={game.id}
                className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
                onMouseEnter={() => setHoveredGame(game.id)}
                onMouseLeave={() => setHoveredGame(null)}
              >
                <div className="relative h-48 overflow-hidden">
                  <div
                    className="h-full w-full bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundImage: `url(${game.image})` }}
                  />
                  {game.discount > 0 && (
                    <Badge className="absolute top-3 left-3 bg-red-500 hover:bg-red-600">
                      -{game.discount}%
                    </Badge>
                  )}
                  {game.isNewRelease && (
                    <Badge className="absolute top-3 right-3 bg-blue-500 hover:bg-blue-600">
                      NEW
                    </Badge>
                  )}
                  <div 
                    className={`absolute inset-0 bg-black/60 flex items-center justify-center transition-opacity duration-300 ${
                      hoveredGame === game.id ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleQuickView(game.id);
                        }}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        Quick View
                      </Button>
                    </div>
                  </div>
                </div>
                
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <Link href={`/product/${game.id}`}>
                        <h3 className="font-semibold text-lg hover:text-primary transition-colors">
                          {game.title}
                        </h3>
                      </Link>
                      <p className="text-sm text-muted-foreground">{game.category}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {game.platform.slice(0, 2).map(platform => (
                      <Badge key={platform} variant="outline" className="text-xs">
                        {platform}
                      </Badge>
                    ))}
                    {game.platform.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{game.platform.length - 2}
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                
                <CardContent className="pb-4">
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < Math.floor(game.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                      />
                    ))}
                    <span className="text-sm ml-2">{game.rating}</span>
                    <span className="text-sm text-muted-foreground ml-1">
                      ({game.reviews.toLocaleString()})
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {game.description}
                  </p>
                </CardContent>
                
                <CardFooter className="flex justify-between items-center pt-0">
                  <div className="flex items-center gap-2">
                    {game.discount > 0 ? (
                      <>
                        <span className="text-lg font-bold">
                          ${(game.price * (1 - game.discount / 100)).toFixed(2)}
                        </span>
                        <span className="text-sm text-muted-foreground line-through">
                          ${game.price.toFixed(2)}
                        </span>
                      </>
                    ) : (
                      <span className="text-lg font-bold">${game.price.toFixed(2)}</span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToWishlist(game.id, game.title);
                      }}
                    >
                      <Star className="h-4 w-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(game.id, game.title);
                      }}
                      className="gap-2"
                    >
                      <ShoppingCart className="h-4 w-4" />
                      Add
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="py-12">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                  <Gamepad2 className="h-8 w-8 text-muted-foreground" />
                </div>
                <CardTitle className="mb-2">No Featured Games Available</CardTitle>
                <p className="text-muted-foreground mb-6">
                  Check back later for featured games.
                </p>
                <Link href="/products">
                  <Button>Browse All Games</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Featured Games Stats */}
        <Card className="mt-8">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">
                  {games.filter(g => g.isFeatured).length}
                </div>
                <p className="text-sm text-muted-foreground">Featured Games</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {games.filter(g => g.isOnSale).length}
                </div>
                <p className="text-sm text-muted-foreground">Games on Sale</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {games.filter(g => g.isNewRelease).length}
                </div>
                <p className="text-sm text-muted-foreground">New Releases</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}