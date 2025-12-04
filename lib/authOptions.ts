import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error('Please enter an email and password');
                }

                await dbConnect();

                const user = await User.findOne({ email: credentials.email }).select('+password');

                if (!user) {
                    throw new Error('Invalid email or password');
                }

                if (!user.password) {
                    throw new Error('Please sign in with Google');
                }

                const isMatch = await bcrypt.compare(credentials.password, user.password);

                if (!isMatch) {
                    throw new Error('Invalid email or password');
                }

                return {
                    id: user._id.toString(),
                    name: user.name,
                    email: user.email,
                    role: user.role,
                };
            },
        }),
        CredentialsProvider({
            id: 'admin-credentials',
            name: 'Admin Login',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                const adminEmail = process.env.ADMIN_EMAIL;
                const adminPass = process.env.ADMIN_PASS;

                if (!adminEmail || !adminPass) {
                    throw new Error('Admin credentials not configured');
                }

                if (
                    credentials?.email === adminEmail &&
                    credentials?.password === adminPass
                ) {
                    return {
                        id: 'admin-user',
                        name: 'Super Admin',
                        email: adminEmail,
                        role: 'admin',
                    };
                }
                return null;
            },
        }),
    ],
    callbacks: {
        async signIn({ user, account, profile }) {
            if (account?.provider === 'google') {
                await dbConnect();
                try {
                    const existingUser = await User.findOne({ email: user.email });
                    if (!existingUser) {
                        // Create new user
                        const newUser = await User.create({
                            name: user.name,
                            email: user.email,
                            image: user.image,
                            role: 'user',
                            // No password for OAuth users
                        });
                        (user as any).id = newUser._id.toString();
                        (user as any).role = newUser.role;
                    } else {
                        (user as any).id = existingUser._id.toString();
                        (user as any).role = existingUser.role;
                    }
                    return true;
                } catch (error) {
                    console.error('Error creating user from Google:', error);
                    return false;
                }
            }
            return true; // Allow credentials login
        },
        async jwt({ token, user }) {
            if (user) {
                token.role = (user as any).role;

                // Override role if matches env var
                if (user.email === process.env.ADMIN_EMAIL) {
                    token.role = 'admin';
                }

                token.id = (user as any).id;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                (session.user as any).role = token.role;
                (session.user as any).id = token.id;
            }
            return session;
        },
    },
    pages: {
        signIn: '/login',
    },
    session: {
        strategy: 'jwt',
    },
    secret: process.env.NEXTAUTH_SECRET || 'your-super-secret-key-change-this',
};
