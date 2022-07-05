import { SessionProvider } from 'next-auth/react';
import { Theme, ThemeProvider } from '@mui/material/styles';
import { useEffect, useLayoutEffect, useState } from 'react';
import { useRouter } from 'next/router';

import type { Session } from 'next-auth';

import { CacheProvider, EmotionCache } from '@emotion/react';
import createEmotionCache from '@utils/createEmotionCache';

import type { Dispatch, ReactNode, SetStateAction } from 'react';
import type { AppProps } from 'next/app';

import CssBaseline from '@mui/material/CssBaseline';
import getTheme from '@themes/Theme';
import useDarkMode from 'use-dark-mode';

import NProgress from 'nprogress';
import '@public/nprogress.css';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { useLocalStorage } from 'react-use';
import aos from 'aos';

const clientSideEmotionCache = createEmotionCache();

export default function App({
    Component,
    emotionCache = clientSideEmotionCache,
    pageProps: { session, ...pageProps },
}: AppProps) {
    const [theme, setTheme] = useState<Theme>(getTheme('dark'));
    const [hydrated, setHydrated] = useState(false);
    const [animations] = useLocalStorage<boolean>('animations');
    const router = useRouter();

    useEffect(() => {
        const handleStart = () => {
            NProgress.start();
        };
        const handleStop = () => {
            NProgress.done();
        };

        router.events.on('routeChangeStart', handleStart);
        router.events.on('routeChangeComplete', handleStop);
        router.events.on('routeChangeError', handleStop);

        return () => {
            router.events.off('routeChangeStart', handleStart);
            router.events.off('routeChangeComplete', handleStop);
            router.events.off('routeChangeError', handleStop);
        };
    }, [router]);

    useEffect(() => {
        if (animations ?? true) {
            require('aos/dist/aos.css');

            aos.init({
                useClassNames: true,
                easing: 'ease-out-cubic',
                offset: 50,
            });
        }
    }, [animations]);

    useEffect(() => {
        setHydrated(true);
    }, []);

    if (!hydrated) return null;

    return (
        <Providers session={session} emotionCache={emotionCache} theme={theme} setTheme={setTheme}>
            <Component {...pageProps} />
        </Providers>
    );
}

interface ColorThemeProviderProps {
    children: ReactNode;
    theme: Theme;
    setTheme: Dispatch<SetStateAction<Theme>>;
}

function ColorThemeProvider({ children, theme, setTheme }: ColorThemeProviderProps) {
    const darkMode = useDarkMode();

    useLayoutEffect(() => {
        const mode = darkMode.value ? 'dark' : 'light';
        if (theme.palette.mode != mode) setTheme(getTheme(mode));
    }, [darkMode.value, setTheme, theme.palette.mode]);

    return <>{children}</>;
}

interface ProvidersProps extends ColorThemeProviderProps {
    children: ReactNode;
    session?: Session;
    emotionCache: EmotionCache;
    theme: Theme;
}

function Providers({ children, session, emotionCache, theme, ...props }: ProvidersProps) {
    return (
        <SessionProvider session={session}>
            <CacheProvider value={emotionCache}>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <ColorThemeProvider theme={theme} {...props}>
                        {children}
                    </ColorThemeProvider>
                </ThemeProvider>
            </CacheProvider>
        </SessionProvider>
    );
}
