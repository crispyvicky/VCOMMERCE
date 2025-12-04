'use client';

import { useState } from 'react';
import { Star, User as UserIcon } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { addReview } from '@/app/actions';
import { useRouter } from 'next/navigation';

interface Review {
    _id: string;
    user: string;
    rating: number;
    comment: string;
    createdAt: string;
}

interface ReviewSectionProps {
    productId: string;
    reviews: Review[];
}

export default function ReviewSection({ productId, reviews }: ReviewSectionProps) {
    const { data: session } = useSession();
    const router = useRouter();
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!session?.user?.email) return;

        setIsSubmitting(true);
        setError('');

        const result = await addReview(productId, rating, comment, session.user.email);

        if (result.success) {
            setComment('');
            setRating(5);
            router.refresh();
        } else {
            setError(result.error || 'Failed to submit review');
        }
        setIsSubmitting(false);
    };

    return (
        <div className="mt-16 border-t border-gray-100 pt-12">
            <h2 className="text-2xl font-bold mb-8">Customer Reviews</h2>

            <div className="grid md:grid-cols-2 gap-12">
                {/* Review List */}
                <div className="space-y-6">
                    {reviews.length > 0 ? (
                        reviews.map((review) => (
                            <div key={review._id} className="bg-gray-50 p-6 rounded-xl">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                                            <UserIcon size={16} className="text-gray-500" />
                                        </div>
                                        <span className="font-medium">{review.user}</span>
                                    </div>
                                    <span className="text-xs text-muted-foreground">
                                        {new Date(review.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                                <div className="flex text-yellow-500 mb-2">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            size={14}
                                            fill={i < review.rating ? "currentColor" : "none"}
                                            className={i < review.rating ? "text-yellow-500" : "text-gray-300"}
                                        />
                                    ))}
                                </div>
                                <p className="text-gray-600">{review.comment}</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-muted-foreground italic">No reviews yet. Be the first to review!</p>
                    )}
                </div>

                {/* Review Form */}
                <div className="bg-white p-6 rounded-xl border border-gray-100 h-fit">
                    <h3 className="text-lg font-semibold mb-4">Write a Review</h3>
                    {session ? (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Rating</label>
                                <div className="flex gap-1">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            type="button"
                                            onClick={() => setRating(star)}
                                            className="focus:outline-none transition-transform hover:scale-110"
                                        >
                                            <Star
                                                size={24}
                                                fill={star <= rating ? "currentColor" : "none"}
                                                className={star <= rating ? "text-yellow-500" : "text-gray-300"}
                                            />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Comment</label>
                                <textarea
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    required
                                    rows={4}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[var(--primary)] resize-none"
                                    placeholder="Share your thoughts..."
                                />
                            </div>

                            {error && <p className="text-red-500 text-sm">{error}</p>}

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-[var(--primary)] text-[var(--primary-foreground)] py-3 rounded-lg font-medium hover:bg-yellow-500 transition-colors disabled:opacity-50"
                            >
                                {isSubmitting ? 'Submitting...' : 'Submit Review'}
                            </button>
                        </form>
                    ) : (
                        <div className="text-center py-8">
                            <p className="text-muted-foreground mb-4">Please log in to write a review.</p>
                            <a
                                href="/login"
                                className="inline-block px-6 py-2 border border-[var(--primary)] text-[var(--primary)] rounded-full hover:bg-[var(--primary)] hover:text-white transition-colors"
                            >
                                Login
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
