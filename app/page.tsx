import Header from "./components/Header";
import Hero from "./components/Hero";
import ProductCard from "./components/ProductCard";
import Footer from "./components/Footer";
import EditorialSection from "./components/EditorialSection";
import GallerySection from "./components/GallerySection";
import { getProducts } from "./actions";

export const dynamic = 'force-dynamic';

export default async function Home() {
  // Fetch featured products from MongoDB
  let featuredProducts: any[] = [];
  try {
    featuredProducts = await getProducts({ limit: 4, isFeatured: true });
  } catch (error) {
    console.warn('Failed to fetch featured products:', error);
  }

  // If no featured products, fallback to latest 4
  let productsToShow = featuredProducts;
  if (productsToShow.length === 0) {
    try {
      productsToShow = await getProducts({ limit: 4 });
    } catch (error) {
      console.warn('Failed to fetch fallback products:', error);
      productsToShow = [];
    }
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <Hero />
      <EditorialSection />
      <GallerySection />

      <section className="py-24 container mx-auto px-6">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Collections</h2>
            <p className="text-muted-foreground max-w-md">
              Handpicked favorites from our latest season.
            </p>
          </div>
          <a href="/collections" className="text-[var(--primary)] hover:text-white transition-colors font-medium hidden md:block">
            View All &rarr;
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {productsToShow.length > 0 ? (
            productsToShow.map((product) => (
              <ProductCard key={product._id} {...product} />
            ))
          ) : (
            <div className="col-span-4 text-center py-10 text-muted-foreground">
              No products found. Please run the seed script.
            </div>
          )}
        </div>

        <div className="mt-12 text-center md:hidden">
          <a href="/collections" className="text-[var(--primary)] hover:text-white transition-colors font-medium">
            View All &rarr;
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
