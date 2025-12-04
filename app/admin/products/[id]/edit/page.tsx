import ProductForm from '@/app/components/admin/ProductForm';
import { getProduct } from '@/app/actions';
import { notFound } from 'next/navigation';

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const product = await getProduct(id);

    if (!product) {
        notFound();
    }

    return <ProductForm initialData={product} isEdit={true} />;
}
