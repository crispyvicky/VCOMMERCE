'use client';

import { DollarSign, ShoppingBag, Users, AlertTriangle, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import clsx from 'clsx';
import SalesChart from '@/app/components/admin/SalesChart';

export default function AdminDashboard() {
    // Mock Metrics Data
    const metrics = [
        {
            label: 'Total Revenue',
            value: '$45,231.89',
            change: '+20.1%',
            trend: 'up',
            icon: DollarSign,
            color: 'text-green-600',
            bg: 'bg-green-100',
        },
        {
            label: 'Orders',
            value: '+2350',
            change: '+180.1%',
            trend: 'up',
            icon: ShoppingBag,
            color: 'text-blue-600',
            bg: 'bg-blue-100',
        },
        {
            label: 'Customers',
            value: '+12,234',
            change: '+19%',
            trend: 'up',
            icon: Users,
            color: 'text-purple-600',
            bg: 'bg-purple-100',
        },
        {
            label: 'Low Stock',
            value: '7',
            change: '-2',
            trend: 'down',
            icon: AlertTriangle,
            color: 'text-orange-600',
            bg: 'bg-orange-100',
        },
    ];

    // Mock Recent Orders
    const recentOrders = [
        { id: '#ORD-7352', customer: 'Alice Freeman', date: 'Oct 24, 2023', total: '$125.00', status: 'Pending' },
        { id: '#ORD-7351', customer: 'Josefina Hall', date: 'Oct 24, 2023', total: '$450.00', status: 'Processing' },
        { id: '#ORD-7350', customer: 'Lura Nienow', date: 'Oct 23, 2023', total: '$89.00', status: 'Shipped' },
        { id: '#ORD-7349', customer: 'Galen Spinka', date: 'Oct 23, 2023', total: '$210.50', status: 'Delivered' },
        { id: '#ORD-7348', customer: 'Marlen Kautzer', date: 'Oct 22, 2023', total: '$65.00', status: 'Cancelled' },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                <p className="text-muted-foreground">Overview of your store's performance.</p>
            </div>

            {/* Metrics Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {metrics.map((metric) => (
                    <div key={metric.label} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`p-2 rounded-lg ${metric.bg}`}>
                                <metric.icon className={`w-6 h-6 ${metric.color}`} />
                            </div>
                            <span className={`flex items-center text-xs font-medium ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                                {metric.change}
                                {metric.trend === 'up' ? <ArrowUpRight size={14} className="ml-1" /> : <ArrowDownRight size={14} className="ml-1" />}
                            </span>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">{metric.label}</p>
                            <h3 className="text-2xl font-bold mt-1">{metric.value}</h3>
                        </div>
                    </div>
                ))}
            </div>

            {/* Recent Orders & Charts */}
            <div className="grid gap-6 md:grid-cols-7">
                {/* Sales Chart - Takes up 4 columns */}
                <div className="md:col-span-4 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <h3 className="font-semibold text-lg mb-4">Revenue Analytics</h3>
                    <div className="h-80">
                        <SalesChart />
                    </div>
                </div>

                {/* Top Products - Takes up 3 columns */}
                <div className="md:col-span-3 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <h3 className="font-semibold text-lg mb-6">Top Selling Products</h3>
                    <div className="space-y-6">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-gray-100 rounded-md" />
                                <div className="flex-1">
                                    <h4 className="font-medium text-sm">Premium Silk Saree</h4>
                                    <p className="text-xs text-muted-foreground">24 sales this week</p>
                                </div>
                                <span className="font-semibold text-sm">$2,400</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Orders - Full width below */}
                <div className="md:col-span-7 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-100">
                        <h3 className="font-semibold text-lg">Recent Orders</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-gray-50 text-gray-500 font-medium">
                                <tr>
                                    <th className="px-6 py-3">Order ID</th>
                                    <th className="px-6 py-3">Customer</th>
                                    <th className="px-6 py-3">Date</th>
                                    <th className="px-6 py-3">Total</th>
                                    <th className="px-6 py-3">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {recentOrders.map((order) => (
                                    <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 font-medium">{order.id}</td>
                                        <td className="px-6 py-4">{order.customer}</td>
                                        <td className="px-6 py-4 text-gray-500">{order.date}</td>
                                        <td className="px-6 py-4 font-medium">{order.total}</td>
                                        <td className="px-6 py-4">
                                            <span className={clsx(
                                                'px-2.5 py-0.5 rounded-full text-xs font-medium',
                                                order.status === 'Pending' && 'bg-gray-100 text-gray-700',
                                                order.status === 'Processing' && 'bg-yellow-100 text-yellow-700',
                                                order.status === 'Shipped' && 'bg-blue-100 text-blue-700',
                                                order.status === 'Delivered' && 'bg-green-100 text-green-700',
                                                order.status === 'Cancelled' && 'bg-red-100 text-red-700',
                                            )}>
                                                {order.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
