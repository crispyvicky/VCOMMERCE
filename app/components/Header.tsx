'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingBag, Menu, X, Search, User, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import { useCart } from '../context/CartContext';
import { useSession, signOut } from 'next-auth/react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { items, toggleCart } = useCart();
  const { data: session } = useSession();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={clsx(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white border-b border-gray-100',
        isScrolled ? 'shadow-sm py-3' : 'py-4'
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold tracking-tighter text-black">
          VASTHRA
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          {['Collections', 'New Arrivals', 'Accessories', 'About'].map((item) => (
            <Link
              key={item}
              href={`/${item.toLowerCase().replace(' ', '-')}`}
              className="text-sm font-medium hover:text-[var(--primary)] transition-colors"
            >
              {item}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center space-x-6">
          {/* Search Bar */}
          <div className="relative flex items-center">
            <AnimatePresence>
              {isSearchOpen ? (
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 200, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  className="overflow-hidden mr-2"
                >
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-full bg-transparent border-b border-gray-300 focus:border-[var(--primary)] outline-none px-2 py-1 text-sm"
                    autoFocus
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        window.location.href = `/search?q=${(e.target as HTMLInputElement).value}`;
                        setIsSearchOpen(false);
                      }
                    }}
                    onBlur={() => setTimeout(() => setIsSearchOpen(false), 200)}
                  />
                </motion.div>
              ) : null}
            </AnimatePresence>
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="hover:text-[var(--primary)] transition-colors"
            >
              <Search size={20} />
            </button>
          </div>

          {/* Auth Menu */}
          {session ? (
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="hover:text-[var(--primary)] transition-colors flex items-center gap-2"
              >
                <User size={20} />
                <span className="text-sm font-medium">{session.user?.name?.split(' ')[0]}</span>
              </button>

              <AnimatePresence>
                {isUserMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-100 rounded-lg shadow-lg py-2"
                  >
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[var(--primary)]"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      My Orders
                    </Link>
                    <Link
                      href="/wishlist"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[var(--primary)]"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      My Wishlist
                    </Link>
                    {/* Admin Link if role is admin */}
                    {(session.user as any).role === 'admin' && (
                      <Link
                        href="/admin"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[var(--primary)]"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Admin Dashboard
                      </Link>
                    )}
                    <button
                      onClick={() => signOut()}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                    >
                      <LogOut size={16} />
                      Sign Out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Link href="/login" className="hover:text-[var(--primary)] transition-colors">
              <User size={20} />
            </Link>
          )}

          <button
            onClick={toggleCart}
            className="hover:text-[var(--primary)] transition-colors relative"
          >
            <ShoppingBag size={20} />
            {items.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-[var(--primary)] text-[var(--primary-foreground)] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {items.length}
              </span>
            )}
          </button>
        </div>

        <button
          className="md:hidden text-foreground"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 glass border-t border-white/10 md:hidden"
          >
            <nav className="flex flex-col p-6 space-y-4">
              {['Collections', 'New Arrivals', 'Accessories', 'About'].map((item) => (
                <Link
                  key={item}
                  href={`/${item.toLowerCase().replace(' ', '-')}`}
                  className="text-lg font-medium hover:text-[var(--primary)] transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item}
                </Link>
              ))}
              {session ? (
                <>
                  <Link
                    href="/profile"
                    className="text-lg font-medium hover:text-[var(--primary)] transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    My Orders
                  </Link>
                  <button
                    onClick={() => signOut()}
                    className="text-lg font-medium text-red-600 text-left"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  className="text-lg font-medium hover:text-[var(--primary)] transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Login / Sign Up
                </Link>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
