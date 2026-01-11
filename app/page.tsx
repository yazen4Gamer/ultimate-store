import Navbar from "@/components/navbar";
import HeroBanner from "@/components/hero-banner";
import FeaturedGames from "@/components/featured-games";
import Categories from "@/components/categories";
import Footer from "@/components/footer";
export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroBanner />
        <FeaturedGames />
        <Categories />
        {/* Add more sections here as needed */}
      </main>
      <Footer />
    </div>
  );
}