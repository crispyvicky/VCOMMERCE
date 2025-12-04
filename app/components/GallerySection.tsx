'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const images = [
    { src: '/A.jpg', alt: 'Model A', span: 'col-span-1 md:col-span-2 lg:col-span-1', height: 'h-64 md:h-96' },
    { src: '/B.jpg', alt: 'Model B', span: 'col-span-1', height: 'h-64 md:h-96' },
    { src: '/C.jpg', alt: 'Model C', span: 'col-span-1', height: 'h-64 md:h-96' },
    { src: '/D.jpg', alt: 'Model D', span: 'col-span-1 md:col-span-2 lg:col-span-1', height: 'h-64 md:h-96' },
];

export default function GallerySection() {
    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-sm font-bold tracking-[0.3em] text-[var(--primary)] mb-4 uppercase">
                        @VASTHRA_OFFICIAL
                    </h2>
                    <h3 className="text-4xl font-bold tracking-tight">
                        FOLLOW THE MOVEMENT
                    </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {images.map((img, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.6 }}
                            className={`relative overflow-hidden rounded-xl group ${img.span} ${img.height}`}
                        >
                            <Image
                                src={img.src}
                                alt={img.alt}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <span className="text-white font-bold tracking-widest border-b-2 border-white pb-1">
                                    VIEW POST
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
