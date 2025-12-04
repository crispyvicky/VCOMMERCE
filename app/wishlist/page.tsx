import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { getWishlist } from '@/app/actions';
import ProductCard from '@/app/components/ProductCard';
import { redirect } from 'next/navigation';
import { Heart } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function WishlistPage() {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
        redirect('/login');
    }

    const wishlist = await getWishlist(session.user.email);

    return (
        <div className="container mx-auto px-6 py-12 mt-20 min-h-[60vh]">
            <div className="mb-8 flex items-center gap-3">
                <Heart className="text-red-500" size={32} fill="currentColor" />
                <h1 className="text-3xl font-bold">My Wishlist</h1>
            </div>

            {wishlist.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {wishlist.map((product: any) => (
                        <ProductCard key={product._id} {...product} />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center bg-gray-50 rounded-2xl border border-gray-100">
                    <div className="bg-white p-6 rounded-full mb-4 shadow-sm">
                        <Heart size={48} className="text-gray-300" />
                    </div>
                    <h2 className="text-xl font-semibold mb-2">Your wishlist is empty</h2>
                    <p className="text-muted-foreground max-w-md mb-6">
                        Save items you love to your wishlist. Review them anytime and easily move them to the bag.
                    </p>
                    <a
                        href="/"
                        className="px-8 py-3 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-full font-medium hover:bg-yellow-500 transition-colors"
                    >
                        Start Shopping
                    </a>
                </div>
            )}
        </div>
    );
}
