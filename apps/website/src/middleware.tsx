import { NextResponse, NextRequest } from 'next/server';
import { Headers } from 'lib';

/**
 * Add security headers
 *
 * @constructor
 */
const Response = () => {
    const response = NextResponse.next();

    Object.entries(Headers).forEach(([key, value]) => {
        response.headers.set(key, value);
    });

    return response;
};

export function middleware(request: NextRequest) {
    if (request.nextUrl.pathname.startsWith('/')) {
        return Response();
    }

    if (request.nextUrl.pathname.startsWith('/about')) {
        // This logic is only applied to /about
    }

    if (request.nextUrl.pathname.startsWith('/dashboard')) {
        // This logic is only applied to /dashboard
    }
}
