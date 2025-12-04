'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, Package, MapPin, CreditCard, Calendar } from 'lucide-react';
import { updateOrderStatus } from '@/app/actions';
import clsx from 'clsx';

// Since this is a client component but needs data, we should pass data from a server wrapper.
// But for simplicity and consistency with previous patterns, I'll assume we pass data as props 
// or fetch it. To stick to the pattern of "Server Page -> Client Component" or "Server Page with Actions",
// let's make the page a Server Component and a small Client Component for the status dropdown.

// WAIT: I can't easily mix them in one file without separate components.
// I'll make this a Server Component that imports a Client Component for the status update.
// Actually, for speed, I'll make a separate client component `OrderStatusUpdater`.

// Let's create the page as Server Component first.

// ... wait, I need to write the file content. I'll write the Server Page here and the Client Component in a separate file or inline if possible (not possible for 'use client' mixed).
// I will create `app/admin/orders/[id]/page.tsx` as Server Component and `app/components/admin/OrderStatus.tsx` as Client Component.

// FILE: app/admin/orders/[id]/page.tsx
import { getOrder } from '@/app/actions';
import { notFound } from 'next/navigation';
import OrderStatus from '@/app/components/admin/OrderStatus';

export default async function OrderDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const order = await getOrder(id);

    if (!order) {
        notFound();
    }

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center gap-4">
                <Link href="/admin/orders" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <ChevronLeft size={24} />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Order #{order._id.slice(-6).toUpperCase()}</h1>
                    <p className="text-muted-foreground text-sm">
                        Placed on {new Date(order.createdAt).toLocaleDateString()} at {new Date(order.createdAt).toLocaleTimeString()}
                    </p>
                </div>
                <div className="ml-auto">
                    <OrderStatus orderId={order._id} currentStatus={order.status} />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="md:col-span-2 space-y-6">
                    {/* Items */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="p-6 border-b border-gray-100">
                            <h3 className="font-semibold flex items-center gap-2">
                                <Package size={18} />
                                Order Items
                            </h3>
                        </div>
                        <div className="divide-y divide-gray-100">
                            {order.items.map((item: any, idx: number) => (
                                <div key={idx} className="p-6 flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-gray-100 rounded-md flex items-center justify-center text-xs text-gray-500">
                                            IMG
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900">{item.name}</p>
                                            <p className="text-sm text-muted-foreground">
                                                Qty: {item.quantity} {item.size && `• Size: ${item.size}`} {item.color && `• Color: ${item.color}`}
                                            </p>
                                        </div>
                                    </div>
                                    <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                                </div>
                            ))}
                        </div>
                        <div className="bg-gray-50 p-6 border-t border-gray-100">
                            <div className="flex justify-between font-bold text-lg">
                                <span>Total</span>
                                <span>${order.total.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar Info */}
                <div className="space-y-6">
                    {/* Customer */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h3 className="font-semibold mb-4 flex items-center gap-2">
                            <MapPin size={18} />
                            Shipping Details
                        </h3>
                        <div className="space-y-1 text-sm">
                            <p className="font-medium text-gray-900">{order.customer.name}</p>
                            <p className="text-muted-foreground">{order.customer.email}</p>
                            <div className="mt-2 text-gray-600">
                                <p>{order.customer.address}</p>
                                <p>{order.customer.city}, {order.customer.zip}</p>
                                <p>{order.customer.country}</p>
                            </div>
                        </div>
                    </div>

                    {/* Payment */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h3 className="font-semibold mb-4 flex items-center gap-2">
                            <CreditCard size={18} />
                            Payment Info
                        </h3>
                        <div className="text-sm">
                            <p className="text-gray-600 capitalize">Method: <span className="font-medium text-gray-900">{order.paymentMethod.replace('_', ' ')}</span></p>
                            <p className="text-gray-600 mt-1">Status: <span className="font-medium text-green-600">Paid</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
