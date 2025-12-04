'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import Link from 'next/link';
import Image from 'next/image';

export default function CartSidebar() {
    const { items, removeItem, updateQuantity, cartTotal, isCartOpen, toggleCart } = useCart();

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={toggleCart}
                        className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
                    />

                    {/* Sidebar */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 h-full w-full md:w-[450px] bg-[var(--background)] border-l border-[var(--border)] z-50 flex flex-col shadow-2xl"
                    >
                        <div className="p-6 border-b border-[var(--border)] flex items-center justify-between">
                            <h2 className="text-xl font-bold flex items-center gap-2">
                                <ShoppingBag size={20} />
                                Shopping Cart ({items.length})
                            </h2>
                            <button onClick={toggleCart} className="p-2 hover:bg-[var(--secondary)] rounded-full transition-colors">
                                <X size={24} />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 space-y-6">
                            {items.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-muted-foreground">
                                    <ShoppingBag size={48} className="mb-4 opacity-20" />
                                    <p>Your cart is empty</p>
                                    <button
                                        onClick={toggleCart}
                                        className="mt-4 text-[var(--primary)] hover:underline"
                                    >
                                        Continue Shopping
                                    </button>
                                </div>
                            ) : (
                                items.map((item) => (
                                    <div key={`${item._id}-${item.size}-${item.color}`} className="flex gap-4">
                                        <div className="w-24 h-32 bg-[var(--secondary)] rounded-md overflow-hidden relative flex-shrink-0">
                                            {item.image ? (
                                                <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${item.image})` }} />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-xs">No Image</div>
                                            )}
                                        </div>
                                        <div className="flex-1 flex flex-col justify-between">
                                            <div>
                                                <div className="flex justify-between items-start">
                                                    <h3 className="font-medium line-clamp-2">{item.name}</h3>
                                                    <button
                                                        onClick={() => removeItem(item._id, item.size, item.color)}
                                                        className="text-muted-foreground hover:text-red-500 transition-colors"
                                                    >
                                                        <X size={16} />
                                                    </button>
                                                </div>
                                                <p className="text-sm text-muted-foreground mt-1">
                                                    {item.size && <span className="mr-3">Size: {item.size}</span>}
                                                    {item.color && <span>Color: {item.color}</span>}
                                                </p>
                                            </div>

                                            <div className="flex items-center justify-between mt-4">
                                                <div className="flex items-center border border-[var(--border)] rounded-full">
                                                    <button
                                                        onClick={() => updateQuantity(item._id, item.quantity - 1, item.size, item.color)}
                                                        className="p-2 hover:text-[var(--primary)] transition-colors"
                                                    >
                                                        <Minus size={14} />
                                                    </button>
                                                    <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item._id, item.quantity + 1, item.size, item.color)}
                                                        className="p-2 hover:text-[var(--primary)] transition-colors"
                                                    >
                                                        <Plus size={14} />
                                                    </button>
                                                </div>
                                                <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {items.length > 0 && (
                            <div className="p-6 border-t border-[var(--border)] bg-[var(--secondary)]">
                                <div className="flex justify-between items-center mb-4 text-lg font-bold">
                                    <span>Subtotal</span>
                                    <span>${cartTotal.toFixed(2)}</span>
                                </div>
                                <p className="text-xs text-muted-foreground mb-6 text-center">
                                    Shipping and taxes calculated at checkout.
                                </p>
                                <Link
                                    href="/checkout"
                                    onClick={toggleCart}
                                    className="block w-full bg-[var(--primary)] text-[var(--primary-foreground)] py-4 rounded-full font-bold text-center hover:bg-yellow-500 transition-colors"
                                >
                                    Checkout
                                </Link>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
