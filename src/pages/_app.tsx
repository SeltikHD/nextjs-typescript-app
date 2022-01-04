import { SessionProvider } from "next-auth/react";
import { Theme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import type { AppProps } from 'next/app';
import getTheme from 'components/UI/Theme';
import useDarkMode from 'use-dark-mode';
import { useEffect, useState } from "react";

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
    const darkMode = useDarkMode();
    const [theme, setTheme] = useState<Theme>(getTheme({ themeName: 'light' }));

    useEffect(() => {
        setTheme(getTheme({ themeName: darkMode.value ? 'dark' : 'light' }));
    }, [darkMode.value]);

    return (
        <SessionProvider session={session}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Component {...pageProps} />
            </ThemeProvider>
        </SessionProvider>
    );
}
