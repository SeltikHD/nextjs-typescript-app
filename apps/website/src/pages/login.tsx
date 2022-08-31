import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import LayoutContext from '@contexts/LayoutContext';

export default function Login() {
    const [status, setStatus] = useState<'authenticated' | 'loading' | 'unauthenticated'>('loading');
    const router = useRouter();

    const { setProps } = useContext(LayoutContext);

    useEffect(() => {
        setProps({
            auth: { blockUnauthenticated: false },
            visible: false,
            setSession: (_, s) => setStatus(s),
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
