import ProductCard from './ProductCard';

interface Product {
    _id: string;
    name: string;
    price: number;
    images: string[];
    category: string;
}

interface ProductGridProps {
    products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
    if (products.length === 0) {
        return (
            <div className="text-center py-20">
                <h3 className="text-xl font-semibold mb-2">No products found</h3>
                <p className="text-muted-foreground">Try adjusting your filters.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
                <ProductCard
                    key={product._id}
                    _id={product._id}
                    name={product.name}
                    price={product.price}
                    images={product.images}
                    category={product.category}
                />
            ))}
        </div>
    );
}
