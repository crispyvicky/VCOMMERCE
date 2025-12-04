import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { getProducts } from '../actions';

export default async function NewArrivalsPage() {
    const products = (await getProducts({ limit: 12 })) || [];

    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-1 pt-24 px-6">
                <div className="container mx-auto">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight mb-2">New Arrivals</h1>
                            <p className="text-muted-foreground">The latest additions to our collection.</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {products.map((product: any) => (
                            <ProductCard key={product._id} {...product} />
                        ))}
                    </div>

                    {products.length === 0 && (
                        <div className="text-center py-20">
                            <p className="text-gray-500">No new arrivals yet. Check back soon!</p>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}
