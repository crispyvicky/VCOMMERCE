import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { redirect } from 'next/navigation';
import { getUserOrders } from '@/app/actions';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Package, User as UserIcon } from 'lucide-react';
import clsx from 'clsx';

export default async function ProfilePage() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect('/login');
    }

    const orders = await getUserOrders(session.user?.email as string);

    return (
        <main className="min-h-screen flex flex-col bg-gray-50">
            <Header />

            <div className="flex-1 container mx-auto px-6 py-24">
                <div className="max-w-4xl mx-auto space-y-8">

                    {/* Profile Header */}
                    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 flex items-center gap-6">
                        <div className="w-20 h-20 bg-[var(--primary)]/10 rounded-full flex items-center justify-center text-[var(--primary)]">
                            <UserIcon size={40} />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold">{session.user?.name}</h1>
                            <p className="text-muted-foreground">{session.user?.email}</p>
                            <div className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 capitalize">
                                {(session.user as any).role} Account
                            </div>
                        </div>
                    </div>

                    {/* Order History */}
                    <div>
                        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <Package size={24} />
                            Order History
                        </h2>

                        <div className="space-y-4">
                            {orders.length > 0 ? (
                                orders.map((order: any) => (
                                    <div key={order._id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 transition-all hover:shadow-md">
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 border-b border-gray-50 pb-4">
                                            <div>
                                                <p className="text-sm text-muted-foreground">Order ID</p>
                                                <p className="font-medium">#{order._id.slice(-6).toUpperCase()}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-muted-foreground">Date</p>
                                                <p className="font-medium">{new Date(order.createdAt).toLocaleDateString()}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-muted-foreground">Total</p>
                                                <p className="font-medium">${order.total.toFixed(2)}</p>
                                            </div>
                                            <div>
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
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            {order.items.map((item: any, idx: number) => (
                                                <div key={idx} className="flex items-center gap-4 text-sm">
                                                    <div className="w-2 h-2 rounded-full bg-gray-300" />
                                                    <span className="font-medium text-gray-900">{item.name}</span>
                                                    <span className="text-gray-500">x{item.quantity}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
                                    <Package size={48} className="mx-auto text-gray-300 mb-4" />
                                    <p className="text-muted-foreground">No orders found.</p>
                                    <a href="/" className="text-[var(--primary)] hover:underline mt-2 inline-block">Start Shopping</a>
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>

            <Footer />
        </main>
    );
}
