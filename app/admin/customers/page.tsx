import { Search, Mail, MapPin } from 'lucide-react';
import { getCustomers } from '@/app/actions';

export const dynamic = 'force-dynamic';

export default async function CustomersPage() {
    const customers = await getCustomers();

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Customers</h1>
                    <p className="text-muted-foreground text-sm">Insights on your customer base.</p>
                </div>
            </div>

            {/* Search Bar */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                    type="text"
                    placeholder="Search customers..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-[var(--primary)]"
                />
            </div>

            {/* Customers Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-3 whitespace-nowrap">Customer</th>
                                <th className="px-6 py-3 whitespace-nowrap">Location</th>
                                <th className="px-6 py-3 whitespace-nowrap">Orders</th>
                                <th className="px-6 py-3 whitespace-nowrap">Total Spent</th>
                                <th className="px-6 py-3 whitespace-nowrap">Last Order</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {customers.map((customer) => (
                                <tr key={customer._id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="font-medium text-gray-900">{customer.name}</div>
                                        <div className="text-xs text-gray-500 flex items-center gap-1">
                                            <Mail size={12} />
                                            {customer.email}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-500">
                                        <div className="flex items-center gap-1">
                                            <MapPin size={14} />
                                            {customer.city || 'N/A'}, {customer.country || 'N/A'}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 font-medium">
                                        {customer.orderCount}
                                    </td>
                                    <td className="px-6 py-4 font-medium text-green-600">
                                        ${customer.totalSpent.toFixed(2)}
                                    </td>
                                    <td className="px-6 py-4 text-gray-500">
                                        {customer.lastOrderDate ? new Date(customer.lastOrderDate).toLocaleDateString() : 'N/A'}
                                    </td>
                                </tr>
                            ))}
                            {customers.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">
                                        No customers found yet.
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
