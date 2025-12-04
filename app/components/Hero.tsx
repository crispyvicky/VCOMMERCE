'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center bg-[#f8f8f8] overflow-hidden pt-20 lg:pt-0">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

                    {/* Text Content - Left Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="w-full lg:w-1/2 z-10 text-center lg:text-left"
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                            className="inline-block bg-[var(--primary)] text-black px-6 py-2 rounded-full text-sm font-bold mb-6 tracking-widest shadow-md"
                        >
                            NEW ARRIVALS 2025
                        </motion.div>

                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-6 text-black leading-[0.9]">
                            PURE <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-yellow-600">ELEGANCE</span>
                        </h1>

                        <p className="text-gray-600 text-lg md:text-xl max-w-lg mx-auto lg:mx-0 mb-10 font-light leading-relaxed">
                            Experience the fusion of contemporary design and timeless comfort.
                            Our new collection redefines luxury for the everyday.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                            <Link
                                href="/collections"
                                className="px-10 py-4 bg-black text-white font-bold text-lg rounded-full hover:bg-[var(--primary)] hover:text-black transition-all duration-300 w-full sm:w-auto shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                            >
                                Shop Now
                            </Link>
                            <Link
                                href="/lookbook"
                                className="px-10 py-4 border-2 border-black text-black hover:bg-black hover:text-white transition-all duration-300 rounded-full font-bold text-lg w-full sm:w-auto"
                            >
                                View Lookbook
                            </Link>
                        </div>
                    </motion.div>

                    {/* Image Content - Right Side */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, x: 50 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        className="w-full lg:w-1/2 relative h-[60vh] lg:h-[85vh]"
                    >
                        <div className="absolute inset-0 bg-[var(--primary)] rounded-[2rem] transform rotate-3 translate-x-4 translate-y-4 opacity-20" />
                        <div className="relative h-full w-full rounded-[2rem] overflow-hidden shadow-2xl">
                            <div
                                className="absolute inset-0 bg-cover bg-center"
                                style={{ backgroundImage: "url('/11.jpg')" }}
                            />
                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60" />

                            {/* Floating Badge */}
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 1, duration: 0.8 }}
                                className="absolute bottom-8 left-8 bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-lg max-w-xs"
                            >
                                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Featured Look</p>
                                <p className="text-lg font-bold text-black">The Urban Coat</p>
                                <p className="text-sm text-gray-600">$299.00</p>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
