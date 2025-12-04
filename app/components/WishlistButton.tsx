'use client';

import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { toggleWishlist } from '@/app/actions';
import { useRouter } from 'next/navigation';

interface WishlistButtonProps {
    productId: string;
    initialState?: boolean;
    className?: string;
}

export default function WishlistButton({ productId, initialState = false, className = '' }: WishlistButtonProps) {
    const { data: session } = useSession();
    const router = useRouter();
    const [isInWishlist, setIsInWishlist] = useState(initialState);
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = async (e: React.MouseEvent) => {
        e.preventDefault(); // Prevent navigating to product page if inside a link
        e.stopPropagation();

        if (!session?.user?.email) {
            router.push('/login');
            return;
        }

        setIsLoading(true);
        // Optimistic update
        const newState = !isInWishlist;
        setIsInWishlist(newState);

        const result = await toggleWishlist(productId, session.user.email);

        if (!result.success) {
            // Revert on failure
            setIsInWishlist(!newState);
        }

        setIsLoading(false);
    };

    return (
        <button
            onClick={handleClick}
            disabled={isLoading}
            className={`p-2 rounded-full transition-all duration-300 hover:scale-110 active:scale-95 ${isInWishlist
                    ? 'bg-red-50 text-red-500'
                    : 'bg-white/80 text-gray-600 hover:bg-red-50 hover:text-red-500'
                } ${className}`}
            title={isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
        >
            <Heart
                size={20}
                fill={isInWishlist ? "currentColor" : "none"}
                className={isLoading ? "animate-pulse" : ""}
            />
        </button>
    );
}
