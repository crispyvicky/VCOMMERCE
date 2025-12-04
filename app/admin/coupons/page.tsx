import { getCoupons, deleteCoupon } from '@/app/actions';
import Link from 'next/link';
import { Plus, Trash2, Tag } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function CouponsPage() {
    const coupons = await getCoupons();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Coupons</h1>
                    <p className="text-muted-foreground">Manage discounts and promotions.</p>
                </div>
                <Link
                    href="/admin/coupons/new"
                    className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
                >
                    <Plus size={20} />
                    Create Coupon
                </Link>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 text-gray-500 font-medium">
                        <tr>
                            <th className="px-6 py-3">Code</th>
                            <th className="px-6 py-3">Discount</th>
                            <th className="px-6 py-3">Usage</th>
                            <th className="px-6 py-3">Status</th>
                            <th className="px-6 py-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {coupons.map((coupon: any) => (
                            <tr key={coupon._id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 font-medium font-mono">{coupon.code}</td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <Tag size={14} className="text-gray-400" />
                                        {coupon.discountType === 'percentage' ? `${coupon.value}%` : `$${coupon.value}`}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    {coupon.usedCount} / {coupon.usageLimit || '∞'}
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${coupon.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                        }`}>
                                        {coupon.isActive ? 'Active' : 'Inactive'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <form action={async () => {
                                        'use server';
                                        await deleteCoupon(coupon._id);
                                    }}>
                                        <button className="text-red-500 hover:text-red-700 transition-colors">
                                            <Trash2 size={18} />
                                        </button>
                                    </form>
                                </td>
                            </tr>
                        ))}
                        {coupons.length === 0 && (
                            <tr>
                                <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">
                                    No coupons found. Create one to get started.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
