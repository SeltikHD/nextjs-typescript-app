import { SessionProvider } from "next-auth/react";
import { Theme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import type { AppProps } from 'next/app';
import getTheme from 'components/UI/Theme';
import useDarkMode from 'use-dark-mode';
import { useEffect, useLayoutEffect, useState } from "react";
import Script from "next/script";
import { useRouter } from "next/router";
import NProgress from 'nprogress';
import '../../public/nprogress.css';

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
    const darkMode = useDarkMode();
    const [theme, setTheme] = useState<Theme>(getTheme('light'));
    const router = useRouter();

    useLayoutEffect(() => {
        const mode = darkMode.value ? 'dark' : 'light';
        if (theme.palette.mode != mode)
            setTheme(getTheme(darkMode.value ? 'dark' : 'light'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [darkMode.value]);

    useEffect(() => {
        const handleStart = () => {
            NProgress.start();
        }
        const handleStop = () => {
            NProgress.done();
        }

        router.events.on('routeChangeStart', handleStart)
        router.events.on('routeChangeComplete', handleStop)
        router.events.on('routeChangeError', handleStop)

        return () => {
            router.events.off('routeChangeStart', handleStart)
            router.events.off('routeChangeComplete', handleStop)
            router.events.off('routeChangeError', handleStop)
        }
    }, [router]);

    return (
        <SessionProvider session={session}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Script src="noflash.js" strategy="beforeInteractive" />
                <Component {...pageProps} />
            </ThemeProvider>
        </SessionProvider>
    );
}
