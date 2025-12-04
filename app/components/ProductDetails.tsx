'use client';

import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Star, Truck, ShieldCheck, RefreshCw } from 'lucide-react';
import Image from 'next/image';

interface ProductDetailsProps {
    product: any;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
    const { addItem } = useCart();
    const [selectedSize, setSelectedSize] = useState<string | undefined>(
        product.sizes && product.sizes.length > 0 ? product.sizes[0] : undefined
    );
    const [selectedColor, setSelectedColor] = useState<string | undefined>(
        product.colors && product.colors.length > 0 ? product.colors[0] : undefined
    );

    const handleAddToCart = () => {
        addItem({
            _id: product._id,
            name: product.name,
            price: product.price,
            image: product.images && product.images[0] ? product.images[0] : '',
            size: selectedSize,
            color: selectedColor,
            quantity: 1,
        });
    };

    return (
        <div className="container mx-auto px-6 py-12 mt-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Image Gallery */}
                <div className="space-y-4">
                    <div className="aspect-[3/4] bg-[var(--secondary)] rounded-xl overflow-hidden relative">
                        {product.images && product.images[0] ? (
                            <div
                                className="w-full h-full bg-cover bg-center"
                                style={{ backgroundImage: `url(${product.images[0]})` }}
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                                No Image
                            </div>
                        )}
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                        {product.images?.map((img: string, idx: number) => (
                            <div
                                key={idx}
                                className="aspect-square bg-[var(--secondary)] rounded-lg overflow-hidden cursor-pointer border border-transparent hover:border-[var(--primary)]"
                            >
                                <div
                                    className="w-full h-full bg-cover bg-center"
                                    style={{ backgroundImage: `url(${img})` }}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Product Details */}
                <div>
                    <div className="mb-2 text-[var(--primary)] font-medium uppercase tracking-wider text-sm">
                        {product.category}
                    </div>
                    <h1 className="text-4xl font-bold mb-4">{product.name}</h1>

                    <div className="flex items-center gap-4 mb-6">
                        <span className="text-2xl font-semibold">
                            ${product.price.toFixed(2)}
                        </span>
                        <div className="flex items-center text-yellow-500">
                            <Star size={16} fill="currentColor" />
                            <Star size={16} fill="currentColor" />
                            <Star size={16} fill="currentColor" />
                            <Star size={16} fill="currentColor" />
                            <Star size={16} fill="currentColor" />
                            <span className="text-muted-foreground text-sm ml-2">
                                (12 reviews)
                            </span>
                        </div>
                    </div>

                    <p className="text-muted-foreground leading-relaxed mb-8">
                        {product.description}
                    </p>

                    {/* Selectors */}
                    <div className="space-y-6 mb-8">
                        {product.sizes && product.sizes.length > 0 && (
                            <div>
                                <label className="block text-sm font-medium mb-2">Size</label>
                                <div className="flex gap-3">
                                    {product.sizes.map((size: string) => (
                                        <button
                                            key={size}
                                            onClick={() => setSelectedSize(size)}
                                            className={`w-12 h-12 rounded-full border flex items-center justify-center transition-colors ${selectedSize === size
                                                    ? 'border-[var(--primary)] bg-[var(--primary)] text-[var(--primary-foreground)]'
                                                    : 'border-[var(--border)] hover:border-[var(--primary)] hover:text-[var(--primary)]'
                                                }`}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {product.colors && product.colors.length > 0 && (
                            <div>
                                <label className="block text-sm font-medium mb-2">Color</label>
                                <div className="flex gap-3">
                                    {product.colors.map((color: string) => (
                                        <button
                                            key={color}
                                            onClick={() => setSelectedColor(color)}
                                            className={`px-4 py-2 rounded-full border transition-colors ${selectedColor === color
                                                    ? 'border-[var(--primary)] bg-[var(--primary)] text-[var(--primary-foreground)]'
                                                    : 'border-[var(--border)] hover:border-[var(--primary)] hover:text-[var(--primary)]'
                                                }`}
                                        >
                                            {color}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-4 mb-12">
                        <button
                            onClick={handleAddToCart}
                            className="flex-1 bg-[var(--primary)] text-[var(--primary-foreground)] py-4 rounded-full font-semibold hover:bg-yellow-500 transition-colors"
                        >
                            Add to Cart
                        </button>
                        <button className="w-14 h-14 border border-[var(--border)] rounded-full flex items-center justify-center hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors">
                            <ShieldCheck size={24} />
                        </button>
                    </div>

                    {/* Features */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-[var(--border)] pt-8">
                        <div className="flex flex-col items-center text-center gap-2">
                            <Truck className="text-[var(--primary)]" />
                            <span className="text-sm font-medium">Free Shipping</span>
                            <span className="text-xs text-muted-foreground">
                                On orders over $200
                            </span>
                        </div>
                        <div className="flex flex-col items-center text-center gap-2">
                            <RefreshCw className="text-[var(--primary)]" />
                            <span className="text-sm font-medium">Easy Returns</span>
                            <span className="text-xs text-muted-foreground">
                                30-day return policy
                            </span>
                        </div>
                        <div className="flex flex-col items-center text-center gap-2">
                            <ShieldCheck className="text-[var(--primary)]" />
                            <span className="text-sm font-medium">Secure Payment</span>
                            <span className="text-xs text-muted-foreground">
                                100% secure checkout
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
