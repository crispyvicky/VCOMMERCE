'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Hero() {
    return (
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
            {/* Background Gradient/Image Placeholder */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-gray-50 to-gray-100 z-0" />

            {/* Decorative Elements */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--primary)]/5 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-teal-500/5 rounded-full blur-3xl" />

            <div className="container mx-auto px-6 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-[var(--primary)] text-sm md:text-base font-semibold tracking-[0.2em] uppercase mb-4">
                        Premium Apparel
                    </h2>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6">
                        <span className="text-gradient">Elevate Your</span>
                        <br />
                        <span className="text-gold-gradient">Style</span>
                    </h1>
                    <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10">
                        Discover the essence of luxury with Vasthra's exclusive collection.
                        Timeless designs crafted for the modern individual.
                    </p>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                        <Link
                            href="/collections"
                            className="px-8 py-4 bg-[var(--primary)] text-[var(--primary-foreground)] font-semibold rounded-full hover:bg-yellow-500 transition-colors w-full md:w-auto"
                        >
                            Shop Collection
                        </Link>
                        <Link
                            href="/about"
                            className="px-8 py-4 border border-[var(--border)] hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors rounded-full font-semibold w-full md:w-auto"
                        >
                            Our Story
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
