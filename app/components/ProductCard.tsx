'use client';

import { motion } from 'framer-motion';
import { ShoppingBag, Eye } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import WishlistButton from './WishlistButton';

import { useCart } from '../context/CartContext';

interface ProductCardProps {
    _id: string;
    name: string;
    price: number;
    images: string[];
    category: string;
}

export default function ProductCard({ _id, name, price, images, category }: ProductCardProps) {
    const { addItem } = useCart();

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        addItem({
            _id,
            name,
            price,
            image: images[0] || '',
            quantity: 1
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group relative bg-white rounded-lg overflow-hidden border border-transparent hover:shadow-lg transition-all duration-300"
        >
            <Link href={`/product/${_id}`} className="block relative">
                <div className="aspect-[3/4] relative overflow-hidden bg-gray-100">
                    {/* Sale Badge */}
                    <div className="absolute top-2 left-2 z-10 bg-[var(--accent)] text-[var(--accent-foreground)] text-xs font-bold px-2 py-1 rounded-sm">
                        35% OFF
                    </div>

                    {/* Wishlist Button */}
                    <div className="absolute top-2 right-2 z-10">
                        <WishlistButton productId={_id} className="bg-white/80 hover:bg-white text-black p-2 rounded-full shadow-sm" />
                    </div>

                    {images && images[0] ? (
                        <Image
                            src={images[0]}
                            alt={name}
                            fill
                            className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        />
                    ) : (
                        <div className="flex items-center justify-center h-full text-gray-400">No Image</div>
                    )}
                </div>

                <div className="p-3">
                    <div className="flex items-center gap-1 mb-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <span key={star} className="text-yellow-400 text-[10px]">★</span>
                        ))}
                        <span className="text-xs text-gray-400 ml-1">(120)</span>
                    </div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-1 truncate">
                        {name}
                    </h3>
                    <p className="text-xs text-gray-500 mb-2 truncate">
                        {category}
                    </p>
                    <div className="flex items-center gap-2 mb-3">
                        <span className="text-base font-bold text-black">
                            ${price.toFixed(2)}
                        </span>
                        <span className="text-xs text-gray-400 line-through">
                            ${(price * 1.35).toFixed(2)}
                        </span>
                    </div>
                </div>
            </Link>

            <button
                onClick={handleAddToCart}
                className="w-full bg-[var(--primary)] text-black font-bold py-3 text-sm hover:bg-yellow-400 transition-colors flex items-center justify-center gap-2 cursor-pointer active:scale-95 transform duration-100"
            >
                <ShoppingBag size={16} />
                ADD TO CART
            </button>
        </motion.div>
    );
}
