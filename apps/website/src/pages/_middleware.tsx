import { NextResponse } from 'next/server';
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

const Middleware = () => {
    return Response();
};

export default Middleware;
