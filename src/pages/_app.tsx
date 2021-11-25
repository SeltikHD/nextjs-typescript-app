import { ThemeProvider } from '@emotion/react';
import { createTheme, CssBaseline, useMediaQuery } from '@material-ui/core';
import { Provider } from 'next-auth/client';
import type { AppProps } from 'next/app';
import React from 'react';
import '../styles/styles.css';

export default function App({ Component, pageProps }: AppProps) {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    const theme = React.useMemo(
        () =>
            createTheme({
                palette: {
                    mode: prefersDarkMode ? 'dark' : 'light',
                },
            }),
        [prefersDarkMode],
    );

    return (
        <React.Fragment>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Provider
                    // Provider options are not required but can be useful in situations where
                    // you have a short session maxAge time. Shown here with default values.
                    options={{
                        // Client Max Age controls how often the useSession in the client should
                        // contact the server to sync the session state. Value in seconds.
                        // e.g.
                        // * 0  - Disabled (always use cache value)
                        // * 60 - Sync session state with server if it's older than 60 seconds
                        clientMaxAge: 0,
                        // Keep Alive tells windows / tabs that are signed in to keep sending
                        // a keep alive request (which extends the current session expiry) to
                        // prevent sessions in open windows from expiring. Value in seconds.
                        //
                        // Note: If a session has expired when keep alive is triggered, all open
                        // windows / tabs will be updated to reflect the user is signed out.
                        keepAlive: 0,
                    }}
                    session={pageProps.session}
                >
                    <Component {...pageProps} />
                </Provider>
            </ThemeProvider>
        </React.Fragment>
    );
}
