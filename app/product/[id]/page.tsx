import { getProduct } from '@/app/actions';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import ProductDetails from '@/app/components/ProductDetails';
import { notFound } from 'next/navigation';

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const product = await getProduct(id);

    if (!product) {
        notFound();
    }

    return (
        <main className="min-h-screen flex flex-col">
            <Header />
            <ProductDetails product={product} />
            <Footer />
        </main>
    );
}
