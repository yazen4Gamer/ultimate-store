"use client";

import { useState } from "react";
import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart, Heart, Share2, Star, Gamepad2, Users, Calendar, Award, Shield, Download, CheckCircle, Tag } from "lucide-react";
import { games, categories } from "@/lib/data";
import { toast } from "sonner";

export default function ProductDetailPage() {
  const params = useParams();
  const gameId = parseInt(params.id as string);
  const game = games.find(g => g.id === gameId);

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("overview");

  if (!game) {
    notFound();
  }

  const discountedPrice = game.price * (1 - game.discount / 100);
  const category = categories.find(c => c.name === game.category);

  const handleAddToCart = () => {
    toast.success("Added to cart", {
      description: `${quantity} × ${game.title} has been added to your cart.`,
    });
  };

  const handleAddToWishlist = () => {
    toast.success("Added to wishlist", {
      description: `${game.title} has been added to your wishlist.`,
    });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied", {
      description: "Product link has been copied to clipboard.",
    });
  };

  const relatedGames = games
    .filter(g => g.id !== game.id && (g.category === game.category || g.tags.some(tag => game.tags.includes(tag))))
    .slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link href="/" className="hover:text-primary">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-primary">Games</Link>
          <span>/</span>
          <Link href={`/products?category=${game.category.toLowerCase()}`} className="hover:text-primary">
            {game.category}
          </Link>
          <span>/</span>
          <span className="text-foreground">{game.title}</span>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column: Images and Basic Info */}
          <div className="lg:col-span-2">
            {/* Main Image */}
            <div className="rounded-lg overflow-hidden mb-6">
              <div
                className="h-96 w-full bg-cover bg-center"
                style={{ backgroundImage: `url(${game.screenshots[selectedImage] || game.image})` }}
              />
            </div>

            {/* Image Thumbnails */}
            <div className="flex gap-4 mb-8">
              {[game.image, ...game.screenshots].slice(0, 4).map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index ? 'border-primary' : 'border-transparent hover:border-muted'
                  }`}
                >
                  <div
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${image})` }}
                  />
                </button>
              ))}
            </div>

            {/* Game Info Tabs */}
            <Card>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="features">Features</TabsTrigger>
                  <TabsTrigger value="requirements">Requirements</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="p-6">
                  <div className="prose max-w-none">
                    <h3 className="text-xl font-semibold mb-4">About This Game</h3>
                    <p className="mb-4">{game.longDescription}</p>
                    
                    <div className="grid grid-cols-2 gap-4 mt-6">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Gamepad2 className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">Developer</span>
                        </div>
                        <p>{game.developer}</p>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">Publisher</span>
                        </div>
                        <p>{game.publisher}</p>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">Release Date</span>
                        </div>
                        <p>{new Date(game.releaseDate).toLocaleDateString()}</p>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Award className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">Category</span>
                        </div>
                        <Badge variant="outline">{game.category}</Badge>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="features" className="p-6">
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold">Game Features</h3>
                    <ul className="space-y-3">
                      {game.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-3">
                          <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <div>
                      <h4 className="font-semibold mb-3">Tags</h4>
                      <div className="flex flex-wrap gap-2">
                        {game.tags.map(tag => (
                          <Badge key={tag} variant="secondary">{tag}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="requirements" className="p-6">
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold">System Requirements</h3>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-3 text-green-600">Minimum</h4>
                        <ul className="space-y-2">
                          {game.systemRequirements.minimum.map((req, index) => (
                            <li key={index} className="text-sm">{req}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-3 text-blue-600">Recommended</h4>
                        <ul className="space-y-2">
                          {game.systemRequirements.recommended.map((req, index) => (
                            <li key={index} className="text-sm">{req}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Shield className="h-4 w-4" />
                      <span>System requirements may change over time</span>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="reviews" className="p-6">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-semibold">Customer Reviews</h3>
                        <div className="flex items-center gap-4 mt-2">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-5 w-5 ${i < Math.floor(game.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                              />
                            ))}
                          </div>
                          <span className="text-2xl font-bold">{game.rating}</span>
                          <span className="text-muted-foreground">
                            ({game.reviews.toLocaleString()} reviews)
                          </span>
                        </div>
                      </div>
                      <Button variant="outline">Write a Review</Button>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      {[
                        { rating: 5, percentage: 75 },
                        { rating: 4, percentage: 15 },
                        { rating: 3, percentage: 7 },
                        { rating: 2, percentage: 2 },
                        { rating: 1, percentage: 1 },
                      ].map((item) => (
                        <div key={item.rating} className="flex items-center gap-4">
                          <div className="flex items-center gap-2 w-16">
                            <span className="text-sm">{item.rating}</span>
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          </div>
                          <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-yellow-400"
                              style={{ width: `${item.percentage}%` }}
                            />
                          </div>
                          <span className="text-sm text-muted-foreground w-12">{item.percentage}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </Card>
          </div>

          {/* Right Column: Purchase Info */}
          <div>
            <Card className="sticky top-24">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl">{game.title}</CardTitle>
                    <CardDescription>{game.category}</CardDescription>
                  </div>
                  <Badge variant="outline" className={category?.color}>
                    {category?.icon} {game.category}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Rating */}
                <div className="flex items-center gap-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${i < Math.floor(game.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                  <div>
                    <span className="text-2xl font-bold">{game.rating}</span>
                    <span className="text-muted-foreground ml-2">
                      ({game.reviews.toLocaleString()} reviews)
                    </span>
                  </div>
                </div>

                {/* Platforms */}
                <div>
                  <h4 className="font-semibold mb-3">Available On</h4>
                  <div className="flex flex-wrap gap-2">
                    {game.platform.map(platform => (
                      <Badge key={platform} variant="outline" className="gap-2">
                        <Gamepad2 className="h-3 w-3" />
                        {platform}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Price */}
                <div className="space-y-3">
                  {game.discount > 0 && (
                    <div className="flex items-center gap-3">
                      <Badge className="bg-red-500 hover:bg-red-600">
                        <Tag className="h-3 w-3 mr-1" />
                        Save {game.discount}%
                      </Badge>
                      <span className="text-lg text-muted-foreground line-through">
                        ${game.price.toFixed(2)}
                      </span>
                    </div>
                  )}
                  <div className="text-3xl font-bold">${discountedPrice.toFixed(2)}</div>
                  {game.discount > 0 && (
                    <div className="text-sm text-green-600">
                      You save ${(game.price - discountedPrice).toFixed(2)}
                    </div>
                  )}
                </div>

                {/* Quantity */}
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity</Label>
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                    >
                      -
                    </Button>
                    <span className="w-12 text-center font-medium">{quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      +
                    </Button>
                    <div className="text-sm text-muted-foreground ml-4">
                      ${(discountedPrice * quantity).toFixed(2)} total
                    </div>
                  </div>
                </div>

                {/* Instant Delivery */}
                <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
                  <Download className="h-5 w-5 text-green-600" />
                  <div>
                    <div className="font-medium">Instant Delivery</div>
                    <div className="text-sm text-muted-foreground">
                      Digital download available immediately after purchase
                    </div>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-3 w-full">
                  <Button
                    variant="outline"
                    className="gap-2"
                    onClick={handleAddToWishlist}
                  >
                    <Heart className="h-4 w-4" />
                    Wishlist
                  </Button>
                  <Button
                    variant="outline"
                    className="gap-2"
                    onClick={handleShare}
                  >
                    <Share2 className="h-4 w-4" />
                    Share
                  </Button>
                </div>

                <Button
                  size="lg"
                  className="w-full gap-2"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="h-5 w-5" />
                  Add to Cart
                </Button>

                <div className="text-center text-sm text-muted-foreground">
                  30-day money-back guarantee
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>

        {/* Related Games */}
        {relatedGames.length > 0 && (
          <div className="mt-12">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold">You Might Also Like</h2>
                <p className="text-muted-foreground mt-1">
                  Games similar to {game.title}
                </p>
              </div>
              <Button variant="outline" asChild className="gap-2">
                <Link href={`/products?category=${game.category.toLowerCase()}`}>
                  View All {game.category} Games
                  <Gamepad2 className="h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedGames.map(relatedGame => {
                const discountedPrice = relatedGame.price * (1 - relatedGame.discount / 100);
                
                return (
                  <Card 
                    key={relatedGame.id} 
                    className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
                  >
                    <Link href={`/product/${relatedGame.id}`} className="block">
                      <div className="relative h-48 overflow-hidden">
                        <div
                          className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                          style={{ backgroundImage: `url(${relatedGame.image})` }}
                        />
                        {/* Badges */}
                        <div className="absolute top-3 left-3 flex flex-col gap-2">
                          {relatedGame.discount > 0 && (
                            <Badge className="bg-red-500 hover:bg-red-600 shadow-lg">
                              <Tag className="h-3 w-3 mr-1" />
                              -{relatedGame.discount}%
                            </Badge>
                          )}
                          {relatedGame.isNewRelease && (
                            <Badge className="bg-blue-500 hover:bg-blue-600 shadow-lg">
                              NEW
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      <CardContent className="p-4">
                        <div className="mb-2">
                          <h3 className="font-semibold text-lg hover:text-primary transition-colors line-clamp-1">
                            {relatedGame.title}
                          </h3>
                          <p className="text-sm text-muted-foreground line-clamp-1">
                            {relatedGame.category}
                          </p>
                        </div>
                        
                        {/* Platform Badges */}
                        <div className="flex flex-wrap gap-1 mb-3">
                          {relatedGame.platform.slice(0, 2).map(platform => (
                            <Badge 
                              key={platform} 
                              variant="outline" 
                              className="text-xs px-1.5 py-0"
                            >
                              {platform}
                            </Badge>
                          ))}
                          {relatedGame.platform.length > 2 && (
                            <Badge 
                              variant="outline" 
                              className="text-xs px-1.5 py-0"
                            >
                              +{relatedGame.platform.length - 2}
                            </Badge>
                          )}
                        </div>
                        
                        {/* Rating & Price */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-3 w-3 ${
                                    i < Math.floor(relatedGame.rating) 
                                      ? 'fill-yellow-400 text-yellow-400' 
                                      : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-sm font-medium">{relatedGame.rating}</span>
                          </div>
                          
                          <div className="text-right">
                            <div className="flex items-center gap-2">
                              {relatedGame.discount > 0 && (
                                <span className="text-xs text-muted-foreground line-through">
                                  ${relatedGame.price.toFixed(2)}
                                </span>
                              )}
                              <span className={`font-bold ${
                                relatedGame.discount > 0 
                                  ? 'text-green-600' 
                                  : 'text-foreground'
                              }`}>
                                ${discountedPrice.toFixed(2)}
                              </span>
                            </div>
                            {relatedGame.discount > 0 && (
                              <div className="text-xs text-green-600 font-medium">
                                Save ${(relatedGame.price - discountedPrice).toFixed(2)}
                              </div>
                            )}
                          </div>
                        </div>
                        
                        {/* Quick Info */}
                        <div className="mt-3 pt-3 border-t border-border">
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Users className="h-3 w-3" />
                              <span>{relatedGame.reviews.toLocaleString()} reviews</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              <span>{new Date(relatedGame.releaseDate).getFullYear()}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Link>
                  </Card>
                );
              })}
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

// Helper component for Label (missing import)
const Label = ({ htmlFor, children, className }: { htmlFor?: string; children: React.ReactNode; className?: string }) => (
  <label htmlFor={htmlFor} className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`}>
    {children}
  </label>
);