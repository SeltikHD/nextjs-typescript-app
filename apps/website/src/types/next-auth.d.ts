import type { DefaultSession } from 'next-auth';
import type { Role } from '@prisma/client';

/** Example on how to extend the built-in session types */
declare module 'next-auth' {
    interface Session {
        /** This is an example. You can find me in types/next-auth.d.ts */
        user: {
            id: string;
            username?: string | null;
            role?: Role | null;
        } & DefaultSession['user'];
    }
}
