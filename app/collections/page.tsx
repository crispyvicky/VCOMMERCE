import { getProducts } from '@/app/actions';
import ProductGrid from '@/app/components/ProductGrid';
import FilterSidebar from '@/app/components/FilterSidebar';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';

export const dynamic = 'force-dynamic';

export default async function CollectionsPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const params = await searchParams;
    const category = typeof params.category === 'string' ? params.category : undefined;
    const minPrice = typeof params.minPrice === 'string' ? parseInt(params.minPrice) : undefined;
    const maxPrice = typeof params.maxPrice === 'string' ? parseInt(params.maxPrice) : undefined;

    const products = await getProducts({ category, minPrice, maxPrice });

    return (
        <main className="min-h-screen flex flex-col">
            <Header />

            <div className="bg-[var(--secondary)] py-12 mt-20">
                <div className="container mx-auto px-6">
                    <h1 className="text-4xl font-bold mb-2">Collections</h1>
                    <p className="text-muted-foreground">
                        Explore our exclusive range of premium apparel.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-6 py-12 flex flex-col md:flex-row gap-12">
                <FilterSidebar />
                <div className="flex-1">
                    <ProductGrid products={products} />
                </div>
            </div>

            <Footer />
        </main>
    );
}
