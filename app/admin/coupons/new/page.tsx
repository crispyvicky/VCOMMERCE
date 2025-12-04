'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createCoupon } from '@/app/actions';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function NewCouponPage() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        const formData = new FormData(e.currentTarget);
        const data = {
            code: formData.get('code'),
            discountType: formData.get('discountType'),
            value: Number(formData.get('value')),
            expiryDate: formData.get('expiryDate'),
            usageLimit: formData.get('usageLimit') ? Number(formData.get('usageLimit')) : null,
        };

        const result = await createCoupon(data);

        if (result.success) {
            router.push('/admin/coupons');
        } else {
            setError(result.error || 'Failed to create coupon');
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="mb-6">
                <Link href="/admin/coupons" className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 mb-2">
                    <ArrowLeft size={16} />
                    Back to Coupons
                </Link>
                <h1 className="text-3xl font-bold">Create New Coupon</h1>
            </div>

            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-6">
                <div>
                    <label className="block text-sm font-medium mb-2">Coupon Code</label>
                    <input
                        name="code"
                        type="text"
                        required
                        placeholder="e.g. SUMMER20"
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-black uppercase"
                    />
                </div>

                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium mb-2">Discount Type</label>
                        <select
                            name="discountType"
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-black"
                        >
                            <option value="percentage">Percentage (%)</option>
                            <option value="fixed">Fixed Amount ($)</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Value</label>
                        <input
                            name="value"
                            type="number"
                            required
                            min="0"
                            step="0.01"
                            placeholder="e.g. 20"
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-black"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium mb-2">Expiry Date</label>
                        <input
                            name="expiryDate"
                            type="date"
                            required
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-black"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Usage Limit (Optional)</label>
                        <input
                            name="usageLimit"
                            type="number"
                            min="1"
                            placeholder="Unlimited"
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-black"
                        />
                    </div>
                </div>

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <div className="flex justify-end pt-4">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-black text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:opacity-50"
                    >
                        {isSubmitting ? 'Creating...' : 'Create Coupon'}
                    </button>
                </div>
            </form>
        </div>
    );
}
