'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface CartItem {
    _id: string;
    name: string;
    price: number;
    image: string;
    size?: string;
    color?: string;
    quantity: number;
}

interface CartContextType {
    items: CartItem[];
    addItem: (item: CartItem) => void;
    removeItem: (id: string, size?: string, color?: string) => void;
    updateQuantity: (id: string, quantity: number, size?: string, color?: string) => void;
    clearCart: () => void;
    cartTotal: number;
    isCartOpen: boolean;
    toggleCart: () => void;
    discount: { code: string; type: 'percentage' | 'fixed'; value: number } | null;
    applyCoupon: (code: string, type: 'percentage' | 'fixed', value: number) => void;
    removeCoupon: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [discount, setDiscount] = useState<{ code: string; type: 'percentage' | 'fixed'; value: number } | null>(null);

    // Load from localStorage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem('vasthra_cart');
        if (savedCart) {
            try {
                setItems(JSON.parse(savedCart));
            } catch (e) {
                console.error('Failed to parse cart', e);
            }
        }
        setIsLoaded(true);
    }, []);

    // Save to localStorage on change
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem('vasthra_cart', JSON.stringify(items));
        }
    }, [items, isLoaded]);

    const addItem = (newItem: CartItem) => {
        setItems((prev) => {
            const existing = prev.find(
                (i) => i._id === newItem._id && i.size === newItem.size && i.color === newItem.color
            );
            if (existing) {
                return prev.map((i) =>
                    i._id === newItem._id && i.size === newItem.size && i.color === newItem.color
                        ? { ...i, quantity: i.quantity + newItem.quantity }
                        : i
                );
            }
            return [...prev, newItem];
        });
        setIsCartOpen(true);
    };

    const removeItem = (id: string, size?: string, color?: string) => {
        setItems((prev) =>
            prev.filter((i) => !(i._id === id && i.size === size && i.color === color))
        );
    };

    const updateQuantity = (id: string, quantity: number, size?: string, color?: string) => {
        if (quantity < 1) return;
        setItems((prev) =>
            prev.map((i) =>
                i._id === id && i.size === size && i.color === color ? { ...i, quantity } : i
            )
        );
    };

    const clearCart = () => {
        setItems([]);
        setDiscount(null);
    };

    const toggleCart = () => setIsCartOpen((prev) => !prev);

    const applyCoupon = (code: string, type: 'percentage' | 'fixed', value: number) => {
        setDiscount({ code, type, value });
    };

    const removeCoupon = () => {
        setDiscount(null);
    };

    const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);

    let cartTotal = subtotal;
    if (discount) {
        if (discount.type === 'percentage') {
            cartTotal = subtotal - (subtotal * discount.value) / 100;
        } else {
            cartTotal = Math.max(0, subtotal - discount.value);
        }
    }

    return (
        <CartContext.Provider
            value={{
                items,
                addItem,
                removeItem,
                updateQuantity,
                clearCart,
                cartTotal,
                isCartOpen,
                toggleCart,
                discount,
                applyCoupon,
                removeCoupon,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
