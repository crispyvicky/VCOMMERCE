'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { registerUser } from '@/app/actions';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function LoginPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        if (isLogin) {
            const result = await signIn('credentials', {
                redirect: false,
                email: formData.email,
                password: formData.password,
            });

            if (result?.error) {
                setError(result.error);
            } else {
                router.push('/');
                router.refresh();
            }
        } else {
            const result = await registerUser(formData);
            if (result.success) {
                // Auto login after registration or ask to login
                alert('Registration successful! Please log in.');
                setIsLogin(true);
            } else {
                setError(result.error || 'Registration failed');
            }
        }
        setLoading(false);
    };

    return (
        <main className="min-h-screen flex flex-col">
            <Header />

            <div className="flex-1 flex items-center justify-center py-20 px-6">
                <div className="w-full max-w-md bg-white rounded-xl shadow-lg border border-gray-100 p-8">
                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-bold tracking-tight mb-2">
                            {isLogin ? 'Welcome Back' : 'Create Account'}
                        </h1>
                        <p className="text-muted-foreground text-sm">
                            {isLogin ? 'Enter your credentials to access your account.' : 'Join us for a premium shopping experience.'}
                        </p>
                    </div>

                    {error && (
                        <div className="bg-red-50 text-red-600 text-sm p-3 rounded-md mb-6">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {!isLogin && (
                            <div>
                                <label className="block text-sm font-medium mb-1">Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-[var(--primary)]"
                                />
                            </div>
                        )}
                        <div>
                            <label className="block text-sm font-medium mb-1">Email</label>
                            <input
                                type="email"
                                name="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-[var(--primary)]"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Password</label>
                            <input
                                type="password"
                                name="password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-[var(--primary)]"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[var(--primary)] text-white py-3 rounded-md font-bold hover:bg-teal-700 transition-colors mt-4 disabled:opacity-50"
                        >
                            {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Sign Up')}
                        </button>
                    </form>

                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-gray-200" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-white px-2 text-muted-foreground">Or continue with</span>
                            </div>
                        </div>

                        <button
                            onClick={() => signIn('google', { callbackUrl: '/' })}
                            className="w-full mt-4 flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-700 py-3 rounded-md font-medium hover:bg-gray-50 transition-colors"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                    fill="#4285F4"
                                />
                                <path
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    fill="#34A853"
                                />
                                <path
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                    fill="#FBBC05"
                                />
                                <path
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                    fill="#EA4335"
                                />
                            </svg>
                            Google
                        </button>
                    </div>

                    <div className="mt-6 text-center text-sm">
                        <p className="text-muted-foreground">
                            {isLogin ? "Don't have an account? " : "Already have an account? "}
                            <button
                                onClick={() => setIsLogin(!isLogin)}
                                className="text-[var(--primary)] font-medium hover:underline"
                            >
                                {isLogin ? 'Sign Up' : 'Sign In'}
                            </button>
                        </p>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
