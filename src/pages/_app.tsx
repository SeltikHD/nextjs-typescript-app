import { SessionProvider } from "next-auth/react";
import { Theme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import type { AppProps } from 'next/app';
import getTheme from 'components/UI/Theme';
import useDarkMode from 'use-dark-mode';
import { Dispatch, ReactNode, SetStateAction, useEffect, useLayoutEffect, useState } from "react";
import Script from "next/script";
import { useRouter } from "next/router";
import NProgress from 'nprogress';
import '../../public/nprogress.css';
import { CacheProvider, EmotionCache } from "@emotion/react";
import createEmotionCache from "utils/createEmotionCache";

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

interface MyAppProps extends AppProps {
    emotionCache?: EmotionCache;
}

const clientSideEmotionCache = createEmotionCache();

export default function App({ Component, emotionCache = clientSideEmotionCache, pageProps: { session, ...pageProps } }: MyAppProps) {
    const [theme, setTheme] = useState<Theme>(getTheme('dark'));
    const [hydrated, setHydrated] = useState(false);
    const router = useRouter();

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

    useEffect(() => {
        setHydrated(true);
    }, []);

    if(!hydrated)
        return null;

    return (
        <SessionProvider session={session}>
            <CacheProvider value={emotionCache}>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <Script src="noflash.js" strategy="beforeInteractive" />
                    <ColorThemeProvider theme={theme} setTheme={setTheme}>
                        <Component {...pageProps} />
                    </ColorThemeProvider>
                </ThemeProvider>
            </CacheProvider>
        </SessionProvider>
    );
}

type ColorThemeProviderProps = {
    children: ReactNode;
    theme: Theme;
    setTheme: Dispatch<SetStateAction<Theme>>;
}

function ColorThemeProvider({ children, theme, setTheme }: ColorThemeProviderProps) {
    const darkMode = useDarkMode();

    useLayoutEffect(() => {
        const mode = darkMode.value ? 'dark' : 'light';
        if (theme.palette.mode != mode)
            setTheme(getTheme(darkMode.value ? 'dark' : 'light'));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [darkMode.value]);

    return (<>{children}</>);
}