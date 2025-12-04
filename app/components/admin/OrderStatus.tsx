'use client';

import { useState } from 'react';
import { updateOrderStatus } from '@/app/actions';
import { useRouter } from 'next/navigation';

export default function OrderStatus({ orderId, currentStatus }: { orderId: string, currentStatus: string }) {
    const [status, setStatus] = useState(currentStatus);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newStatus = e.target.value;
        setStatus(newStatus);
        setLoading(true);

        const result = await updateOrderStatus(orderId, newStatus);

        if (result.success) {
            router.refresh();
        } else {
            alert('Failed to update status');
            setStatus(currentStatus); // Revert
        }
        setLoading(false);
    };

    return (
        <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700">Status:</label>
            <select
                value={status}
                onChange={handleStatusChange}
                disabled={loading}
                className={`text-sm font-medium rounded-md border-gray-300 shadow-sm focus:border-[var(--primary)] focus:ring focus:ring-[var(--primary)]/20 py-1.5 pl-3 pr-8 bg-white ${status === 'delivered' ? 'text-green-700 bg-green-50' :
                        status === 'shipped' ? 'text-blue-700 bg-blue-50' :
                            status === 'processing' ? 'text-yellow-700 bg-yellow-50' :
                                status === 'cancelled' ? 'text-red-700 bg-red-50' :
                                    'text-gray-700 bg-gray-50'
                    }`}
            >
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
            </select>
        </div>
    );
}
