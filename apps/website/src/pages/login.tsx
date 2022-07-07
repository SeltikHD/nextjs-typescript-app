import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function Login() {
    const { status } = useSession();
    const router = useRouter();

    const { redirect } = router.query;

    const redirectUrl = redirect ? (typeof redirect == 'string' ? redirect : redirect[0]) : '/';

    if (status === 'loading') return <p>Authentication is loading...</p>;

    if (status === 'authenticated') {
        router.push(redirectUrl);
    } else {
        signIn('github', { callbackUrl: redirectUrl });
    }

    return null;
}
