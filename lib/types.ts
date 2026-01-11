export interface Game {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  price: number;
  discount: number;
  category: string;
  subcategories: string[];
  rating: number;
  reviews: number;
  image: string;
  screenshots: string[];
  platform: string[];
  releaseDate: string;
  developer: string;
  publisher: string;
  tags: string[];
  features: string[];
  systemRequirements: {
    minimum: string[];
    recommended: string[];
  };
  isFeatured: boolean;
  isOnSale: boolean;
  isNewRelease: boolean;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  icon: string;
  gameCount: number;
  color: string;
}

export interface FilterOptions {
  priceRange: [number, number];
  platforms: string[];
  categories: string[];
  ratings: number[];
  sortBy: 'relevance' | 'price-low' | 'price-high' | 'newest' | 'rating';
}