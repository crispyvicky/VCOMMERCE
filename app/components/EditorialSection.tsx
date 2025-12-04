'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function EditorialSection() {
    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
                    {/* Image 1 - Portrait */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="w-full lg:w-1/3 relative aspect-[3/4] group"
                    >
                        <Image
                            src="/2.jpg"
                            alt="Editorial Model 1"
                            fill
                            className="object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out"
                        />
                        <div className="absolute inset-0 border-[1px] border-black/10 m-4 pointer-events-none" />
                    </motion.div>

                    {/* Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="w-full lg:w-1/3 text-center z-10"
                    >
                        <h2 className="text-sm font-bold tracking-[0.3em] text-[var(--primary)] mb-4 uppercase">
                            The Editorial
                        </h2>
                        <h3 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
                            MODERN <br /> SOPHISTICATION
                        </h3>
                        <p className="text-gray-600 mb-8 leading-relaxed">
                            Redefining elegance for the contemporary era. Our latest editorial explores the intersection of comfort and high fashion, bringing you pieces that speak volumes without saying a word.
                        </p>
                        <Link
                            href="/collections"
                            className="inline-block border-b-2 border-black pb-1 text-sm font-bold tracking-widest hover:text-[var(--primary)] hover:border-[var(--primary)] transition-colors"
                        >
                            VIEW LOOKBOOK
                        </Link>
                    </motion.div>

                    {/* Image 2 - Portrait Offset */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="w-full lg:w-1/3 relative aspect-[3/4] mt-12 lg:mt-24 group"
                    >
                        <Image
                            src="/3.jpg"
                            alt="Editorial Model 2"
                            fill
                            className="object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out"
                        />
                        <div className="absolute inset-0 border-[1px] border-black/10 m-4 pointer-events-none" />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
