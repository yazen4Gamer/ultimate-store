"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Search, Filter, Grid3X3, List, Star, ShoppingCart, Gamepad2, Tag, Clock, TrendingUp } from "lucide-react";
import { games, categories } from "@/lib/data";
import { toast } from "sonner";

const ITEMS_PER_PAGE = 12;
const PLATFORMS = ['PC', 'PlayStation 5', 'PlayStation 4', 'Xbox Series X', 'Xbox One', 'Nintendo Switch', 'Mobile'];

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');
  
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    priceRange: [0, 100] as [number, number],
    platforms: [] as string[],
    categories: categoryParam ? [categoryParam] : [] as string[],
    ratings: [] as number[],
    sortBy: 'relevance' as 'relevance' | 'price-low' | 'price-high' | 'newest' | 'rating',
    showOnly: {
      onSale: false,
      newReleases: false,
      featured: false,
    }
  });

  // Filter and sort games
  const filteredGames = games.filter(game => {
    // Search query filter
    if (searchQuery && !game.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !game.description.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !game.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))) {
      return false;
    }

    // Category filter
    if (filters.categories.length > 0 && !filters.categories.includes(game.category.toLowerCase().replace(/\s+/g, "-"))) {
      return false;
    }
    // Platform filter
    if (filters.platforms.length > 0 && !filters.platforms.some(platform => game.platform.includes(platform))) {
      return false;
    }

    // Price filter
    const price = game.price * (1 - game.discount / 100);
    if (price < filters.priceRange[0] || price > filters.priceRange[1]) {
      return false;
    }

    // Rating filter
    if (filters.ratings.length > 0 && !filters.ratings.some(rating => game.rating >= rating && game.rating < rating + 1)) {
      return false;
    }

    // Show only filters
    if (filters.showOnly.onSale && !game.isOnSale) return false;
    if (filters.showOnly.newReleases && !game.isNewRelease) return false;
    if (filters.showOnly.featured && !game.isFeatured) return false;

    return true;
  });

  // Sort games
  const sortedGames = [...filteredGames].sort((a, b) => {
    switch (filters.sortBy) {
      case 'price-low': {
        const priceA = a.price * (1 - a.discount / 100);
        const priceB = b.price * (1 - b.discount / 100);
        return priceA - priceB;
      }
      case 'price-high': {
        const priceA = a.price * (1 - a.discount / 100);
        const priceB = b.price * (1 - b.discount / 100);
        return priceB - priceA;
      }
      case 'newest':
        return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime();
      case 'rating':
        return b.rating - a.rating;
      case 'relevance':
      default:
        return b.isFeatured ? 1 : -1;
    }
  });

  // Pagination
  const totalPages = Math.ceil(sortedGames.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedGames = sortedGames.slice(startIndex, startIndex + ITEMS_PER_PAGE);

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

  const handleFilterChange = (key: string, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1); // Reset to first page on filter change
  };

  const handleShowOnlyChange = (key: keyof typeof filters.showOnly, checked: boolean) => {
    setFilters(prev => ({
      ...prev,
      showOnly: { ...prev.showOnly, [key]: checked }
    }));
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setFilters({
      priceRange: [0, 100],
      platforms: [],
      categories: [],
      ratings: [],
      sortBy: 'relevance',
      showOnly: {
        onSale: false,
        newReleases: false,
        featured: false,
      }
    });
    setSearchQuery('');
    setCurrentPage(1);
  };

  useEffect(() => {
    if (categoryParam) {
      setFilters(prev => ({
        ...prev,
        categories: [categoryParam]
      }));
    }
  }, [categoryParam]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Browse Games</h1>
          <p className="text-muted-foreground mt-2">
            Discover {games.length} amazing games across all categories
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Filters
                </CardTitle>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    {filteredGames.length} games found
                  </span>
                  <Button variant="ghost" size="sm" onClick={clearFilters}>
                    Clear All
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Search */}
                <div className="space-y-2">
                  <Label>Search</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Search games..."
                      className="pl-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>

                {/* Sort By */}
                <div className="space-y-2">
                  <Label>Sort By</Label>
                  <RadioGroup
                    value={filters.sortBy}
                    onValueChange={(value) => handleFilterChange('sortBy', value)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="relevance" id="relevance" />
                      <Label htmlFor="relevance" className="cursor-pointer">Relevance</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="price-low" id="price-low" />
                      <Label htmlFor="price-low" className="cursor-pointer">Price: Low to High</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="price-high" id="price-high" />
                      <Label htmlFor="price-high" className="cursor-pointer">Price: High to Low</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="newest" id="newest" />
                      <Label htmlFor="newest" className="cursor-pointer">Newest</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="rating" id="rating" />
                      <Label htmlFor="rating" className="cursor-pointer">Highest Rated</Label>
                    </div>
                  </RadioGroup>
                </div>

                <Separator />

                {/* Price Range */}
                <div className="space-y-4">
                  <Label>Price Range</Label>
                  <div className="space-y-4">
                    <Slider
                      value={filters.priceRange}
                      min={0}
                      max={100}
                      step={5}
                      onValueChange={(value) => handleFilterChange('priceRange', value)}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm">
                      <span>${filters.priceRange[0]}</span>
                      <span>${filters.priceRange[1]}</span>
                    </div>
                  </div>
                </div>

                {/* Platforms */}
                <div className="space-y-2">
                  <Label>Platforms</Label>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {PLATFORMS.map(platform => (
                      <div key={platform} className="flex items-center space-x-2">
                        <Checkbox
                          id={`platform-${platform}`}
                          checked={filters.platforms.includes(platform)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              handleFilterChange('platforms', [...filters.platforms, platform]);
                            } else {
                              handleFilterChange('platforms', filters.platforms.filter(p => p !== platform));
                            }
                          }}
                        />
                        <Label htmlFor={`platform-${platform}`} className="cursor-pointer text-sm">
                          {platform}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Categories */}
                <div className="space-y-2">
                  <Label>Categories</Label>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {categories.map(category => (
                      <div key={category.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`category-${category.slug}`}
                          checked={filters.categories.includes(category.slug)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              handleFilterChange('categories', [...filters.categories, category.slug]);
                            } else {
                              handleFilterChange('categories', filters.categories.filter(c => c !== category.slug));
                            }
                          }}
                        />
                        <Label htmlFor={`category-${category.slug}`} className="cursor-pointer text-sm">
                          {category.name} ({category.gameCount})
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Show Only */}
                <div className="space-y-2">
                  <Label>Show Only</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="on-sale"
                        checked={filters.showOnly.onSale}
                        onCheckedChange={(checked) => handleShowOnlyChange('onSale', checked as boolean)}
                      />
                      <Label htmlFor="on-sale" className="cursor-pointer text-sm flex items-center gap-2">
                        <Tag className="h-3 w-3" />
                        On Sale
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="new-releases"
                        checked={filters.showOnly.newReleases}
                        onCheckedChange={(checked) => handleShowOnlyChange('newReleases', checked as boolean)}
                      />
                      <Label htmlFor="new-releases" className="cursor-pointer text-sm flex items-center gap-2">
                        <Clock className="h-3 w-3" />
                        New Releases
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="featured"
                        checked={filters.showOnly.featured}
                        onCheckedChange={(checked) => handleShowOnlyChange('featured', checked as boolean)}
                      />
                      <Label htmlFor="featured" className="cursor-pointer text-sm flex items-center gap-2">
                        <TrendingUp className="h-3 w-3" />
                        Featured Games
                      </Label>
                    </div>
                  </div>
                </div>

                {/* Ratings */}
                <div className="space-y-2">
                  <Label>Minimum Rating</Label>
                  <div className="space-y-2">
                    {[4, 3, 2, 1].map(rating => (
                      <div key={rating} className="flex items-center space-x-2">
                        <Checkbox
                          id={`rating-${rating}`}
                          checked={filters.ratings.includes(rating)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              handleFilterChange('ratings', [rating]);
                            } else {
                              handleFilterChange('ratings', []);
                            }
                          }}
                        />
                        <Label htmlFor={`rating-${rating}`} className="cursor-pointer text-sm flex items-center gap-2">
                          {rating}+
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3 w-3 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                              />
                            ))}
                          </div>
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Games Grid */}
          <div className="lg:col-span-3">
            {/* Controls */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="icon"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="icon"
                  onClick={() => setViewMode('list')}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
              <div className="text-sm text-muted-foreground">
                Showing {startIndex + 1}-{Math.min(startIndex + ITEMS_PER_PAGE, filteredGames.length)} of {filteredGames.length} games
              </div>
            </div>

            {/* Games */}
            {paginatedGames.length > 0 ? (
              viewMode === 'grid' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {paginatedGames.map(game => (
                    <Card key={game.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="relative h-48 overflow-hidden">
                        <div
                          className="h-full w-full bg-cover bg-center transition-transform duration-300 hover:scale-110"
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
                      </div>
                      
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <Link href={`/product/${game.id}`}>
                              <h3 className="font-semibold text-lg hover:text-primary transition-colors">
                                {game.title}
                              </h3>
                            </Link>
                            <p className="text-sm text-muted-foreground line-clamp-1">{game.category}</p>
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
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                          {game.description}
                        </p>
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
                            onClick={() => handleAddToWishlist(game.id, game.title)}
                          >
                            <Star className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => handleAddToCart(game.id, game.title)}
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
                <div className="space-y-4">
                  {paginatedGames.map(game => (
                    <Card key={game.id} className="hover:shadow-lg transition-shadow">
                      <div className="flex">
                        <div className="w-48 flex-shrink-0">
                          <div
                            className="h-full w-full bg-cover bg-center"
                            style={{ backgroundImage: `url(${game.image})` }}
                          />
                        </div>
                        <div className="flex-1 p-6">
                          <div className="flex justify-between items-start">
                            <div>
                              <Link href={`/product/${game.id}`}>
                                <h3 className="text-xl font-semibold hover:text-primary transition-colors">
                                  {game.title}
                                </h3>
                              </Link>
                              <p className="text-muted-foreground mt-1">{game.category}</p>
                              <div className="flex flex-wrap gap-2 mt-3">
                                {game.platform.map(platform => (
                                  <Badge key={platform} variant="outline">
                                    {platform}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <div className="text-right">
                              {game.discount > 0 ? (
                                <>
                                  <span className="text-2xl font-bold">
                                    ${(game.price * (1 - game.discount / 100)).toFixed(2)}
                                  </span>
                                  <div className="text-sm text-muted-foreground line-through">
                                    ${game.price.toFixed(2)}
                                  </div>
                                </>
                              ) : (
                                <span className="text-2xl font-bold">${game.price.toFixed(2)}</span>
                              )}
                            </div>
                          </div>
                          <p className="mt-4 text-muted-foreground">{game.description}</p>
                          <div className="flex items-center justify-between mt-6">
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${i < Math.floor(game.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                                  />
                                ))}
                                <span className="ml-2">{game.rating}</span>
                                <span className="text-muted-foreground ml-1">
                                  ({game.reviews.toLocaleString()})
                                </span>
                              </div>
                              <span className="text-sm text-muted-foreground">
                                Released: {new Date(game.releaseDate).toLocaleDateString()}
                              </span>
                            </div>
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                onClick={() => handleAddToWishlist(game.id, game.title)}
                              >
                                <Star className="h-4 w-4 mr-2" />
                                Wishlist
                              </Button>
                              <Button onClick={() => handleAddToCart(game.id, game.title)}>
                                <ShoppingCart className="h-4 w-4 mr-2" />
                                Add to Cart
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                  <Gamepad2 className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">No games found</h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your filters or search term
                </p>
                <Button onClick={clearFilters}>
                  Clear All Filters
                </Button>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          if (currentPage > 1) setCurrentPage(currentPage - 1);
                        }}
                        className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                      />
                    </PaginationItem>
                    
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }
                      
                      return (
                        <PaginationItem key={pageNum}>
                          <PaginationLink
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              setCurrentPage(pageNum);
                            }}
                            isActive={currentPage === pageNum}
                          >
                            {pageNum}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    })}
                    
                    {totalPages > 5 && currentPage < totalPages - 2 && (
                      <>
                        <PaginationItem>
                          <PaginationEllipsis />
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              setCurrentPage(totalPages);
                            }}
                          >
                            {totalPages}
                          </PaginationLink>
                        </PaginationItem>
                      </>
                    )}
                    
                    <PaginationItem>
                      <PaginationNext
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                        }}
                        className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}