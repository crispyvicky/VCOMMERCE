import Link from 'next/link';
import { Search, Eye } from 'lucide-react';
import { getOrders } from '@/app/actions';
import clsx from 'clsx';

export default async function OrdersPage() {
    const orders = await getOrders();

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Orders</h1>
                    <p className="text-muted-foreground text-sm">Manage and track customer orders.</p>
                </div>
            </div>

            {/* Search Bar */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                    type="text"
                    placeholder="Search orders..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-[var(--primary)]"
                />
            </div>

            {/* Orders Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-3 whitespace-nowrap">Order ID</th>
                                <th className="px-6 py-3 whitespace-nowrap">Customer</th>
                                <th className="px-6 py-3 whitespace-nowrap">Date</th>
                                <th className="px-6 py-3 whitespace-nowrap">Total</th>
                                <th className="px-6 py-3 whitespace-nowrap">Status</th>
                                <th className="px-6 py-3 whitespace-nowrap text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {orders.map((order) => (
                                <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 font-medium">#{order._id.slice(-6).toUpperCase()}</td>
                                    <td className="px-6 py-4">
                                        <div className="font-medium text-gray-900">{order.customer.name}</div>
                                        <div className="text-xs text-gray-500">{order.customer.email}</div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-500">
                                        {new Date(order.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 font-medium">${order.total.toFixed(2)}</td>
                                    <td className="px-6 py-4">
                                        <span className={clsx(
                                            'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                                            order.status === 'delivered' && 'bg-green-100 text-green-800',
                                            order.status === 'shipped' && 'bg-blue-100 text-blue-800',
                                            order.status === 'processing' && 'bg-yellow-100 text-yellow-800',
                                            order.status === 'pending' && 'bg-gray-100 text-gray-800',
                                            order.status === 'cancelled' && 'bg-red-100 text-red-800',
                                        )}>
                                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <Link
                                            href={`/admin/orders/${order._id}`}
                                            className="inline-flex items-center justify-center p-2 text-gray-400 hover:text-[var(--primary)] transition-colors"
                                        >
                                            <Eye size={18} />
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                            {orders.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-muted-foreground">
                                        No orders found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
