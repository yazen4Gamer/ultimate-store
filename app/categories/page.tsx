import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Gamepad2, TrendingUp, Users, Clock } from "lucide-react";
import { categories } from "@/lib/data";

export default function CategoriesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Game Categories</h1>
          <p className="text-muted-foreground mt-2">
            Browse games by genre and discover your next favorite
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Categories</p>
                  <h3 className="text-2xl font-bold">{categories.length}</h3>
                </div>
                <div className="p-3 rounded-full bg-primary/10">
                  <Gamepad2 className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Games</p>
                  <h3 className="text-2xl font-bold">
                    {categories.reduce((total, cat) => total + cat.gameCount, 0).toLocaleString()}
                  </h3>
                </div>
                <div className="p-3 rounded-full bg-green-100">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Most Popular</p>
                  <h3 className="text-2xl font-bold">Shooter</h3>
                </div>
                <div className="p-3 rounded-full bg-blue-100">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">New Releases</p>
                  <h3 className="text-2xl font-bold">24</h3>
                </div>
                <div className="p-3 rounded-full bg-purple-100">
                  <Clock className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Categories Grid */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">All Categories</h2>
            <div className="text-sm text-muted-foreground">
              Click on any category to browse games
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categories.map(category => (
              <Card
                key={category.id}
                className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
              >
                <div className={`h-3 ${category.color}`} />
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-xl">{category.name}</CardTitle>
                      <CardDescription>{category.description}</CardDescription>
                    </div>
                    <span className="text-3xl">{category.icon}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Games Available</span>
                      <Badge variant="secondary">{category.gameCount.toLocaleString()}</Badge>
                    </div>
                    <Separator />
                    <div className="text-sm text-muted-foreground">
                      Popular in this category:
                      <div className="flex flex-wrap gap-2 mt-2">
                        {getCategoryTags(category.name).map(tag => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
                <div className="px-6 pb-6">
                  <Button
                    asChild
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                  >
                    <a href={`/products?category=${category.slug}`}>
                      Browse Games
                    </a>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Category Comparison */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Category Comparison</CardTitle>
            <CardDescription>
              See how different categories stack up against each other
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-semibold">Category</th>
                    <th className="text-left py-3 px-4 font-semibold">Game Count</th>
                    <th className="text-left py-3 px-4 font-semibold">Avg. Price</th>
                    <th className="text-left py-3 px-4 font-semibold">Avg. Rating</th>
                    <th className="text-left py-3 px-4 font-semibold">New Releases</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map(category => (
                    <tr key={category.id} className="border-b hover:bg-muted/50">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{category.icon}</span>
                          <div>
                            <div className="font-medium">{category.name}</div>
                            <div className="text-sm text-muted-foreground">{category.description}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant="outline">{category.gameCount}</Badge>
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-medium">${getCategoryAvgPrice(category.name).toFixed(2)}</div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <div
                                key={i}
                                className={`h-2 w-2 rounded-full ${
                                  i < getCategoryAvgRating(category.name) 
                                    ? 'bg-yellow-400' 
                                    : 'bg-gray-200'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm">{getCategoryAvgRating(category.name).toFixed(1)}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-medium">{getNewReleasesCount(category.name)}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Recommendations */}
        <Card>
          <CardHeader>
            <CardTitle>Not Sure Where to Start?</CardTitle>
            <CardDescription>
              Get personalized recommendations based on your preferences
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-4 p-6 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-100">
                    <Gamepad2 className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold">New to Gaming?</h4>
                    <p className="text-sm text-muted-foreground">Start with these beginner-friendly games</p>
                  </div>
                </div>
                <ul className="space-y-2">
                  {['Minecraft', 'Stardew Valley', 'Portal 2'].map(game => (
                    <li key={game} className="flex items-center justify-between text-sm">
                      <span>{game}</span>
                      <Button size="sm" variant="outline" asChild>
                        <a href={`/products?search=${game}`}>View</a>
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4 p-6 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-green-100">
                    <Users className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Multiplayer Games</h4>
                    <p className="text-sm text-muted-foreground">Play with friends online</p>
                  </div>
                </div>
                <ul className="space-y-2">
                  {['Among Us', 'Fortnite', 'Call of Duty'].map(game => (
                    <li key={game} className="flex items-center justify-between text-sm">
                      <span>{game}</span>
                      <Button size="sm" variant="outline" asChild>
                        <a href={`/products?search=${game}`}>View</a>
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4 p-6 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-purple-100">
                    <Clock className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Story-Driven Games</h4>
                    <p className="text-sm text-muted-foreground">Immersive narratives and rich worlds</p>
                  </div>
                </div>
                <ul className="space-y-2">
                  {['The Witcher 3', 'Red Dead Redemption 2', 'God of War'].map(game => (
                    <li key={game} className="flex items-center justify-between text-sm">
                      <span>{game}</span>
                      <Button size="sm" variant="outline" asChild>
                        <a href={`/products?search=${game}`}>View</a>
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}

// Helper functions
function getCategoryTags(categoryName: string): string[] {
  const tagsMap: Record<string, string[]> = {
    'Action': ['Combat', 'Adventure', 'Fast-paced'],
    'Adventure': ['Exploration', 'Story', 'Puzzle'],
    'RPG': ['Character', 'Progression', 'Quest'],
    'Shooter': ['FPS', 'Multiplayer', 'Action'],
    'Sports': ['Simulation', 'Competitive', 'Realistic'],
    'Strategy': ['Tactical', 'Planning', 'Resource'],
    'Puzzle': ['Brain', 'Logic', 'Challenge'],
    'Horror': ['Survival', 'Suspense', 'Thriller'],
  };
  return tagsMap[categoryName] || ['Popular', 'Featured', 'New'];
}

function getCategoryAvgPrice(categoryName: string): number {
  const prices: Record<string, number> = {
    'Action': 49.99,
    'Adventure': 39.99,
    'RPG': 54.99,
    'Shooter': 59.99,
    'Sports': 64.99,
    'Strategy': 44.99,
    'Puzzle': 24.99,
    'Horror': 34.99,
  };
  return prices[categoryName] || 49.99;
}

function getCategoryAvgRating(categoryName: string): number {
  const ratings: Record<string, number> = {
    'Action': 4.3,
    'Adventure': 4.5,
    'RPG': 4.6,
    'Shooter': 4.2,
    'Sports': 4.1,
    'Strategy': 4.4,
    'Puzzle': 4.0,
    'Horror': 4.3,
  };
  return ratings[categoryName] || 4.3;
}

function getNewReleasesCount(categoryName: string): number {
  const counts: Record<string, number> = {
    'Action': 12,
    'Adventure': 8,
    'RPG': 6,
    'Shooter': 15,
    'Sports': 9,
    'Strategy': 4,
    'Puzzle': 7,
    'Horror': 5,
  };
  return counts[categoryName] || 8;
}