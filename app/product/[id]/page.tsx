import { getProduct, getProductReviews, getRelatedProducts } from '@/app/actions';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import ProductDetails from '@/app/components/ProductDetails';
import ReviewSection from '@/app/components/ReviewSection';
import ProductCard from '@/app/components/ProductCard';
import { notFound } from 'next/navigation';

import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const { id } = await params;
    let product = null;
    try {
        product = await getProduct(id);
    } catch (error) {
        console.warn(`Failed to fetch product metadata for ${id}:`, error);
    }

    if (!product) {
        return {
            title: 'Product Not Found',
        };
    }

    return {
        title: `${product.name} | Vasthra`,
        description: product.description,
        openGraph: {
            title: product.name,
            description: product.description,
            images: [product.images[0]],
        },
    };
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    let product = null;
    let reviews: any[] = [];

    try {
        product = await getProduct(id);
    } catch (error) {
        console.warn(`Failed to fetch product ${id}:`, error);
    }

    try {
        reviews = await getProductReviews(id);
    } catch (error) {
        console.warn(`Failed to fetch reviews for ${id}:`, error);
    }

    if (!product) {
        notFound();
    }

    let relatedProducts: any[] = [];
    try {
        relatedProducts = await getRelatedProducts(id, product.category);
    } catch (error) {
        console.warn(`Failed to fetch related products for ${id}:`, error);
    }

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.name,
        image: product.images,
        description: product.description,
        sku: product._id,
        offers: {
            '@type': 'Offer',
            price: product.price,
            priceCurrency: 'USD',
            availability: product.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
        },
    };

    return (
        <main className="min-h-screen flex flex-col">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <Header />
            <ProductDetails product={product} />
            <div className="container mx-auto px-6 pb-20">
                <ReviewSection productId={id} reviews={reviews} />

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <div className="mt-20 border-t border-gray-100 pt-12">
                        <h2 className="text-2xl font-bold mb-8">You Might Also Like</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {relatedProducts.map((product: any) => (
                                <ProductCard key={product._id} {...product} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </main>
    );
}
