'use client';

import { Edit, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { deleteProduct } from '@/app/actions';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function ProductActions({ productId }: { productId: string }) {
    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        if (!confirm('Are you sure you want to delete this product?')) return;

        setIsDeleting(true);
        const result = await deleteProduct(productId);

        if (result.success) {
            router.refresh();
        } else {
            alert('Failed to delete product');
        }
        setIsDeleting(false);
    };

    return (
        <div className="flex items-center justify-end gap-2">
            <Link
                href={`/admin/products/${productId}/edit`}
                className="p-1 text-gray-400 hover:text-[var(--primary)] transition-colors"
            >
                <Edit size={18} />
            </Link>
            <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="p-1 text-gray-400 hover:text-red-600 transition-colors disabled:opacity-50"
            >
                <Trash2 size={18} />
            </button>
        </div>
    );
}
