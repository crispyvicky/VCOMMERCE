import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
    function middleware(req) {
        const token = req.nextauth.token;
        const isAdminRoute = req.nextUrl.pathname.startsWith('/admin');
        const isAdminLogin = req.nextUrl.pathname === '/admin/login';

        if (isAdminRoute && !isAdminLogin) {
            if (!token) {
                return NextResponse.redirect(new URL('/admin/login', req.url));
            }
            if (token.role !== 'admin') {
                return NextResponse.redirect(new URL('/', req.url));
            }
        }
    },
    {
        callbacks: {
            authorized: ({ token }) => true, // Let the middleware function handle the logic
        },
    }
);

export const config = {
    matcher: ['/admin/:path*', '/profile/:path*'],
};
