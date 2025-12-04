import { getProducts } from '@/app/actions';
import ProductCard from '@/app/components/ProductCard';
import { Search } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function SearchPage({
    searchParams,
}: {
    searchParams: Promise<{ q?: string }>;
}) {
    // Await searchParams for Next.js 15 compatibility
    const { q } = await searchParams;
    const query = q || '';

    const products = query ? await getProducts({ search: query }) : [];

    return (
        <div className="container mx-auto px-6 py-12 mt-20 min-h-[60vh]">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">
                    {query ? `Search Results for "${query}"` : 'Search Products'}
                </h1>
                <p className="text-muted-foreground">
                    {products.length} {products.length === 1 ? 'result' : 'results'} found
                </p>
            </div>

            {products.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {products.map((product: any) => (
                        <ProductCard key={product._id} {...product} />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="bg-gray-100 p-6 rounded-full mb-4">
                        <Search size={48} className="text-gray-400" />
                    </div>
                    <h2 className="text-xl font-semibold mb-2">No products found</h2>
                    <p className="text-muted-foreground max-w-md">
                        We couldn't find any products matching "{query}". Try checking for typos or using different keywords.
                    </p>
                </div>
            )}
        </div>
    );
}
