import Link from 'next/link';
import { Facebook, Instagram, Twitter } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-[var(--secondary)] border-t border-[var(--border)] pt-16 pb-8">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    <div>
                        <Link href="/" className="text-2xl font-bold tracking-tighter mb-6 block">
                            <span className="text-gold-gradient">VASTHRA</span>
                        </Link>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                            Redefining luxury for the modern era. Quality, craftsmanship, and style in every stitch.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-6">Shop</h4>
                        <ul className="space-y-4 text-sm text-muted-foreground">
                            <li><Link href="/new-arrivals" className="hover:text-[var(--primary)] transition-colors">New Arrivals</Link></li>
                            <li><Link href="/collections" className="hover:text-[var(--primary)] transition-colors">Collections</Link></li>
                            <li><Link href="/accessories" className="hover:text-[var(--primary)] transition-colors">Accessories</Link></li>
                            <li><Link href="/sale" className="hover:text-[var(--primary)] transition-colors">Sale</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-6">Help</h4>
                        <ul className="space-y-4 text-sm text-muted-foreground">
                            <li><Link href="/shipping" className="hover:text-[var(--primary)] transition-colors">Shipping & Returns</Link></li>
                            <li><Link href="/faq" className="hover:text-[var(--primary)] transition-colors">FAQ</Link></li>
                            <li><Link href="/contact" className="hover:text-[var(--primary)] transition-colors">Contact Us</Link></li>
                            <li><Link href="/privacy" className="hover:text-[var(--primary)] transition-colors">Privacy Policy</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-6">Stay Connected</h4>
                        <p className="text-sm text-muted-foreground mb-4">
                            Subscribe to our newsletter for exclusive offers.
                        </p>
                        <div className="flex gap-2 mb-6">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="bg-[var(--background)] border border-[var(--border)] rounded-md px-4 py-2 text-sm w-full focus:outline-none focus:border-[var(--primary)]"
                            />
                            <button className="bg-[var(--primary)] text-[var(--primary-foreground)] px-4 py-2 rounded-md text-sm font-medium hover:bg-yellow-500 transition-colors">
                                Join
                            </button>
                        </div>
                        <div className="flex gap-4 text-muted-foreground">
                            <a href="#" className="hover:text-[var(--primary)] transition-colors"><Instagram size={20} /></a>
                            <a href="#" className="hover:text-[var(--primary)] transition-colors"><Twitter size={20} /></a>
                            <a href="#" className="hover:text-[var(--primary)] transition-colors"><Facebook size={20} /></a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-[var(--border)] pt-8 text-center text-sm text-muted-foreground">
                    <p>&copy; {new Date().getFullYear()} Vasthra. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
