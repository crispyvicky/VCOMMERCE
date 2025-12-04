'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createProduct, updateProduct } from '@/app/actions';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import ImageUpload from '@/app/components/admin/ImageUpload';
import { CATEGORIES } from '@/lib/constants';

interface ProductFormProps {
    initialData?: any;
    isEdit?: boolean;
}

export default function ProductForm({ initialData, isEdit = false }: ProductFormProps) {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: initialData?.name || '',
        description: initialData?.description || '',
        price: initialData?.price || '',
        category: initialData?.category || '',
        images: initialData?.images || [] as string[],
        sizes: initialData?.sizes?.join(', ') || '',
        colors: initialData?.colors?.join(', ') || '',
        inStock: initialData?.inStock ?? true,
        isFeatured: initialData?.isFeatured ?? false,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;

        if (type === 'checkbox') {
            setFormData({ ...formData, [name]: (e.target as HTMLInputElement).checked });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleImageChange = (urls: string[]) => {
        setFormData({ ...formData, images: urls });
    };

    const handleImageRemove = (url: string) => {
        setFormData({
            ...formData,
            images: formData.images.filter((current: string) => current !== url),
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Parse comma-separated strings into arrays
        const sizesArray = formData.sizes.split(',').map((s: string) => s.trim()).filter((s: string) => s);
        const colorsArray = formData.colors.split(',').map((c: string) => c.trim()).filter((c: string) => c);

        const productData = {
            ...formData,
            price: parseFloat(formData.price),
            sizes: sizesArray,
            colors: colorsArray,
        };

        let result;
        if (isEdit && initialData?._id) {
            result = await updateProduct(initialData._id, productData);
        } else {
            result = await createProduct(productData);
        }

        if (result.success) {
            router.push('/admin/products');
            router.refresh();
        } else {
            alert(`Failed to ${isEdit ? 'update' : 'create'} product`);
        }
        setIsSubmitting(false);
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
                <Link href="/admin/products" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <ChevronLeft size={24} />
                </Link>
                <h1 className="text-2xl font-bold tracking-tight">{isEdit ? 'Edit Product' : 'Add New Product'}</h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-xl shadow-sm border border-gray-100">

                {/* Basic Info */}
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Product Name</label>
                        <input
                            type="text"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-[var(--primary)]"
                            placeholder="e.g. Premium Silk Saree"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Description</label>
                        <textarea
                            name="description"
                            required
                            rows={4}
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-[var(--primary)]"
                            placeholder="Product description..."
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Price ($)</label>
                            <input
                                type="number"
                                name="price"
                                required
                                step="0.01"
                                value={formData.price}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-[var(--primary)]"
                                placeholder="0.00"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Category</label>
                            <select
                                name="category"
                                required
                                value={formData.category}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-[var(--primary)] bg-white"
                            >
                                <option value="">Select Category</option>
                                {CATEGORIES.map((cat) => (
                                    <option key={cat} value={cat}>
                                        {cat}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Images */}
                <div>
                    <label className="block text-sm font-medium mb-1">Product Images</label>
                    <ImageUpload
                        value={formData.images}
                        onChange={handleImageChange}
                        onRemove={handleImageRemove}
                    />
                </div>

                {/* Variants */}
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Sizes (Comma separated)</label>
                        <input
                            type="text"
                            name="sizes"
                            value={formData.sizes}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-[var(--primary)]"
                            placeholder="S, M, L, XL"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Colors (Comma separated)</label>
                        <input
                            type="text"
                            name="colors"
                            value={formData.colors}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-[var(--primary)]"
                            placeholder="Red, Blue, Green"
                        />
                    </div>
                </div>

                {/* Settings */}
                <div className="flex items-center gap-8 pt-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            name="inStock"
                            checked={formData.inStock}
                            onChange={handleChange}
                            className="w-4 h-4 text-[var(--primary)] rounded focus:ring-[var(--primary)]"
                        />
                        <span className="text-sm font-medium">In Stock</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            name="isFeatured"
                            checked={formData.isFeatured}
                            onChange={handleChange}
                            className="w-4 h-4 text-[var(--primary)] rounded focus:ring-[var(--primary)]"
                        />
                        <span className="text-sm font-medium">Featured Product</span>
                    </label>
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[var(--primary)] text-white py-3 rounded-md font-bold hover:bg-teal-700 transition-colors disabled:opacity-50"
                >
                    {isSubmitting ? 'Saving...' : (isEdit ? 'Update Product' : 'Create Product')}
                </button>

            </form>
        </div>
    );
}
