'use client';

import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';
import { ChevronRight, CreditCard, Truck, CheckCircle, Loader2 } from 'lucide-react';
import { createOrder } from '../actions';
import clsx from 'clsx';

export default function CheckoutPage() {
    const { items, cartTotal: total, clearCart } = useCart();
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        country: '',
        zip: '',
        paymentMethod: 'card',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);

        try {
            // 1. Create Razorpay Order
            const response = await fetch('/api/payment/create-order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ amount: total }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to create payment order');
            }

            // 2. Initialize Razorpay
            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount: data.amount,
                currency: data.currency,
                name: 'Vasthra',
                description: 'Premium Apparel Purchase',
                order_id: data.id,
                handler: async function (response: any) {
                    // 3. On Success, Create Order in DB
                    const orderData = {
                        customer: {
                            name: formData.firstName + ' ' + formData.lastName,
                            email: formData.email,
                            address: formData.address,
                            city: formData.city,
                            zip: formData.zip,
                            country: formData.country,
                        },
                        items: items.map((item) => ({
                            product: item._id,
                            name: item.name,
                            quantity: item.quantity,
                            price: item.price,
                            size: item.size,
                            color: item.color,
                        })),
                        total: total,
                        paymentMethod: 'razorpay_upi', // Or dynamic based on what they actually used
                        paymentId: response.razorpay_payment_id,
                        status: 'processing',
                    };

                    const result = await createOrder(orderData);

                    if (result.success) {
                        clearCart();
                        setIsSuccess(true);
                    } else {
                        alert('Payment successful but failed to create order. Please contact support.');
                    }
                },
                prefill: {
                    name: formData.firstName + ' ' + formData.lastName,
                    email: formData.email,
                    contact: '',
                },
                theme: {
                    color: '#0f766e',
                },
            };

            const rzp1 = new (window as any).Razorpay(options);
            rzp1.open();
        } catch (error) {
            console.error('Checkout error:', error);
            alert('Something went wrong. Please try again.');
        } finally {
            setIsProcessing(false);
        }
    };

    if (isSuccess) {
        return (
            <div className="min-h-screen flex flex-col bg-gray-50">
                <Header />
                <div className="flex-1 flex items-center justify-center p-6">
                    <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
                            <CheckCircle size={32} />
                        </div>
                        <h1 className="text-2xl font-bold mb-2">Order Confirmed!</h1>
                        <p className="text-muted-foreground mb-8">
                            Thank you for your purchase. Your order has been placed successfully.
                        </p>
                        <Link
                            href="/"
                            className="block w-full bg-[var(--primary)] text-white py-3 rounded-md font-bold hover:bg-teal-700 transition-colors"
                        >
                            Continue Shopping
                        </Link>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            {/* Load Razorpay Script */}
            <script src="https://checkout.razorpay.com/v1/checkout.js"></script>

            <Header />

            <div className="flex-1 container mx-auto px-6 py-24">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
                    <Link href="/cart" className="hover:text-[var(--primary)]">Cart</Link>
                    <ChevronRight size={14} />
                    <span className="font-medium text-[var(--primary)]">Checkout</span>
                </div>

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Checkout Form */}
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-2xl font-bold tracking-tight mb-6">Shipping Information</h2>
                            <form id="checkout-form" onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-[var(--primary)]"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">First Name</label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            required
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-[var(--primary)]"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Last Name</label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            required
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-[var(--primary)]"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Address</label>
                                    <input
                                        type="text"
                                        name="address"
                                        required
                                        value={formData.address}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-[var(--primary)]"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">City</label>
                                        <input
                                            type="text"
                                            name="city"
                                            required
                                            value={formData.city}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-[var(--primary)]"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">ZIP / Postal Code</label>
                                        <input
                                            type="text"
                                            name="zip"
                                            required
                                            value={formData.zip}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-[var(--primary)]"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Country</label>
                                    <select
                                        name="country"
                                        required
                                        value={formData.country}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-[var(--primary)] bg-white"
                                    >
                                        <option value="">Select Country</option>
                                        <option value="United States">United States</option>
                                        <option value="India">India</option>
                                        <option value="United Kingdom">United Kingdom</option>
                                        <option value="Canada">Canada</option>
                                    </select>
                                </div>
                            </form>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold tracking-tight mb-6">Payment Method</h2>
                            <div className="space-y-3">
                                <label className={clsx(
                                    "flex items-center p-4 border rounded-lg cursor-pointer transition-all",
                                    formData.paymentMethod === 'card' ? "border-[var(--primary)] bg-[var(--primary)]/5" : "border-gray-200 hover:border-gray-300"
                                )}>
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="card"
                                        checked={formData.paymentMethod === 'card'}
                                        onChange={handleChange}
                                        className="w-4 h-4 text-[var(--primary)] focus:ring-[var(--primary)]"
                                    />
                                    <div className="ml-4 flex items-center gap-3">
                                        <CreditCard size={20} className="text-gray-600" />
                                        <span className="font-medium">Credit / Debit Card / UPI (Razorpay)</span>
                                    </div>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 h-fit sticky top-24">
                        <h3 className="text-lg font-bold mb-6">Order Summary</h3>
                        <div className="space-y-4 mb-6">
                            {items.map((item) => (
                                <div key={`${item._id}-${item.size}-${item.color}`} className="flex gap-4">
                                    <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden relative flex-shrink-0">
                                        {item.image && (
                                            <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${item.image})` }} />
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-medium text-sm line-clamp-2">{item.name}</h4>
                                        <p className="text-xs text-muted-foreground mt-1">
                                            Qty: {item.quantity} {item.size && `• ${item.size}`} {item.color && `• ${item.color}`}
                                        </p>
                                    </div>
                                    <span className="font-medium text-sm">${(item.price * item.quantity).toFixed(2)}</span>
                                </div>
                            ))}
                        </div>

                        <div className="border-t border-gray-100 pt-4 space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Subtotal</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Shipping</span>
                                <span className="text-green-600">Free</span>
                            </div>
                        </div>

                        <div className="border-t border-gray-100 pt-4 mt-4 mb-6">
                            <div className="flex justify-between font-bold text-lg">
                                <span>Total</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                        </div>

                        <button
                            type="submit"
                            form="checkout-form"
                            disabled={isProcessing || items.length === 0}
                            className="w-full bg-[var(--primary)] text-white py-4 rounded-md font-bold hover:bg-teal-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isProcessing ? (
                                <>
                                    <Loader2 className="animate-spin" size={20} />
                                    Processing...
                                </>
                            ) : (
                                'Pay Now'
                            )}
                        </button>

                        <div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                            <Truck size={14} />
                            <span>Free shipping on all orders</span>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
