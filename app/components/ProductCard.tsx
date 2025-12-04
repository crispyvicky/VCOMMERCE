'use client';

import { motion } from 'framer-motion';
import { ShoppingBag, Eye } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface ProductCardProps {
    _id: string;
    name: string;
    price: number;
    images: string[];
    category: string;
}

export default function ProductCard({ _id, name, price, images, category }: ProductCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group relative bg-[var(--secondary)] rounded-xl overflow-hidden border border-[var(--border)] hover:border-[var(--primary)] transition-colors duration-300"
        >
            <Link href={`/product/${_id}`}>
                <div className="aspect-[3/4] relative overflow-hidden">
                    {/* Placeholder for Image - in real app use next/image */}
                    {/* Optimized Image Component */}
                    <div className="absolute inset-0 bg-slate-800 flex items-center justify-center text-slate-500">
                        {images && images[0] ? (
                            <Image
                                src={images[0]}
                                alt={name}
                                fill
                                className="object-cover object-center transition-transform duration-500 group-hover:scale-110"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                            />
                        ) : (
                            <span className="text-sm">No Image</span>
                        )}
                    </div>

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                        <button className="p-3 bg-white text-black rounded-full hover:bg-[var(--primary)] hover:text-white transition-colors transform translate-y-4 group-hover:translate-y-0 duration-300">
                            <ShoppingBag size={20} />
                        </button>
                        <button className="p-3 bg-white text-black rounded-full hover:bg-[var(--primary)] hover:text-white transition-colors transform translate-y-4 group-hover:translate-y-0 duration-300 delay-75">
                            <Eye size={20} />
                        </button>
                    </div>
                </div>

                <div className="p-4">
                    <p className="text-xs text-[var(--primary)] font-medium uppercase tracking-wider mb-1">
                        {category}
                    </p>
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-[var(--primary)] transition-colors truncate">
                        {name}
                    </h3>
                    <p className="text-muted-foreground">
                        ${price.toFixed(2)}
                    </p>
                </div>
            </Link>
        </motion.div>
    );
}
