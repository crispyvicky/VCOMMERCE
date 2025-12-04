'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

import { CATEGORIES } from '@/lib/constants';

const categories = ['All', ...CATEGORIES];
const priceRanges = [
    { label: 'All Prices', min: 0, max: 10000 },
    { label: 'Under $100', min: 0, max: 100 },
    { label: '$100 - $500', min: 100, max: 500 },
    { label: '$500 - $1000', min: 500, max: 1000 },
    { label: 'Above $1000', min: 1000, max: 10000 },
];

export default function FilterSidebar() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isCategoryOpen, setIsCategoryOpen] = useState(true);
    const [isPriceOpen, setIsPriceOpen] = useState(true);

    const currentCategory = searchParams.get('category') || 'All';
    const currentMinPrice = searchParams.get('minPrice');

    const updateFilter = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (value === 'All' || value === '') {
            params.delete(key);
        } else {
            params.set(key, value);
        }

        // Reset price if selecting "All Prices" logic
        if (key === 'priceRange' && value === 'All Prices') {
            params.delete('minPrice');
            params.delete('maxPrice');
        }

        router.push(`/collections?${params.toString()}`);
    };

    const handlePriceChange = (min: number, max: number) => {
        const params = new URLSearchParams(searchParams.toString());
        if (min === 0 && max === 10000) {
            params.delete('minPrice');
            params.delete('maxPrice');
        } else {
            params.set('minPrice', min.toString());
            params.set('maxPrice', max.toString());
        }
        router.push(`/collections?${params.toString()}`);
    }

    return (
        <aside className="w-full md:w-64 space-y-8">
            {/* Categories */}
            <div className="border-b border-[var(--border)] pb-6">
                <button
                    onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                    className="flex items-center justify-between w-full font-semibold text-lg mb-4"
                >
                    <span>Collections</span>
                    {isCategoryOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>

                <motion.div
                    initial={false}
                    animate={{ height: isCategoryOpen ? 'auto' : 0 }}
                    className="overflow-hidden"
                >
                    <ul className="space-y-3">
                        {categories.map((cat) => (
                            <li key={cat}>
                                <button
                                    onClick={() => updateFilter('category', cat)}
                                    className={`text-sm transition-colors ${currentCategory === cat
                                        ? 'text-[var(--primary)] font-medium'
                                        : 'text-muted-foreground hover:text-foreground'
                                        }`}
                                >
                                    {cat}
                                </button>
                            </li>
                        ))}
                    </ul>
                </motion.div>
            </div>

            {/* Price */}
            <div className="border-b border-[var(--border)] pb-6">
                <button
                    onClick={() => setIsPriceOpen(!isPriceOpen)}
                    className="flex items-center justify-between w-full font-semibold text-lg mb-4"
                >
                    <span>Price</span>
                    {isPriceOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>

                <motion.div
                    initial={false}
                    animate={{ height: isPriceOpen ? 'auto' : 0 }}
                    className="overflow-hidden"
                >
                    <ul className="space-y-3">
                        {priceRanges.map((range) => (
                            <li key={range.label}>
                                <button
                                    onClick={() => handlePriceChange(range.min, range.max)}
                                    className={`text-sm transition-colors ${currentMinPrice === range.min.toString()
                                        ? 'text-[var(--primary)] font-medium'
                                        : 'text-muted-foreground hover:text-foreground'
                                        }`}
                                >
                                    {range.label}
                                </button>
                            </li>
                        ))}
                    </ul>
                </motion.div>
            </div>
        </aside>
    );
}
