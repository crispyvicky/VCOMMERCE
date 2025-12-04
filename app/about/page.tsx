import Header from '../components/Header';
import Footer from '../components/Footer';
import Image from 'next/image';

export default function AboutPage() {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-1 pt-24">
                {/* Hero Section */}
                <section className="relative h-[40vh] flex items-center justify-center bg-gray-900 text-white overflow-hidden">
                    <div className="absolute inset-0 z-0 opacity-40 bg-gradient-to-r from-teal-900 to-black"></div>
                    <div className="relative z-10 text-center px-6">
                        <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tighter">Our Story</h1>
                        <p className="text-xl text-gray-200 max-w-2xl mx-auto">
                            Weaving tradition with modern elegance.
                        </p>
                    </div>
                </section>

                {/* Content */}
                <section className="py-20 px-6">
                    <div className="container mx-auto max-w-4xl space-y-12">
                        <div className="prose prose-lg mx-auto text-gray-600">
                            <p className="lead text-2xl font-light text-gray-900 mb-8">
                                Vasthra was born from a passion for exquisite textiles and a desire to bring the finest Indian craftsmanship to the world.
                            </p>
                            <p>
                                Founded in 2024, we curate a collection that celebrates the rich heritage of handlooms while embracing contemporary aesthetics. Every piece in our collection tells a story—of the weaver's skill, the region's culture, and the timeless beauty of natural fabrics.
                            </p>
                            <p>
                                We believe in sustainable fashion that respects both the artisan and the environment. Our direct-to-weaver partnerships ensure fair wages and preserve age-old techniques that are in danger of being lost.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8 text-center pt-12 border-t border-gray-100">
                            <div>
                                <h3 className="text-xl font-bold mb-2">Authenticity</h3>
                                <p className="text-gray-500">100% genuine handlooms and premium fabrics.</p>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-2">Craftsmanship</h3>
                                <p className="text-gray-500">Hand-picked pieces from master artisans.</p>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-2">Sustainability</h3>
                                <p className="text-gray-500">Ethically sourced and environmentally conscious.</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
